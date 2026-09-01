using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using Localisus.Enum;

namespace Localisus.Models
{
    public class Endereco
    {
        [Key]
        public int Id { get; set; }

        [Required(ErrorMessage = "Logradouro é obrigatório.")]
        [StringLength(150)]
        public string Logradouro { get; set; } = string.Empty;

        [Required(ErrorMessage = "Número é obrigatório.")]
        [StringLength(10)]
        public string Numero { get; set; } = string.Empty;

        [StringLength(150)]
        public string Complemento { get; set; } = string.Empty;

        [Required(ErrorMessage = "Bairro é obrigatório.")]
        [StringLength(100)]
        public string Bairro { get; set; } = string.Empty;

        [Required(ErrorMessage = "Cidade é obrigatória.")]
        [StringLength(100)]
        public string Cidade { get; set; } = string.Empty;

        [Required(ErrorMessage = "Estado é obrigatório.")]
        [StringLength(50)]
        public string Estado { get; set; } = string.Empty;

        [Required(ErrorMessage = "CEP é obrigatório.")]
        [StringLength(9)]
        public string CEP { get; set; } = string.Empty;

        [Required]
        public TipoEndereco TipoEndereco { get; set; }

        public int ClienteId { get; set; }

        [ForeignKey(nameof(ClienteId))]
        [JsonIgnore]
        public Cliente Cliente { get; set; } = null!;
    }
}