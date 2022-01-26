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

        public TeamController(ILogger<TeamController> logger)
        {
            _logger = logger;
            _teamRepository = new TeamRepository(new CTFcolabDbContext());
        }

        [HttpGet]
        [ActionName("all")]
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
        [ActionName("new")]
        public Team Create(Team team)
        {
            try {
                _teamRepository.UpdateTeam(team);
                _teamRepository.Save();
                return team;
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
