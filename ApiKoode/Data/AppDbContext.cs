using ApiKoode.Models;
using Microsoft.EntityFrameworkCore;

namespace ApiKoode.Data
{
      public class AppDbContext : DbContext
      {
            public DbSet<Tarefa> Tarefas { get; set; }

            protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
            {
                  optionsBuilder.UseSqlite("Data Source=app.db");
                  base.OnConfiguring(optionsBuilder);
            }

            protected override void OnModelCreating(ModelBuilder modelBuilder)
            {
                  modelBuilder.Entity<Tarefa>()
                      .Property(t => t.Status)
                      .HasConversion<string>();
            }
      }
}