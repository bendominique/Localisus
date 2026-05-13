using System.ComponentModel.DataAnnotations;

namespace projetointegrador.API.Models
{
    public class Medicamento
    {
        [Key]
        public int IdMedicamento { get; set; }
        [Required(ErrorMessage = "É necessário especificar o nome do medicamento")]
        public string Nome { get; set; }

        [Required(ErrorMessage = "É necessário especificar a descrição do medicamento")]
        public string Descricao { get; set; }
        
        [Required(ErrorMessage = "É necessário especificar a dosagem do medicamento")]
        public float Dosagem { get; set; }

        [Required(ErrorMessage = "É necessário especificar a quantidade que está sendo implementada")]
        public int Quantidade{ get; set; }  
        public DateTime DataAtualizacao { get; set; } = DateTime.UtcNow;

    }
}
