using Microsoft.IdentityModel.Tokens;
using projetointegrador.API.DTO;
using projetointegrador.API.Models;
using projetointegrador.API.Repository;

namespace projetointegrador.API.Services
{
    public class UsuarioService : IUsuarioService
    {
        private readonly IUsuarioRepository _usuarioRepository;

        public UsuarioService(IUsuarioRepository usuarioRepository)
        {
            _usuarioRepository = usuarioRepository;

        }

        public async Task<Usuario> CriarUsuarioAsync(CriarUsuarioDTO dadosUsuario)
        {
            if (dadosUsuario.TipoUsuario == Enum.TipoUsuario.Funcionario && dadosUsuario.HospitalId == null)
           {
                throw new ArgumentException("O usuário do tipo Funcionário, deve conter um Id do Hospital válido");
           }

           if (dadosUsuario.HospitalId != null)
            {
                var hospitalExiste = await _usuarioRepository.ExisteHospitalAsync(dadosUsuario.HospitalId);
                if (!hospitalExiste)
                {
                    throw new ArgumentException($"O hospital com o id: {dadosUsuario.HospitalId} não foi encontrado");
                }
            }

            string senhaHash = BCrypt.Net.BCrypt.HashPassword(dadosUsuario.Senha);

            Usuario usuario = new Usuario
            {
                Nome = dadosUsuario.Nome,
                Email = dadosUsuario.Email,
                CPF = dadosUsuario.CPF,
                TipoUsuario = dadosUsuario.TipoUsuario,
                SenhaHash = senhaHash
            };

            await _usuarioRepository.AdicionarUsuarioAsync(usuario);
            return usuario;
        }

        public async Task<Usuario> GetUsuarioByIdAsync(int id)
        {
            var usuario = await _usuarioRepository.GetUsuarioByIdAsync(id);
            if(usuario == null)
            {
                throw new KeyNotFoundException($"O usuário com o id {id} não foi encontrado ");
                
            }
            return usuario;
        }


        public async Task<List<Usuario>> GetAlUsuariosAsync()
        {
            return await _usuarioRepository.GetAllUsuariosAsync();
        }
    }
}
