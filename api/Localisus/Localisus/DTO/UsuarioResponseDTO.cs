using Localisus.Enum;

namespace Localisus.DTO
{
    public class UsuarioResponseDTO
    {
        public int Id { get; set; }

        public string Nome { get; set; } = string.Empty;

        public string Email { get; set; } = string.Empty;

        public string CPF { get; set; } = string.Empty;

        public TipoUsuario TipoUsuario { get; set; }

        public int? HospitalId { get; set; }

        public bool Ativo { get; set; }

        public DateTime DataCadastro { get; set; }
    }
}