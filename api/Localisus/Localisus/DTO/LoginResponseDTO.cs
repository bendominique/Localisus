using Localisus.Enum;

namespace Localisus.DTO
{
    public class LoginResponseDTO
    {
        public string Token { get; set; } = string.Empty;

        public int UsuarioId { get; set; }

        public string Nome { get; set; } = string.Empty;

        public string Email { get; set; } = string.Empty;

        public string CPF { get; set; } = string.Empty;

        public TipoUsuario TipoUsuario { get; set; }

        public int? HospitalId { get; set; }
    }
}