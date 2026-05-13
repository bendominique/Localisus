using projetointegrador.API.Enum;

namespace projetointegrador.API.DTO
{
    public class UsuarioReadDTO
    {
        public string Nome { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string CPF { get; set; } = string.Empty;
        public int? HospitalId { get; set; } 
        public string TipoUsuario { get; set; } //o tipo de usuário está sendo registrado como uma string no DTO de leitura para facilitar a compreensão do nosso frontend ao realizar o acesso.

    }
}
