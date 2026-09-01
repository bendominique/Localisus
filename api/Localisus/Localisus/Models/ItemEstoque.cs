using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Localisus.Models
{
    public class ItemEstoque
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [Range(0, int.MaxValue)]
        public int Quantidade { get; set; }

        [Required]
        public int MedicamentoId { get; set; }

        [ForeignKey(nameof(MedicamentoId))]
        public Medicamento Medicamento { get; set; } = null!;

        [Required]
        public int HospitalId { get; set; }

        [ForeignKey(nameof(HospitalId))]
        public Hospital Hospital { get; set; } = null!;

        public DateTime ValidadeLote { get; set; }

        public DateTime DataAtualizacao { get; set; } = DateTime.UtcNow;

        [StringLength(100)]
        public string CodigoLote { get; set; } = string.Empty;
    }
}
