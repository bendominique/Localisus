using projetointegrador.API.DTO;
using projetointegrador.API.Models;

namespace projetointegrador.API.Services
{
    public interface IUsuarioService
    {
        Task<List<Usuario>> GetAlUsuariosAsync();
        Task<Usuario> GetUsuarioByIdAsync(int id);
        Task<Usuario> CriarUsuarioAsync(CriarUsuarioDTO dadosUsuario);
    }
}
