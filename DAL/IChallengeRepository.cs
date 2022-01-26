using System;
using System.Collections.Generic;
using CTFcolab.Entity;

namespace CTFcolab.DAL 
{
    public interface IChallengeRepository : IDisposable  
    {  
        IEnumerable<Challenge> GetChallenges();  
        Challenge GetChallengeByID(int ChallengeId);   
        Challenge GetChallengeByName(string challengename);  
        void InsertChallenge(Challenge challenge);  
        void DeleteChallenge(int ChallengeID);  
        void UpdateChallenge(Challenge challenge);  
        void Save();  
    }  
}