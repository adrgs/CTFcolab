using System;
using System.Collections.Generic;
using System.Linq;
using CTFcolab.Entity;
using System.Data.Entity;

namespace CTFcolab.DAL
{
    public class CommentRepository : ICommentRepository
    {
        private CTFcolabDbContext _context;
        public CommentRepository(CTFcolabDbContext CommentContext)
        {
            this._context = CommentContext;
        }
        public IEnumerable<Comment> GetComments()
        {
            return _context.Set<Comment>().ToList();
        }
        public Comment GetCommentByID(int id)
        {
            return _context.Set<Comment>().Find(id);
        }
        public Comment GetCommentByName(string commentname)
        {
            return _context.Set<Comment>().SingleOrDefault(comment => comment.Name == commentname);
        }
        public void InsertComment(Comment Comment)
        {
            _context.Set<Comment>().Add(Comment);
        }
        public void DeleteComment(int CommentID)
        {
            Comment Comment = _context.Set<Comment>().Find(CommentID);
            _context.Set<Comment>().Remove(Comment);
        }
        public void UpdateComment(Comment Comment)
        {
            _context.Entry(Comment).State = EntityState.Modified;
        }
        public void Save()
        {
            _context.SaveChanges();
        }
        private bool disposed = false;
        protected virtual void Dispose(bool disposing)
        {
            if (!this.disposed)
            {
                if (disposing)
                {
                    _context.Dispose();
                }
            }
            this.disposed = true;
        }
        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
    }
}