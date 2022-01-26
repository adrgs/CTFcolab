using System;
using System.Collections.Generic;
using CTFcolab.Entity;

namespace CTFcolab.DAL 
{
    public interface ITeamRepository : IDisposable  
    {  
        IEnumerable<Team> GetTeams();  
        Team GetTeamByID(int TeamId);   
        Team GetTeamByName(string username);  
        void InsertTeam(Team user);  
        void DeleteTeam(int TeamID);  
        void UpdateTeam(Team user);  
        void Save();  
    }  
}