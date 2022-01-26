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
    public class CommentController : ControllerBase
    {
        private readonly ILogger<CommentController> _logger;
        private ICommentRepository _commentRepository;

        public CommentController(ILogger<CommentController> logger)
        {
            _logger = logger;
            _commentRepository = new CommentRepository(new CTFcolabDbContext());
        }

        [HttpGet]
        [ActionName("all")]
        public IEnumerable<Comment> GetAll()
        {
            var comments = from comment in _commentRepository.GetComments() select comment;
            return comments;
        }

        [HttpGet]
        [ActionName("id")]
        public Comment GetId(int id)
        {
            var comment = _commentRepository.GetCommentByID(id);
            return comment;
        }

        [HttpPost]
        [ActionName("new")]
        public Comment Create(Comment comment)
        {
            try {
                _commentRepository.UpdateComment(comment);
                _commentRepository.Save();
                return comment;
            } catch {}
            return null;
        }

        [HttpPut]
        [HttpPatch]
        [ActionName("id")]
        public Comment UpdateId(int id, Comment comment)
        {
            try {
                _commentRepository.UpdateComment(comment);
                _commentRepository.Save();
                return comment;
            } catch {}
            return null;
        }

        [HttpDelete]
        [ActionName("id")]
        public ActionResult DeleteId(int id)
        {
            try {
                _commentRepository.DeleteComment(id);
                _commentRepository.Save();
                return Okay("Comment deleted");
            } catch {}
            return Bad("Couldn't delete comment");
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
