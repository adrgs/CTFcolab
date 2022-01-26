using System;
using System.Collections.Generic;
using System.Linq;
using CTFcolab.Entity;
using System.Data.Entity;

namespace CTFcolab.DAL
{
    public class UserRepository : IUserRepository
    {
        private CTFcolabDbContext _context;
        public UserRepository(CTFcolabDbContext UserContext)
        {
            this._context = UserContext;
        }
        public IEnumerable<User> GetUsers()
        {
            return _context.Set<User>().ToList();
        }
        public User GetUserByID(int id)
        {
            return _context.Set<User>().Find(id);
        }
        public User GetUserByName(string username)
        {
            return _context.Set<User>().SingleOrDefault(user => user.Name == username);
        }
        public User GetUserByEmail(string email)
        {
            return _context.Set<User>().SingleOrDefault(user => user.Email == email);
        }
        public IEnumerable<Team> GetTeamsOwnedByID(int id)
        {
            var teams = from team in _context.Set<Team>()
                        where team.Owner.Id == id
                        select team;
            return teams;
        }
        public void InsertUser(User User)
        {
            _context.Set<User>().Add(User);
        }
        public void DeleteUser(int UserID)
        {
            User User = _context.Set<User>().Find(UserID);
            _context.Set<User>().Remove(User);
        }
        public void UpdateUser(User User)
        {
            _context.Entry(User).State = EntityState.Modified;
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