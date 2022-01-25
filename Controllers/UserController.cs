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
    }
}
