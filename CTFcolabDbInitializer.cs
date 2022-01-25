using System.Data.Entity;
using SQLite.CodeFirst;
using CTFcolab.Entity;

namespace CTFcolab {
    public class CTFcolabDbInitializer : SqliteDropCreateDatabaseWhenModelChanges<CTFcolabDbContext>
    {
        public CTFcolabDbInitializer(DbModelBuilder modelBuilder)
            : base(modelBuilder, typeof(CustomHistory))
        { }

        protected override void Seed(CTFcolabDbContext context)
        {
            // Here you can seed your core data if you have any.
        }
    }
}