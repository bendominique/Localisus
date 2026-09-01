using System.ComponentModel.DataAnnotations;

namespace Localisus.Models
{
    public class Hospital
    {
        [Key]
        public int Id { get; set; }

        [Required(ErrorMessage = "O nome do hospital é obrigatório.")]
        [StringLength(100, ErrorMessage = "O nome não pode exceder 100 caracteres.")]
        public string Nome { get; set; } = string.Empty;

        [StringLength(200)]
        public string Endereco { get; set; } = string.Empty;

        [Required(ErrorMessage = "O telefone é obrigatório.")]
        [StringLength(11, ErrorMessage = "O telefone deve conter 11 caracteres.")]
        public string Telefone { get; set; } = string.Empty;

        public List<Usuario> Usuarios { get; set; } = new();

        public List<ItemEstoque> ItensEstoque { get; set; } = new();
    }
}