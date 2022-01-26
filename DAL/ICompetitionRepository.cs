using System;
using System.Collections.Generic;
using CTFcolab.Entity;

namespace CTFcolab.DAL 
{
    public interface ICompetitionRepository : IDisposable  
    {  
        IEnumerable<Competition> GetCompetitions();  
        Competition GetCompetitionByID(int CompetitionId);   
        Competition GetCompetitionByName(string competitionname);  
        void InsertCompetition(Competition competition);  
        void DeleteCompetition(int CompetitionID);  
        void UpdateCompetition(Competition competition);  
        void Save();  
    }  
}