using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace projetointegrador.API.Models
{
    public class Endereco
    {
        [Key]
        public int Id{ get; set; }
        
        [Required(ErrorMessage = "Logradouro é um valor obrigatório!")]
        public string Logradouro { get; set; } = string.Empty;
        
        [Required(ErrorMessage = "Número é um valor obrigatório!")]
        [StringLength(10)]
        public string Numero { get; set; } = string.Empty;
        
        [StringLength(150)]
        public string Complemento { get; set; } = string.Empty;
        
        [Required(ErrorMessage = "Bairro é um valor obrigatório!")]
        [StringLength(100)]
        public string Bairro { get; set; } = string.Empty;
        
        [Required(ErrorMessage = "Cidade é um valor obrigatório!")]
        [StringLength(100)]
        public string Cidade { get; set; } = string.Empty;

        [Required(ErrorMessage = "Estado é um valor obrigatório!")]
        [StringLength(50)]
        public string Estado { get; set; } = string.Empty;

        [Required(ErrorMessage = "CEP é um valor obrigatório!")]
        [StringLength(9)]
        public string CEP { get; set; } = string.Empty;

        //instânciando a propriedade ClienteId, que é a chave estrangeira que relaciona o endereço ao cliente correspondente.
        public int ClienteId { get; set; }

        //Agora estamos convocando a propriedade Cliente, que é a referência de navegação para o cliente associado a esse endereço. Isso permite acessar as informações do cliente diretamente a partir do endereço.
        //JsonIgnore significa que a propriedade Cliente não será incluída na serialização JSON, evitando assim a referência circular entre Endereco e Cliente.
        //A anotação [ForeignKey(nameof(ClienteId))] indica que a propriedade ClienteId é a chave estrangeira que estabelece a relação entre as entidades Endereco e Cliente. Isso ajuda o Entity Framework a entender como as tabelas estão relacionadas no banco de dados.
        [ForeignKey(nameof(ClienteId))]
        [JsonIgnore]
        public Cliente Cliente { get; set; } = null!;
        //Quando estamos passando public Cliente Cliente, apenas estamos dizendo para o Entity Framework que existe uma relação entre as entidades Endereco e Cliente, onde um endereço pertence a um cliente específico. O Entity Framework irá usar essa informação para criar a estrutura de banco de dados adequada e para gerenciar as operações de consulta e manipulação de dados relacionadas a essas entidades. Mas que não necessariamente sera usada
    }
}
