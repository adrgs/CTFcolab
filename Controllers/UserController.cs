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

namespace CTFcolab.Controllers
{
    [ApiController]
    [Authorize]
    [Route("/api/[controller]/[action]")]
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
            var user = (User)HttpContext.Items["User"];
            return user;
        }

        [HttpGet]
        [ActionName("all")]
        public IEnumerable<User> GetAll()
        {
            var users = from user in _userRepository.GetUsers() select user;
            return users;
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
                    if (user.Id == 1) {
                        user.Role = "Admin";
                    } else {
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
