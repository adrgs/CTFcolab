using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace CTFcolab.Entity
{
    [Table("User")]
    public class User : IEntity
    {
        [Key]
        public int Id { get; set; }

        [MaxLength(30)]
        [MinLength(1)]
        [Required]
        [Index(IsUnique=true)]
        public string Name { get; set; }

        [MaxLength(100)]
        [Required]
        [EmailAddress(ErrorMessage = "Invalid Email Address")]
        public string Email { get; set; }

        [MaxLength(100)]
        [Required]
        public string Password { get; set; }

    }
}