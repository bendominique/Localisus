using Localisus.Models;
using Microsoft.EntityFrameworkCore;

namespace Localisus.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        public DbSet<Cliente> Clientes { get; set; } = null!;

        public DbSet<Endereco> Enderecos { get; set; } = null!;

        public DbSet<Usuario> Usuarios { get; set; } = null!;

        public DbSet<Hospital> Hospitais { get; set; } = null!;

        public DbSet<Medicamento> Medicamentos { get; set; } = null!;

        public DbSet<ItemEstoque> ItensEstoque { get; set; } = null!;

        public DbSet<Estoque> Estoques { get; set; } = null!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Cliente -> Enderecos
            modelBuilder.Entity<Cliente>()
                .HasMany(c => c.Enderecos)
                .WithOne(e => e.Cliente)
                .HasForeignKey(e => e.ClienteId)
                .OnDelete(DeleteBehavior.Cascade);

            // Hospital -> Usuarios
            modelBuilder.Entity<Hospital>()
                .HasMany(h => h.Usuarios)
                .WithOne(u => u.Hospital)
                .HasForeignKey(u => u.HospitalId)
                .OnDelete(DeleteBehavior.SetNull);

            // Medicamento -> ItemEstoque
            modelBuilder.Entity<Medicamento>()
                .HasMany(m => m.ItensEstoque)
                .WithOne(i => i.Medicamento)
                .HasForeignKey(i => i.MedicamentoId)
                .OnDelete(DeleteBehavior.Cascade);

            // Hospital -> ItemEstoque
            modelBuilder.Entity<Hospital>()
                .HasMany(h => h.ItensEstoque)
                .WithOne(i => i.Hospital)
                .HasForeignKey(i => i.HospitalId)
                .OnDelete(DeleteBehavior.Cascade);

            // CPF deve ser único
            modelBuilder.Entity<Usuario>()
                .HasIndex(u => u.CPF)
                .IsUnique();

            // Email deve ser único
            modelBuilder.Entity<Usuario>()
                .HasIndex(u => u.Email)
                .IsUnique();

            // CPF de cliente deve ser único
            modelBuilder.Entity<Cliente>()
                .HasIndex(c => c.CPF)
                .IsUnique();

            // Email de cliente deve ser único
            modelBuilder.Entity<Cliente>()
                .HasIndex(c => c.Email)
                .IsUnique();

            // Precisão da dosagem
            modelBuilder.Entity<Medicamento>()
                .Property(m => m.Dosagem)
                .HasPrecision(10, 2);
        }
    }
}