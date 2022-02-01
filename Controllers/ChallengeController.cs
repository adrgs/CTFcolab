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
        private ICompetitionRepository _competitionRepository;
        private ICommentRepository _commentRepository;
        private IUserRepository _userRepository;

        public ChallengeController(ILogger<ChallengeController> logger)
        {
            _logger = logger;
            var context = new CTFcolabDbContext();
            _challengeRepository = new ChallengeRepository(context);
            _competitionRepository = new CompetitionRepository(context);
            _commentRepository = new CommentRepository(context);
            _userRepository = new UserRepository(context);
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
        [ActionName("create")]
        [Authorize("Admin")]
        public Challenge Create(int id, Challenge challenge)
        {
            if (String.IsNullOrWhiteSpace(challenge.Name)) {
                return null;
            }
            try {
                Competition competition = _competitionRepository.GetCompetitionByID(id);
                challenge.Competition = competition;
                challenge.Flag = "";
                _challengeRepository.InsertChallenge(challenge);
                _challengeRepository.Save();
                competition.Challenges.Add(challenge);
                _competitionRepository.UpdateCompetition(competition);
                _competitionRepository.Save();
                return challenge;
            } catch (Exception ex) {
                return null;
            }
        }

        [HttpPost]
        [ActionName("comment")]
        public Comment Create(int id, Comment comment)
        {
            if (String.IsNullOrWhiteSpace(comment.Text)) {
                return null;
            }
            try {
                Challenge challenge = _challengeRepository.GetChallengeByID(id);
                comment.Challenge = challenge;
                // comment.User = (User)HttpContext.Items["User"];
                comment.CreatedAt = DateTime.Now;
                _commentRepository.InsertComment(comment);
                _commentRepository.Save();

                comment.User = _userRepository.GetUserByID(((User)HttpContext.Items["User"]).Id);
                _commentRepository.UpdateComment(comment);
                _commentRepository.Save();

                challenge.Comments.Add(comment);
                _challengeRepository.UpdateChallenge(challenge);
                _challengeRepository.Save();
                return comment;
            } catch (Exception ex) {
                return null;
            }
        }

        [HttpPut]
        [HttpPatch]
        [ActionName("id")]
        public Challenge UpdateId(int id, Challenge challenge)
        {
            if (challenge.Flag == null) {
                return null;
            }
            try {
                Challenge chall = _challengeRepository.GetChallengeByID(id);
                chall.Flag = challenge.Flag;
                chall.Solved = challenge.Solved;
                _challengeRepository.UpdateChallenge(chall);
                _challengeRepository.Save();
                return chall;
            } catch {}
            return null;
        }

        [HttpDelete]
        [ActionName("id")]
        public ActionResult DeleteId(int id)
        {
            try {
                Challenge challenge = _challengeRepository.GetChallengeByID(id);
                if (challenge != null && challenge.Competition != null) {
                    Competition competition = _competitionRepository.GetCompetitionByID(challenge.Competition.Id);
                    foreach (Challenge chall in competition.Challenges) {
                        if (chall.Id == challenge.Id) {
                            competition.Challenges.Remove(chall);
                            _competitionRepository.UpdateCompetition(competition);
                            _competitionRepository.Save();
                        }
                    }
                }
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
