using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System;

namespace CTFcolab.Entity
{
    [Table("Comment")]
    public class Comment : IEntity
    {
        [Key]
        public int Id { get; set; }

        [MaxLength(1024)]
        public string Text { get; set; }

        public User User { get; set; }
        public Challenge Challenge { get; set; }

        public DateTime CreatedAt { get; set; }
    }
}