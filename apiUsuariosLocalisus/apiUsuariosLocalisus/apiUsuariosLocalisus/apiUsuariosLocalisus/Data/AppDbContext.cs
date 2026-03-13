using apiUsuariosLocalisus.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Client;

namespace apiUsuariosLocalisus.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }
        public DbSet<Usuario> Usuarios { get; set; } //DBContext é a classe que nos permite realizar a interação com o Banco de Dados, ela é importada da biblioteca Microsoft.EntityFrameworkCore,
                                                     //e a classe DbSet é utilizada para representar uma coleção de entidades do tipo Usuario, ou seja, ela representa a tabela de usuários no banco de dados, permitindo que realizemos operações como inserção, consulta, atualização e exclusão de registros nessa tabela.

        //Caso fosse necessário configurar o modelo de dados, como por exemplo, definir chaves primárias,
        //relacionamentos ou outras restrições, poderíamos sobrescrever o método OnModelCreating da classe AppDbContext.
        //No entanto, nesse caso específico, como a classe Usuario já possui as anotações de dados (Data Annotations) para definir as propriedades e suas restrições,
        //não é necessário realizar configurações adicionais no método OnModelCreating.
    }
}
    