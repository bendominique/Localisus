using projetointegrador.API.Enum;
using System.ComponentModel.DataAnnotations;

namespace projetointegrador.API.Models
{
    public class Usuario
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
        public TipoUsuario TipoUsuario { get; set; } //importando o enum para especificar qual é o tipo de usuário que é cadastrado no sistema   
        public int? HospitalId { get; set; } //chave estrangeira para o hospital, indicando a qual hospital o usuário está associado, caso seja um funcionário de um hospital específico. ? permite que o valor seja nulo, ou seja, um usuário pode não estar associado a nenhum hospital, como no caso de um cliente.
        public List<Endereco> Enderecos { get; set; } = [];
        public List<Medicamento> Medicamentos { get; set; } = [];

        //propriedade de navegação para a relação entre usuário e hospital, indicando que um usuário pode estar associado a um hospital específico, caso seja um funcionário de um hospital.
        public Hospital? Hospital { get; set; }

        //O cliente possui uma lista de endereços, ou seja, um cliente pode ter vários endereços associados a ele.
        //No banco de dados relacional, isso se traduziria em uma relação de um para muitos entre as tabelas "Clientes" e "Enderecos", onde um cliente pode ter vários endereços associados a ele.
        //Um exemplo de cardinalidade 1:N (um para muitos) seria: um cliente pode ter vários endereços, mas cada endereço pertence a apenas um cliente.

        public Usuario() { 
           
            DataCadastro = DateTime.UtcNow;
            Ativo = true;

        }
    }
}
