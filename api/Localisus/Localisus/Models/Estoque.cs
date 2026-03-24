using System.ComponentModel.DataAnnotations;

namespace Localisus.Models
{
    public class Estoque
    {
        [Key]   
        public int Id { get; set; }
        public int HospitalID { get; set; } //ID da unidade hospitalar que possui o estoque
        public int MedicamentoID { get; set; }
        public int Quantidade { get; set; }
        public int Lote { get; set; }
        public DateTime DataValidade { get; set; }
        public DateTime DataAtualizacao { get; set; }
        public int UsuarioID { get; set; } // ID do usuário que fez a última atualização
        public bool Staus { get; set; } // Indica se o estoque está ativo ou inativo

    }
}
