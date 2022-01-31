using System;
using System.Collections.Generic;
using CTFcolab.Entity;

namespace CTFcolab.DAL 
{
    public interface IUserRepository : IDisposable  
    {  
        IEnumerable<User> GetUsers();  
        IEnumerable<User> GetOwners();
        User GetUserByID(int UserId);  
        User GetUserByEmail(string email);  
        User GetUserByName(string username);
        IEnumerable<User> UsersWithResetPasswordCodes();
        IEnumerable<Tuple<string, int>> AdminStats();
        IEnumerable<Team> GetTeamsOwnedByID(int UserId);  
        void InsertUser(User user);  
        void DeleteUser(int UserID);  
        void UpdateUser(User user);  
        void Save();  
    }  
}