using API.Enun;
using System.ComponentModel.DataAnnotations;

namespace API.Models
{
    public class Endereco
    {
        [Key]
        public int Id { get; set; }
    
        [Required(ErrorMessage = "O campo Logradouro é obrigatório.")]
        public string Logradouro { get; set; } = string.Empty;

        [StringLength(11)]
        [Required(ErrorMessage = "O campo Número é obrigatório.")]
        public string Numero { get; set; } = string.Empty;

        [StringLength(100)]
        [Required(ErrorMessage = "O campo Complemento é obrigatório.")]
        public string Complemento { get; set; } = string.Empty;

        [StringLength(60)]
        [Required(ErrorMessage = "O campo Bairro é obrigatório.")]
        public string Bairro { get; set; } = string.Empty;

        [StringLength(60)]
        [Required(ErrorMessage = "O campo Cidade é obrigatório.")]
        public string Cidade { get; set; } = string.Empty;

        [StringLength(2)]
        [Required(ErrorMessage = "O campo Estado é obrigatório.")]
        public string Estado { get; set; } = string.Empty;

        [StringLength(8)]
        [Required(ErrorMessage = "O campo CEP é obrigatório.")]
        public string Cep { get; set; } = string.Empty;


        public TipoEndereco TipoEndereco { get; internal set; } 

    }
}
