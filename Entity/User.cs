using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;

namespace CTFcolab.Entity
{
    [Table("User")]
    public class User : IEntity
    {
        public User() {
            this.Teams = new HashSet<Team>();
        }

        [Key]
        public int Id { get; set; }

        [MaxLength(30)]
        [MinLength(1)]
        [Index(IsUnique = true)]
        public string Name { get; set; }

        [MaxLength(100)]
        [Index(IsUnique = true)]
        [EmailAddress(ErrorMessage = "Invalid Email Address")]
        public string Email { get; set; }

        [MaxLength(100)]
        public string Password { get; set; }

        [MaxLength(100)]
        public string Role { get; set; }

        public virtual ICollection<Team> Teams { get; set; }

        public virtual ResetPasswordCode ResetPasswordCode { get; set; }

    }
}