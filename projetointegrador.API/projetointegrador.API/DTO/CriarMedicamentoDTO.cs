using System.ComponentModel.DataAnnotations;

namespace projetointegrador.API.DTO
{
    public class CriarMedicamentoDTO
    {
        [Required(ErrorMessage = "O nome é obrigatório.")]
        public string Nome { get; set; }
        [Required(ErrorMessage = "A descrição é obrigatória.")]
        public string Descricao { get; set; }
        public float Dosagem { get; set; }
        public int Quantidade { get; set; } 
    }
}
