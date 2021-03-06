using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using CTFcolab.DAL;
using CTFcolab.Entity;
using System.Text;
using Newtonsoft.Json;
using CTFcolab.Helpers;
using CTFcolab.Authorization;
using System.Net.Http;
using System.Net.Http.Headers;
using System.IO;

namespace CTFcolab.Controllers
{
    [ApiController]
    [Authorize]
    [Route("/api/[controller]/[action]/{id?}")]
    public class UserController : ControllerBase
    {
        private readonly ILogger<UserController> _logger;
        private IUserRepository _userRepository;

        public UserController(ILogger<UserController> logger)
        {
            _logger = logger;
            _userRepository = new UserRepository(new CTFcolabDbContext());
        }


        [HttpGet]
        [ActionName("self")]
        public User GetSelf()
        {
            var user = _userRepository.GetUserByID(((User)HttpContext.Items["User"]).Id);
            return user;
        }

        [HttpGet]
        [ActionName("all")]
        [Authorize("Admin")]
        public IEnumerable<User> GetAll()
        {
            var users = from user in _userRepository.GetUsers() select user;
            return users;
        }

        [HttpGet]
        [ActionName("id")]
        public User GetId(int id)
        {
            var user = _userRepository.GetUserByID(id);
            return user;
        }

        [HttpGet]
        [ActionName("owners")]
        [Authorize("Admin")]
        public IEnumerable<User> GetOwners()
        {
            var owners = _userRepository.GetOwners();
            return owners;
        }

        [HttpGet]
        [ActionName("usersWithResetPasswordCodes")]
        [Authorize("Admin")]
        public IEnumerable<User> UsersWithResetPasswordCodes()
        {
            var usersWithResetPasswordCodes = _userRepository.UsersWithResetPasswordCodes();
            return usersWithResetPasswordCodes;
        }

        [HttpGet]
        [ActionName("adminStats")]
        [Authorize("Admin")]
        public IEnumerable<Tuple<string, int>> AdminStats()
        {
            var adminStats = _userRepository.AdminStats();
            return adminStats;
        }

        [HttpPut]
        [HttpPatch]
        [ActionName("id")]
        public User UpdateId(int id, User user)
        {
            try
            {
                _userRepository.UpdateUser(user);
                _userRepository.Save();
                return user;
            }
            catch { }
            return null;
        }

        [HttpDelete]
        [ActionName("id")]
        public ActionResult DeleteId(int id)
        {
            try
            {
                _userRepository.DeleteUser(id);
                _userRepository.Save();
                return Okay("User deleted");
            }
            catch { }
            return Bad("Couldn't delete user");
        }

        private ActionResult Bad(object data)
        {
            return BadRequest(JsonConvert.SerializeObject(data));
        }

        private ActionResult Okay(object data)
        {
            return Ok(JsonConvert.SerializeObject(data));
        }

        [HttpPost]
        [AllowAnonymous]
        [ActionName("recoverpassword")]
        public ActionResult RecoverPassword(string id, User user)
        {
            if (user.Id == 0)
            {
                return Bad("User Id cannot be empty");
            }
            if (user.Password == null || user.Password == "")
            {
                return Bad("Password cannot be empty");
            }

            User userDb1 = _userRepository.GetUserByID(user.Id);

            if (userDb1.ResetPasswordCode == null || userDb1.ResetPasswordCode.Code != id || userDb1.ResetPasswordCode.ExpirationDate < DateTime.Today)
            {
                return Bad("Invalid recovery code");
            }

            userDb1.ResetPasswordCode = null;
            userDb1.Password = BCrypt.Net.BCrypt.HashPassword(user.Password);

            _userRepository.UpdateUser(userDb1);
            _userRepository.Save();

            return Ok("Password changed");
        }

