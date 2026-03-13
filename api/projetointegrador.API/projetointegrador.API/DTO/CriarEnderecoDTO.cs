using projetointegrador.API.Enum;

namespace projetointegrador.API.DTO
{
    public class CriarEnderecoDTO
    {
        public int ClienteId { get; set; }
        public string Logradouro { get; set; } = string.Empty;
        public string Numero { get; set; } = string.Empty;
        public string Complemento { get; set; } = string.Empty;
        public string Bairro { get; set; } = string.Empty;
        public string Cidade { get; set; } = string.Empty;
        public string Estado { get; set; } = string.Empty;
        public TipoEndereco TipoEndereco { get; set; }
        public string CEP { get; set; } = string.Empty;
    }
}
