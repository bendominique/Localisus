using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace projetointegrador.API.Models
{
    public class ItemEstoque
    {
        [Key]
        public int Id { get; set; }
        [Required]
          public int Quantidade { get; set; } 

        //Foreign Key para os medicamentos abaixo
        [Required]
        public int MedicamentoId { get; set; }
        [ForeignKey("MedicamentoId")]
        public Medicamento Medicamento { get; set; }
        //Foreign Key para os hospitais abaixo
        [Required]
        public int HospitalId { get; set; } 
        [ForeignKey("HospitalId")]
        public Hospital Hospital { get; set; }
        public DateTime ValidadeLote { get; set; }
        public DateTime DataAtualizacao { get; set; } = DateTime.UtcNow;
        public string CodigoLote { get; set; } = string.Empty;
    }
}


/*
 * 
 * 
 * Tabela intermediária Lógica: 1. A Lógica do "ItemEstoque"

Esta classe não apenas liga o Medicamento ao Hospital, ela guarda a quantidade e a validade.

Estrutura da Entidade:

    ID do Medicamento (FK)

    ID do Hospital/Unidade (FK)

    Quantidade (Inteiro)

    Lote/Validade (Importante para remédios)

2. Português Estruturado da Intermediária
Plaintext

CLASSE ItemEstoque
    PROPRIEDADES:
        MedicamentoId (Inteiro)
        HospitalId (Inteiro)
        Quantidade (Inteiro)
        DataValidade (Data)
        CodigoLote (Texto)

    RELACIONAMENTOS:
        MUITOS ItemEstoque PERTENCEM A UM Medicamento
        MUITOS ItemEstoque PERTENCEM A UM Hospital/Endereço

    MÉTODO AdicionarEstoque(qtd):
        SE qtd > 0 ENTÃO 
            Quantidade = Quantidade + qtd
            RETORNAR Sucesso
        SENÃO
            RETORNAR Erro

    MÉTODO RetirarEstoque(qtd):
        SE Quantidade >= qtd ENTÃO
            Quantidade = Quantidade - qtd
            RETORNAR Sucesso
        SENÃO
            RETORNAR "Estoque Insuficiente"


 * 
 */