using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System;

namespace CTFcolab.Entity
{
    [Table("Competition")]
    public class Competition : IEntity
    {
        public Competition() {
            this.Challenges = new HashSet<Challenge>();
        }
        [Key]
        public int Id { get; set; }

        [MaxLength(50)]
        [MinLength(1)]
        [Index(IsUnique=true)]
        public string Name { get; set; }

        [MaxLength(255)]
        public string Description { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }

        public virtual ICollection<Challenge> Challenges { get; set; }
    }
}