using System.ComponentModel.DataAnnotations;

namespace Localisus.Models
{
    public class Estoque
    {
        [Key]
        public int Id { get; set; }

        public int HospitalID { get; set; }

        public int MedicamentoID { get; set; }

        [Range(0, int.MaxValue)]
        public int Quantidade { get; set; }

        public int Lote { get; set; }

        public DateTime DataValidade { get; set; }

        public DateTime DataAtualizacao { get; set; } = DateTime.UtcNow;

        public int UsuarioID { get; set; }

        public bool Status { get; set; } = true;
    }
}