using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System;
using SQLite.CodeFirst;

namespace CTFcolab.Entity
{
    [Table("ResetPasswordCode")]
    public class ResetPasswordCode
    {
        [Required]
        [Key]
        [ForeignKey("User")]
        public int UserId { get; set; }

        [Required]
        [MaxLength(36)]
        public string Code { get; set; }

        [Required]
        public DateTime ExpirationDate { get; set; }

        public virtual User User { get; set; }

    }
}