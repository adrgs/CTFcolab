using System.Data.Entity;
using CTFcolab.Entity;

namespace CTFcolab
{
    public class ModelConfiguration
    {
        public static void Configure(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().Property(u=>u.Email).IsRequired();
            modelBuilder.Entity<User>().Property(u=>u.Name).IsRequired();
            modelBuilder.Entity<User>().Property(u=>u.Password).IsRequired();
            modelBuilder.Entity<Team>();
            modelBuilder.Entity<Competition>();
            modelBuilder.Entity<Competition>().HasRequired(c => c.Team).WithMany().WillCascadeOnDelete(true);
            modelBuilder.Entity<Comment>();
            modelBuilder.Entity<Comment>().HasRequired(c => c.Challenge).WithMany().WillCascadeOnDelete(true);
            modelBuilder.Entity<Challenge>();
            modelBuilder.Entity<Challenge>().HasRequired(c => c.Competition).WithMany().WillCascadeOnDelete(true);
        }
    }
}