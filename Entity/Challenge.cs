using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System;

namespace CTFcolab.Entity
{
    [Table("Challenge")]
    public class Challenge : IEntity
    {
        public Challenge() {
            this.Comments = new HashSet<Comment>();
        }
        [Key]
        public int Id { get; set; }

        [MaxLength(50)]
        [MinLength(1)]
        public string Name { get; set; }

        [MaxLength(255)]
        public string Description { get; set; }

        [MaxLength(255)]
        public string Flag { get; set; }

        [MaxLength(50)]
        public string Category { get; set; }

        public bool Solved { get; set; }

        public virtual ICollection<Comment> Comments {get;set;}
        public virtual Competition Competition { get; set; }
    }
}