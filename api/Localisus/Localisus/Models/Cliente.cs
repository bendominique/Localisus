using System.ComponentModel.DataAnnotations;

namespace Localisus.Models
{
    public class Cliente
    {
        [Key]
        public int Id { get; set; }

        [Required(ErrorMessage = "O nome é obrigatório.")]
        [StringLength(100, ErrorMessage = "O nome deve conter no máximo 100 caracteres.")]
        public string Nome { get; set; } = string.Empty;

        [Required(ErrorMessage = "O email é obrigatório.")]
        [EmailAddress(ErrorMessage = "Informe um email válido.")]
        public string Email { get; set; } = string.Empty;

        [Required(ErrorMessage = "CPF é obrigatório.")]
        [StringLength(14, ErrorMessage = "O CPF deve conter 14 caracteres.")]
        [RegularExpression(
            @"^\d{3}\.\d{3}\.\d{3}-\d{2}$",
            ErrorMessage = "O CPF deve estar no formato XXX.XXX.XXX-XX."
        )]
        public string CPF { get; set; } = string.Empty;

        public DateTime DataCadastro { get; set; } = DateTime.UtcNow;

        public bool Ativo { get; set; } = true;

        public List<Endereco> Enderecos { get; set; } = new();
    }
}