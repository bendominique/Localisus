using System.ComponentModel.DataAnnotations;

namespace projetointegrador.API.DTO
{
    public class RegistrarEstoqueDTO
    {
            [Required(ErrorMessage = "O ID do medicamento é obrigatório")]
            public int MedicamentoId { get; set; }

            [Required(ErrorMessage = "Informe a quantidade")]
            [Range(1, int.MaxValue, ErrorMessage = "A quantidade deve ser maior que zero")]
            public int Quantidade { get; set; }

            [Required(ErrorMessage = "O código do lote é obrigatório")]
            public string CodigoLote { get; set; } = string.Empty;

            [Required(ErrorMessage = "A data de validade é obrigatória")]
            public DateTime ValidadeLote { get; set; }

        }
    }
