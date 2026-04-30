using projetointegrador.API.Enum;
using System.ComponentModel.DataAnnotations;

namespace projetointegrador.API.Models
{
    public class Cliente
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public TipoEndereco TipoEndereco { get; set; }
        [Required(ErrorMessage = "O nome é um valor obrigatório!")]
        [StringLength(100, ErrorMessage = "O nome deve conter no máximo 100 caracteres!")]
        public string Nome { get; set; }
        [Required(ErrorMessage = "O email é um valor obrigatório!")]
        public string Email { get; set; }
        [Required(ErrorMessage = "CPF obrigatório")]
        [StringLength(14, ErrorMessage = "O CPF deve conter 14 caracteres no formato XXX.XXX.XXX-XX")]
        [RegularExpression(@"^\d{3}\.\d{3}\.\d{3}-\d{2}$", ErrorMessage = "O CPF deve estar no formato XXX.XXX.XXX-XX")]
        public string CPF { get; set; }
        public DateTime DataCadastro { get; set; }
        public bool Ativo { get; set; }
        public List<Endereco> Enderecos { get; set; } = [];
        public List<Medicamento> Medicamentos { get; set; } = [];


        //O cliente possui uma lista de endereços, ou seja, um cliente pode ter vários endereços associados a ele.
        //No banco de dados relacional, isso se traduziria em uma relação de um para muitos entre as tabelas "Clientes" e "Enderecos", onde um cliente pode ter vários endereços associados a ele.
        //Um exemplo de cardinalidade 1:N (um para muitos) seria: um cliente pode ter vários endereços, mas cada endereço pertence a apenas um cliente.

        public Cliente() { 
           
            DataCadastro = DateTime.UtcNow;
            Ativo = true;

        }
    }
}
