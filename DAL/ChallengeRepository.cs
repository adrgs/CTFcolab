using System;
using System.Collections.Generic;
using System.Linq;
using CTFcolab.Entity;
using System.Data.Entity;

namespace CTFcolab.DAL
{
    public class ChallengeRepository : IChallengeRepository
    {
        private CTFcolabDbContext _context;
        public ChallengeRepository(CTFcolabDbContext ChallengeContext)
        {
            this._context = ChallengeContext;
        }
        public IEnumerable<Challenge> GetChallenges()
        {
            return _context.Set<Challenge>().ToList();
        }
        public Challenge GetChallengeByID(int id)
        {
            return _context.Set<Challenge>().Find(id);
        }
        public Challenge GetChallengeByName(string challengename)
        {
            return _context.Set<Challenge>().SingleOrDefault(challenge => challenge.Name == challengename);
        }
        public void InsertChallenge(Challenge Challenge)
        {
            _context.Set<Challenge>().Add(Challenge);
        }
        public void DeleteChallenge(int ChallengeID)
        {
            Challenge Challenge = _context.Set<Challenge>().Find(ChallengeID);
            _context.Set<Challenge>().Remove(Challenge);
        }
        public void UpdateChallenge(Challenge Challenge)
        {
            _context.Entry(Challenge).State = EntityState.Modified;
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