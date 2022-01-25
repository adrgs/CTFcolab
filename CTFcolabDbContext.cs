using System.Data.Common;
using System.Data.Entity;
using SQLite.CodeFirst;

namespace CTFcolab {
        [DbConfigurationType(typeof(Configuration))]
        public class CTFcolabDbContext : DbContext
    {
        public CTFcolabDbContext()
            : base("name=CTFcolabConnectionString")
        {
            Configure();
        }

        public CTFcolabDbContext(string nameOrConnectionString)
            : base(nameOrConnectionString)
        {
            Configure();
        }

        public CTFcolabDbContext(DbConnection connection, bool contextOwnsConnection)
            : base(connection, contextOwnsConnection)
        {
            Configure();
        }

        private void Configure()
        {
            Database.CreateIfNotExists();
            Configuration.ProxyCreationEnabled = true;
            Configuration.LazyLoadingEnabled = true;
        }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            ModelConfiguration.Configure(modelBuilder);
            var initializer = new CTFcolabDbInitializer(modelBuilder);
            Database.SetInitializer(initializer);
        }
    }
}