        [HttpPost]
        [AllowAnonymous]
        [ActionName("forgotpassword")]
        public ActionResult ForgotPassword(User user)
        {
            string username = user.Name;
            string email = user.Email;
            if (username == null || username.Length == 0)
            {
                return Bad("Username cannot be empty");
            }
            if (email == null || email.Length == 0)
            {
                return Bad("Email cannot be empty");
            }
            User userDb1 = _userRepository.GetUserByName(username);
            User userDb2 = _userRepository.GetUserByEmail(email);
            if (userDb1 == null || userDb2 == null || userDb1.Id != userDb2.Id)
            {
                return Bad("Invalid username/email");
            }

            ResetPasswordCode resetPasswordCode = new ResetPasswordCode();
            resetPasswordCode.Code = Guid.NewGuid().ToString();
            resetPasswordCode.ExpirationDate = DateTime.Today.AddDays(3);

            userDb2.ResetPasswordCode = resetPasswordCode;

            _userRepository.UpdateUser(userDb2);
            _userRepository.Save();

            try
            {
                string mailgunApi = MailgunConfig.MailgunApi;
                string mailgunDomain = MailgunConfig.MailgunDomain;
                using (var client = new HttpClient { BaseAddress = new Uri("https://api.mailgun.net/") })
                {
                    client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Basic",
                        Convert.ToBase64String(Encoding.ASCII.GetBytes("api:" + mailgunApi)));

                    var content = new FormUrlEncodedContent(new[]
                    {
                    new KeyValuePair<string, string>("from", "CTFcolab <mailgun@"+mailgunDomain+">"),
                    new KeyValuePair<string, string>("to", userDb2.Email),
                    new KeyValuePair<string, string>("subject", "[CTFcolab] Password recovery email"),
                    new KeyValuePair<string, string>("html", "The following URL is valid for 3 days: <a href=\"" + "https://localhost:5001/recoverpassword/" + userDb2.Id + "/" + resetPasswordCode.Code +"\">https://localhost:5001/recoverpassword/" + userDb2.Id + "/" + resetPasswordCode.Code + "</a>")
                });

                    var task = Task.Run(() =>
                        client.PostAsync("/v3/"+mailgunDomain+"/messages", content)
                    );
                    task.Wait();
                    var response = task.Result;
                    using var reader = new StreamReader(response.Content.ReadAsStream());
                    var rsp = reader.ReadToEnd();
                    return Ok("Email sent");
                }
            } catch {}

            return Bad("Server error");
        }

        [HttpPost]
        [AllowAnonymous]
        [ActionName("login")]
        public ActionResult Login(User user)
        {
            string username = user.Name;
            string password = user.Password;
            if (username == null || username.Length == 0)
            {
                return Bad("Username cannot be empty");
            }
            if (password == null || password.Length == 0)
            {
                return Bad("Password cannot be empty");
            }
            User userDb = _userRepository.GetUserByName(username);
            if (userDb == null)
            {
                userDb = _userRepository.GetUserByEmail(username);
                if (userDb == null)
                {
                    return Bad("Invalid credentials");
                }
            }
            if (BCrypt.Net.BCrypt.Verify(password, userDb.Password) == true)
            {
                return Okay(JwtAuthManager.GenerateJSONWebToken(userDb));
            }
            return Bad("Invalid credentials");
        }

        [HttpPost]
        [AllowAnonymous]
        [ActionName("signup")]
        public ActionResult Signup(User user)
        {
            if (_userRepository.GetUserByName(user.Name) is not null)
            {
                return Bad("Username is already taken");
            }
            if (_userRepository.GetUserByEmail(user.Email) is not null)
            {
                return Bad("Email is already taken");
            }
            if (user.Password == null)
            {
                return Bad("Password can't be null");
            }
            user.Role = "";
            user.Password = BCrypt.Net.BCrypt.HashPassword(user.Password);
            try
            {
                if (ModelState.IsValid)
                {
                    _userRepository.InsertUser(user);
                    _userRepository.Save();
                    if (user.Id == 1)
                    {
                        user.Role = "Admin";
                    }
                    else
                    {
                        user.Role = "User";
                    }
                    _userRepository.UpdateUser(user);
                    _userRepository.Save();
                    return Okay(user);
                }
                var message = string.Join(" | ", ModelState.Values
                                    .SelectMany(v => v.Errors)
                                    .Select(e => e.ErrorMessage));
                return Bad(message);
            }
            catch (Exception ex)
            {
                return Bad(ex.ToString());
            }
        }
    }
}
