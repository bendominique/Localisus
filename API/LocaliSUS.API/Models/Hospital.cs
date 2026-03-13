using System.ComponentModel.DataAnnotations;

namespace LocaliSUS.API.Models
{
    public class Hospital
    {
        [Key]
        public int Id { get; set; }

        [Required(ErrorMessage = "Nome do hospital é um valor obrigatório")]
        [StringLength(100, ErrorMessage = "Nome não pode exceder 100 caracteres")]
        public string Nome { get; set; } = string.Empty;

        //implementar endereço

        [Required(ErrorMessage = "Telefone é um valor obrigatório")]
        [StringLength(11, ErrorMessage = "Telefone precisa ter 11 caracteres")]
        public string Telefone { get; set; } = string.Empty;
    }
}
