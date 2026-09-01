using Localisus.Data;
using Localisus.DTO;
using Localisus.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Localisus.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsuariosController : ControllerBase
    {
        private readonly AppDbContext _context;

        public UsuariosController(AppDbContext context)
        {
            _context = context;
        }

        // --------------------------------------------------
        // GET: api/Usuarios
        // --------------------------------------------------

        [HttpGet]
        [Authorize(Roles = "Administrador,Funcionario")]
        public async Task<IActionResult> GetUsuarios()
        {
            var usuarios = await _context.Usuarios
                .Include(u => u.Hospital)
                .Select(u => new UsuarioResponseDTO
                {
                    Id = u.Id,
                    Nome = u.Nome,
                    Email = u.Email,
                    CPF = u.CPF,
                    TipoUsuario = u.TipoUsuario,
                    HospitalId = u.HospitalId,
                    Ativo = u.Ativo,
                    DataCadastro = u.DataCadastro
                })
                .ToListAsync();

            return Ok(usuarios);
        }

        // --------------------------------------------------
        // GET: api/Usuarios/5
        // --------------------------------------------------

        [HttpGet("{id:int}")]
        [Authorize]
        public async Task<IActionResult> GetUsuario(int id)
        {
            var usuario = await _context.Usuarios
                .Include(u => u.Hospital)
                .FirstOrDefaultAsync(u => u.Id == id);

            if (usuario == null)
            {
                return NotFound(new
                {
                    mensagem = "Usuário não encontrado."
                });
            }

            return Ok(new UsuarioResponseDTO
            {
                Id = usuario.Id,
                Nome = usuario.Nome,
                Email = usuario.Email,
                CPF = usuario.CPF,
                TipoUsuario = usuario.TipoUsuario,
                HospitalId = usuario.HospitalId,
                Ativo = usuario.Ativo,
                DataCadastro = usuario.DataCadastro
            });
        }

        // --------------------------------------------------
        // POST: api/Usuarios
        // --------------------------------------------------

        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> CriarUsuario(
            [FromBody] CriarUsuarioDTO dto)
        {
            if (dto == null)
            {
                return BadRequest(new
                {
                    mensagem = "Dados do usuário não foram enviados."
                });
            }

            if (string.IsNullOrWhiteSpace(dto.Nome))
            {
                return BadRequest(new
                {
                    mensagem = "O nome é obrigatório."
                });
            }

            if (string.IsNullOrWhiteSpace(dto.Email))
            {
                return BadRequest(new
                {
                    mensagem = "O email é obrigatório."
                });
            }

            if (string.IsNullOrWhiteSpace(dto.CPF))
            {
                return BadRequest(new
                {
                    mensagem = "O CPF é obrigatório."
                });
            }

            if (string.IsNullOrWhiteSpace(dto.Senha))
            {
                return BadRequest(new
                {
                    mensagem = "A senha é obrigatória."
                });
            }

            var cpfExiste = await _context.Usuarios
                .AnyAsync(u => u.CPF == dto.CPF);

            if (cpfExiste)
            {
                return Conflict(new
                {
                    mensagem = "Já existe um usuário cadastrado com este CPF."
                });
            }

            var emailExiste = await _context.Usuarios
                .AnyAsync(u => u.Email == dto.Email);

            if (emailExiste)
            {
                return Conflict(new
                {
                    mensagem = "Já existe um usuário cadastrado com este email."
                });
            }

            if (dto.HospitalId.HasValue)
            {
                var hospitalExiste = await _context.Hospitais
                    .AnyAsync(h => h.Id == dto.HospitalId.Value);

                if (!hospitalExiste)
                {
                    return BadRequest(new
                    {
                        mensagem = "O hospital informado não existe."
                    });
                }
            }

            var usuario = new Usuario
            {
                Nome = dto.Nome.Trim(),
                Email = dto.Email.Trim().ToLowerInvariant(),
                CPF = dto.CPF.Trim(),
                HospitalId = dto.HospitalId,
                TipoUsuario = dto.TipoUsuario,
                SenhaHash = BCrypt.Net.BCrypt.HashPassword(dto.Senha),
                Ativo = true,
                DataCadastro = DateTime.UtcNow
            };

            _context.Usuarios.Add(usuario);

            await _context.SaveChangesAsync();

            return CreatedAtAction(
                nameof(GetUsuario),
                new { id = usuario.Id },
                new UsuarioResponseDTO
                {
                    Id = usuario.Id,
                    Nome = usuario.Nome,
                    Email = usuario.Email,
                    CPF = usuario.CPF,
                    TipoUsuario = usuario.TipoUsuario,
                    HospitalId = usuario.HospitalId,
                    Ativo = usuario.Ativo,
                    DataCadastro = usuario.DataCadastro
                }
            );
        }

        // --------------------------------------------------
        // PUT: api/Usuarios/5
        // --------------------------------------------------

        [HttpPut("{id:int}")]
        [Authorize(Roles = "Administrador")]
        public async Task<IActionResult> AtualizarUsuario(
            int id,
            [FromBody] CriarUsuarioDTO dto)
        {
            var usuario = await _context.Usuarios
                .FirstOrDefaultAsync(u => u.Id == id);

            if (usuario == null)
            {
                return NotFound(new
                {
                    mensagem = "Usuário não encontrado."
                });
            }

            var cpfExiste = await _context.Usuarios
                .AnyAsync(u =>
                    u.CPF == dto.CPF &&
                    u.Id != id);

            if (cpfExiste)
            {
                return Conflict(new
                {
                    mensagem = "O CPF já está sendo utilizado por outro usuário."
                });
            }

            var emailExiste = await _context.Usuarios
                .AnyAsync(u =>
                    u.Email == dto.Email &&
                    u.Id != id);

            if (emailExiste)
            {
                return Conflict(new
                {
                    mensagem = "O email já está sendo utilizado por outro usuário."
                });
            }

            usuario.Nome = dto.Nome.Trim();
            usuario.Email = dto.Email.Trim().ToLowerInvariant();
            usuario.CPF = dto.CPF.Trim();
            usuario.TipoUsuario = dto.TipoUsuario;
            usuario.HospitalId = dto.HospitalId;

            if (!string.IsNullOrWhiteSpace(dto.Senha))
            {
                usuario.SenhaHash =
                    BCrypt.Net.BCrypt.HashPassword(dto.Senha);
            }

            await _context.SaveChangesAsync();

            return Ok(new UsuarioResponseDTO
            {
                Id = usuario.Id,
                Nome = usuario.Nome,
                Email = usuario.Email,
                CPF = usuario.CPF,
                TipoUsuario = usuario.TipoUsuario,
                HospitalId = usuario.HospitalId,
                Ativo = usuario.Ativo,
                DataCadastro = usuario.DataCadastro
            });
        }

        // --------------------------------------------------
        // DELETE: api/Usuarios/5
        // --------------------------------------------------

        [HttpDelete("{id:int}")]
        [Authorize(Roles = "Administrador")]
        public async Task<IActionResult> DeletarUsuario(int id)
        {
            var usuario = await _context.Usuarios
                .FirstOrDefaultAsync(u => u.Id == id);

            if (usuario == null)
            {
                return NotFound(new
                {
                    mensagem = "Usuário não encontrado."
                });
            }

            usuario.Ativo = false;

            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}