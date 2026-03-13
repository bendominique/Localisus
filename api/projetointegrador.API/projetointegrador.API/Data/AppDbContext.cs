using Microsoft.EntityFrameworkCore;

namespace projetointegrador.API.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }
        //DbSet representa para cada models uma tabela no banco de dados.
        //Migrations criam tabelas no banco de dados, e cada tabela tem um DbSet correspondente no AppDbContext
        public DbSet<Models.Cliente> Clientes { get; set; }
         public DbSet<Models.Endereco> Enderecos { get; set; }
        public DbSet<Models.Medicamento> Medicamentos { get; set; }
    }
}
