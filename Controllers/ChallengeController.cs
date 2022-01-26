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
    public class ChallengeController : ControllerBase
    {
        private readonly ILogger<ChallengeController> _logger;
        private IChallengeRepository _challengeRepository;

        public ChallengeController(ILogger<ChallengeController> logger)
        {
            _logger = logger;
            _challengeRepository = new ChallengeRepository(new CTFcolabDbContext());
        }

        [HttpGet]
        [ActionName("all")]
        public IEnumerable<Challenge> GetAll()
        {
            var challenges = from challenge in _challengeRepository.GetChallenges() select challenge;
            return challenges;
        }

        [HttpGet]
        [ActionName("id")]
        public Challenge GetId(int id)
        {
            var challenge = _challengeRepository.GetChallengeByID(id);
            return challenge;
        }

        [HttpPost]
        [ActionName("new")]
        public Challenge Create(Challenge challenge)
        {
            try {
                _challengeRepository.UpdateChallenge(challenge);
                _challengeRepository.Save();
                return challenge;
            } catch {}
            return null;
        }

        [HttpPut]
        [HttpPatch]
        [ActionName("id")]
        public Challenge UpdateId(int id, Challenge challenge)
        {
            try {
                _challengeRepository.UpdateChallenge(challenge);
                _challengeRepository.Save();
                return challenge;
            } catch {}
            return null;
        }

        [HttpDelete]
        [ActionName("id")]
        public ActionResult DeleteId(int id)
        {
            try {
                _challengeRepository.DeleteChallenge(id);
                _challengeRepository.Save();
                return Okay("Challenge deleted");
            } catch {}
            return Bad("Couldn't delete challenge");
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
