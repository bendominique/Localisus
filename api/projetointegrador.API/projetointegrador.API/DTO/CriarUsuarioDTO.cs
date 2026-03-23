using projetointegrador.API.Enum;

namespace projetointegrador.API.DTO
{
    public class CriarUsuarioDTO
    {
        public string Nome { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string CPF { get; set; } = string.Empty;
        public int? HospitalId { get; set; } //verificando se o usuário é um funcionário de um hospital específico, caso contrário, ele pode ser um cliente sem associação a nenhum hospital.
        public TipoUsuario TipoUsuario { get; set; } //definindo o tipo de usuário, se é um cliente ou um funcionário, isso é importante para determinar as permissões e funcionalidades disponíveis para cada tipo de usuário no sistema.
    }
}
