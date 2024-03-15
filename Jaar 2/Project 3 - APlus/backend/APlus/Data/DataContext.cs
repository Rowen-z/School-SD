global using Microsoft.EntityFrameworkCore;

namespace APlus.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        /**
         * @author Rowen zaal
         * Declaring the database tables for Entity Framework.
        */
        public DbSet<User> Users { get; set; }
        public DbSet<Token> Tokens { get; set; }
        public DbSet<Rubric> Rubrics { get; set; }
        public DbSet<Column> Columns { get; set; }
        public DbSet<Cell> Cells { get; set; }

        /**
         * @author Rowen zaal
         * Declaring table settings in the ModelBuilder.
         * @param modelBuilder is used for configuring the database entities & relationships.
        */
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            /**
             * @author Rowen zaal
             * Converting the Role entity in the Users table to a string.
            */
            modelBuilder.Entity<User>()
                .Property(user => user.Role)
                .HasConversion<string>();

            /**
             * @author Rowen zaal
             * Declaring the UserNumber entity as Foreign Key in the Tokens table.
            */
            modelBuilder.Entity<Token>()
                .HasOne(user => user.User)
                .WithMany()
                .HasForeignKey(token => token.UserNumber);

            /**
             * @author Rowen zaal
             * Declaring the UserNumber entity as Foreign Key in the Rubrics table. Deleting a user doesn't remove the rubric from the database.
            */
            modelBuilder.Entity<Rubric>()
                .HasOne(user => user.User)
                .WithMany()
                .HasForeignKey(rubric => rubric.UserNumber)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
