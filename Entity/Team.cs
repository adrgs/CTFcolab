using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace CTFcolab.Entity
{
    [Table("Team")]
    public class Team : IEntity
    {
        [Key]
        public int Id { get; set; }

        [MaxLength(50)]
        [MinLength(1)]
        [Index(IsUnique=true)]
        public string Name { get; set; }

        [MaxLength(255)]
        public string Description { get; set; }

        [MaxLength(36)]
        public string InviteCode { get; set; }

        public Competition[] Competitions { get;set; }
        public User Owner { get;set; }
        public User[] Users { get;set; }
    }
}