using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using CTFcolab.DAL;
using CTFcolab.Entity;

namespace CTFcolab.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]
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
        public IEnumerable<User> Get()
        {
            var users = from user in _userRepository.GetUsers() select user;
            return users;
        }

        [HttpPost]
        public ActionResult Post(User user)
        {
            if (_userRepository.GetUserByName(user.Name) is not null)
            {
                return BadRequest("Username is already taken");
            }
            if (_userRepository.GetUserByEmail(user.Email) is not null)
            {
                return BadRequest("Email is already taken");
            }
            try {
                if (ModelState.IsValid) {
                    _userRepository.InsertUser(user);
                    _userRepository.Save();
                    return Ok(user);
                }
                var message = string.Join(" | ", ModelState.Values
                                    .SelectMany(v => v.Errors)
                                    .Select(e => e.ErrorMessage));
                return BadRequest(message);
            } catch (Exception ex)
            {
                return BadRequest(ex.ToString());
            }
        }
    }
}
