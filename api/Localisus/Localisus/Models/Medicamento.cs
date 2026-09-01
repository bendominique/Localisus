using System.ComponentModel.DataAnnotations;

namespace Localisus.Models
{
    public class Medicamento
    {
        [Key]
        public int IdMedicamento { get; set; }

        [Required(ErrorMessage = "O nome do medicamento é obrigatório.")]
        [StringLength(150)]
        public string NomeMedicamento { get; set; } = string.Empty;

        [Required]
        public decimal Dosagem { get; set; }

        [Required]
        [Range(0, int.MaxValue, ErrorMessage = "A quantidade não pode ser negativa.")]
        public int Quantidade { get; set; }

        public List<ItemEstoque> ItensEstoque { get; set; } = new();
    }
}