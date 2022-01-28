using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;

namespace CTFcolab.Entity
{
    [Table("Team")]
    public class Team : IEntity
    {
        public Team() {
            this.Users = new HashSet<User>();
            this.Competitions = new HashSet<Competition>();
        }
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

        public virtual ICollection<Competition> Competitions { get;set; }
        public virtual User Owner { get;set; }
        public virtual ICollection<User> Users { get;set; }
    }
}