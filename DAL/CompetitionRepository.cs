using System;
using System.Collections.Generic;
using System.Linq;
using CTFcolab.Entity;
using System.Data.Entity;

namespace CTFcolab.DAL
{
    public class CompetitionRepository : ICompetitionRepository
    {
        private CTFcolabDbContext _context;
        public CompetitionRepository(CTFcolabDbContext CompetitionContext)
        {
            this._context = CompetitionContext;
        }
        public IEnumerable<Competition> GetCompetitions()
        {
            return _context.Set<Competition>().ToList();
        }
        public Competition GetCompetitionByID(int id)
        {
            return _context.Set<Competition>().Find(id);
        }
        public Competition GetCompetitionByName(string competitionname)
        {
            return _context.Set<Competition>().SingleOrDefault(competition => competition.Name == competitionname);
        }
        public void InsertCompetition(Competition Competition)
        {
            _context.Set<Competition>().Add(Competition);
        }
        public void DeleteCompetition(int CompetitionID)
        {
            Competition Competition = _context.Set<Competition>().Find(CompetitionID);
            _context.Set<Competition>().Remove(Competition);
        }
        public void UpdateCompetition(Competition Competition)
        {
            _context.Entry(Competition).State = EntityState.Modified;
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