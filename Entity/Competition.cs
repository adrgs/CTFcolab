using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System;

namespace CTFcolab.Entity
{
    [Table("Competition")]
    public class Competition : IEntity
    {
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

        public Challenge[] Challenges { get; set; }
    }
}