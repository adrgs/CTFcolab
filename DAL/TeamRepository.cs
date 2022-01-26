using System;
using System.Collections.Generic;
using System.Linq;
using CTFcolab.Entity;
using System.Data.Entity;

namespace CTFcolab.DAL
{
    public class TeamRepository : ITeamRepository
    {
        private CTFcolabDbContext _context;
        public TeamRepository(CTFcolabDbContext TeamContext)
        {
            this._context = TeamContext;
        }
        public IEnumerable<Team> GetTeams()
        {
            return _context.Set<Team>().ToList();
        }
        public Team GetTeamByID(int id)
        {
            return _context.Set<Team>().Find(id);
        }
        public Team GetTeamByName(string teamname)
        {
            return _context.Set<Team>().SingleOrDefault(team => team.Name == teamname);
        }
        public void InsertTeam(Team Team)
        {
            _context.Set<Team>().Add(Team);
        }
        public void DeleteTeam(int TeamID)
        {
            Team Team = _context.Set<Team>().Find(TeamID);
            _context.Set<Team>().Remove(Team);
        }
        public void UpdateTeam(Team Team)
        {
            _context.Entry(Team).State = EntityState.Modified;
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