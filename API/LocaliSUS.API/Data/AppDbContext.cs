using Microsoft.EntityFrameworkCore;

namespace LocaliSUS.API.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }
        public DbSet<Models.Hospital> Hospitais { get; set; }
    }
}
