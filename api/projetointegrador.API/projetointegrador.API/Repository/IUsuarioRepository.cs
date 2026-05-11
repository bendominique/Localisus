using projetointegrador.API.Models;

namespace projetointegrador.API.Repository
{
    public interface IUsuarioRepository
    {
        Task<List<Usuario>> GetAllUsuariosAsync();
        Task<Usuario?> GetUsuarioByIdAsync(int id);
        Task<bool> ExisteHospitalAsync(int? hospitalId);
        Task AdicionarUsuarioAsync(Usuario usuario);
    }
}
