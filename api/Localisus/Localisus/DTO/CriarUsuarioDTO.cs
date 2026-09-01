using Localisus.Enum;

namespace Localisus.DTO
{
    public class CriarUsuarioDTO
    {
        public string Nome { get; set; } = string.Empty;

        public string Email { get; set; } = string.Empty;

        public string CPF { get; set; } = string.Empty;

        public int? HospitalId { get; set; }

        public TipoUsuario TipoUsuario { get; set; }

        public string Senha { get; set; } = string.Empty;
    }
}