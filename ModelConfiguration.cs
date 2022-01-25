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
        }
    }
}