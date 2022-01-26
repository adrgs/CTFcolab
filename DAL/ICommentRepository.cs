using System;
using System.Collections.Generic;
using CTFcolab.Entity;

namespace CTFcolab.DAL 
{
    public interface ICommentRepository : IDisposable  
    {  
        IEnumerable<Comment> GetComments();  
        Comment GetCommentByID(int CommentId);   
        void InsertComment(Comment comment);  
        void DeleteComment(int CommentID);  
        void UpdateComment(Comment comment);  
        void Save();  
    }  
}