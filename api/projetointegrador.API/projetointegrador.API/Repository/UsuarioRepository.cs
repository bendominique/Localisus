using Microsoft.EntityFrameworkCore;
using projetointegrador.API.Data;
using projetointegrador.API.Models;

namespace projetointegrador.API.Repository
{
    public class UsuarioRepository : IUsuarioRepository
    {
        private readonly AppDbContext _context;
        //injeção de dependência
        public UsuarioRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<Usuario>> GetAllUsuariosAsync()
        {
            return await _context.Usuarios.Include(u => u.Enderecos).ToListAsync();
        }

        public async Task<Usuario?> GetUsuarioByIdAsync(int id)
        {
            return await _context.Usuarios.FirstOrDefaultAsync(u => u.Id == id);
        }

        public async Task<bool> ExisteHospitalAsync(int? hospitalId)
        {
            return await _context.Hospitais.AnyAsync(h => h.Id == hospitalId);
        }

        public async Task AdicionarUsuarioAsync(Usuario usuario)
        {
            _context.Usuarios.Add(usuario);
            await _context.SaveChangesAsync();
        }
    }
}
