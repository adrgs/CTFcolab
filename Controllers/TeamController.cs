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
    [Route("/api/[controller]/[action]/{id?}")]
    public class TeamController : ControllerBase
    {
        private readonly ILogger<TeamController> _logger;
        private ITeamRepository _teamRepository;
        private IUserRepository _userRepository;

        public TeamController(ILogger<TeamController> logger)
        {
            _logger = logger;
            var context = new CTFcolabDbContext();
            _teamRepository = new TeamRepository(context);
            _userRepository = new UserRepository(context);
        }

        [HttpGet]
        [ActionName("all")]
        [Authorize("Admin")]
        public IEnumerable<Team> GetAll()
        {
            var teams = from team in _teamRepository.GetTeams() select team;
            return teams;
        }

        [HttpGet]
        [ActionName("id")]
        public Team GetId(int id)
        {
            var team = _teamRepository.GetTeamByID(id);
            return team;
        }

        [HttpPost]
        [ActionName("create")]
        [Authorize("Admin")]
        public Team Create(Team team)
        {
            try {
                if (team.Name == null || team.Name == "" || team.Description == null || team.Description == "") {
                    return null;
                }

                Team team2 = new Team();
                team2.Name = team.Name;
                team2.Description = team.Description;
                team2.InviteCode = Guid.NewGuid().ToString();
                _teamRepository.InsertTeam(team2);
                _teamRepository.Save();

                var user = _userRepository.GetUserByID(((User)HttpContext.Items["User"]).Id);
                team2.Owner = user;
                team2.Users.Add(user);

                _teamRepository.UpdateTeam(team2);
                _teamRepository.Save();

                user.Teams.Add(team2);
                
                _userRepository.UpdateUser(user);
                _userRepository.Save();
                return team2;
            } catch (Exception ex) {
                Console.WriteLine(ex.Message);
            }
            return null;
        }

        [HttpPost]
        [ActionName("join")]
        public Team Join(Team team)
        {
            if (team.InviteCode == null || team.InviteCode == "") {
                return null;
            }
            try {
                var team2 = _teamRepository.GetTeamByInviteCode(team.InviteCode);
                if (team2 == null) {
                    return null;
                }
                var user = (User)HttpContext.Items["User"];
                user.Teams.Add(team2);
                team2.Users.Add(user);
                _teamRepository.UpdateTeam(team2);
                _teamRepository.Save();
                _userRepository.UpdateUser(user);
                _userRepository.Save();
                return team2;
            } catch {}
            return null;
        }

        [HttpPut]
        [HttpPatch]
        [ActionName("id")]
        public Team UpdateId(int id, Team team)
        {
            try {
                _teamRepository.UpdateTeam(team);
                _teamRepository.Save();
                return team;
            } catch {}
            return null;
        }

        [HttpDelete]
        [ActionName("id")]
        public ActionResult DeleteId(int id)
        {
            try {
                var users = _userRepository.GetUsers();
                foreach (User user in users)
                {
                    foreach (Team team in user.Teams) {
                        if (team.Id == id) {
                            user.Teams.Remove(team);
                            _userRepository.UpdateUser(user);
                            _userRepository.Save();
                        }
                    }
                }
                _teamRepository.DeleteTeam(id);
                _teamRepository.Save();
                return Okay("Team deleted");
            } catch {}
            return Bad("Couldn't delete team");
        }

        private ActionResult Bad(object data)
        {
            return BadRequest(JsonConvert.SerializeObject(data));
        }

        private ActionResult Okay(object data)
        {
            return Ok(JsonConvert.SerializeObject(data));
        }

    }
}
