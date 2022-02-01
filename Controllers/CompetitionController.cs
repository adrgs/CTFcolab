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
    public class CompetitionController : ControllerBase
    {
        private readonly ILogger<CompetitionController> _logger;
        private ICompetitionRepository _competitionRepository;
        private ITeamRepository _teamRepository;

        public CompetitionController(ILogger<CompetitionController> logger)
        {
            _logger = logger;
            var context = new CTFcolabDbContext();
            
            _competitionRepository = new CompetitionRepository(context);
            _teamRepository = new TeamRepository(context);
        }

        [HttpGet]
        [ActionName("all")]
        public IEnumerable<Competition> GetAll()
        {
            var competitions = from competition in _competitionRepository.GetCompetitions() select competition;
            return competitions;
        }

        [HttpGet]
        [ActionName("id")]
        public Competition GetId(int id)
        {
            var competition = _competitionRepository.GetCompetitionByID(id);
            var user = (User)HttpContext.Items["User"];
            if (user!=null) {
                foreach (Team team in user.Teams) {
                    if (competition.Team.Id == team.Id) {
                        return competition;
                    }
                }
            }
            return null;
        }

        [HttpPost]
        [ActionName("create")]
        [Authorize("Admin")]
        public Competition Create(int id, Competition competition)
        {
            if (String.IsNullOrWhiteSpace(competition.Name)) {
                return null;
            }
            try {
                Team team = _teamRepository.GetTeamByID(id);
                competition.Team = team;
                _competitionRepository.InsertCompetition(competition);
                _competitionRepository.Save();
                team.Competitions.Add(competition);
                _teamRepository.UpdateTeam(team);
                _teamRepository.Save();
                return competition;
            } catch (Exception ex) {
                return null;
            }
        }

        [HttpPut]
        [HttpPatch]
        [ActionName("id")]
        public Competition UpdateId(int id, Competition competition)
        {
            try {
                _competitionRepository.UpdateCompetition(competition);
                _competitionRepository.Save();
                return competition;
            } catch {}
            return null;
        }

        [HttpDelete]
        [ActionName("id")]
        public ActionResult DeleteId(int id)
        {
            try {
                _competitionRepository.DeleteCompetition(id);
                _competitionRepository.Save();
                return Okay("Competition deleted");
            } catch {}
            return Bad("Couldn't delete competition");
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
