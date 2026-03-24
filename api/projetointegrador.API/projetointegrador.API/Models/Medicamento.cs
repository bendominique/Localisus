using System.ComponentModel.DataAnnotations;

namespace projetointegrador.API.Models
{
    public class Medicamento
    {
        [Key]
        public int IdMedicamento { get; set; }
        public string NomeMedicamento { get; set; }
        public float Dosagem { get; set; }
        public int Quantidade{ get; set; }
        
    }
}
