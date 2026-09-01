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
    public class HospitalController : ControllerBase
    {
        private readonly AppDbContext _context;

        public HospitalController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Hospital
        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> GetHospitais()
        {
            var hospitais = await _context.Hospitais
                .Select(h => new
                {
                    h.Id,
                    h.Nome,
                    h.Endereco,
                    h.Telefone
                })
                .ToListAsync();

            return Ok(hospitais);
        }

        // GET: api/Hospital/5
        [HttpGet("{id:int}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetHospital(int id)
        {
            var hospital = await _context.Hospitais
                .Include(h => h.Usuarios)
                .Include(h => h.ItensEstoque)
                    .ThenInclude(i => i.Medicamento)
                .FirstOrDefaultAsync(h => h.Id == id);

            if (hospital == null)
            {
                return NotFound(new
                {
                    mensagem = "Hospital não encontrado."
                });
            }

            return Ok(new
            {
                hospital.Id,
                hospital.Nome,
                hospital.Endereco,
                hospital.Telefone,

                usuarios = hospital.Usuarios.Select(u => new
                {
                    u.Id,
                    u.Nome,
                    u.Email,
                    u.CPF,
                    u.TipoUsuario,
                    u.Ativo
                }),

                estoque = hospital.ItensEstoque.Select(i => new
                {
                    i.Id,
                    i.Quantidade,
                    i.CodigoLote,
                    i.ValidadeLote,
                    medicamento = new
                    {
                        i.Medicamento.IdMedicamento,
                        i.Medicamento.NomeMedicamento,
                        i.Medicamento.Dosagem
                    }
                })
            });
        }

        // POST: api/Hospital
        [HttpPost]
        [Authorize(Roles = "Administrador")]
        public async Task<IActionResult> CriarHospital(
            [FromBody] CriarHospitalDTO dto)
        {
            if (dto == null)
            {
                return BadRequest(new
                {
                    mensagem = "Os dados do hospital são obrigatórios."
                });
            }

            if (string.IsNullOrWhiteSpace(dto.Nome))
            {
                return BadRequest(new
                {
                    mensagem = "O nome do hospital é obrigatório."
                });
            }

            var hospital = new Hospital
            {
                Nome = dto.Nome.Trim(),
                Endereco = dto.Endereco?.Trim() ?? string.Empty,
                Telefone = dto.Telefone?.Trim() ?? string.Empty
            };

            _context.Hospitais.Add(hospital);

            await _context.SaveChangesAsync();

            return CreatedAtAction(
                nameof(GetHospital),
                new { id = hospital.Id },
                new
                {
                    hospital.Id,
                    hospital.Nome,
                    hospital.Endereco,
                    hospital.Telefone
                }
            );
        }

        // PUT: api/Hospital/5
        [HttpPut("{id:int}")]
        [Authorize(Roles = "Administrador")]
        public async Task<IActionResult> AtualizarHospital(
            int id,
            [FromBody] CriarHospitalDTO dto)
        {
            var hospital = await _context.Hospitais
                .FirstOrDefaultAsync(h => h.Id == id);

            if (hospital == null)
            {
                return NotFound(new
                {
                    mensagem = "Hospital não encontrado."
                });
            }

            hospital.Nome = dto.Nome.Trim();
            hospital.Endereco = dto.Endereco?.Trim() ?? string.Empty;
            hospital.Telefone = dto.Telefone?.Trim() ?? string.Empty;

            await _context.SaveChangesAsync();

            return Ok(new
            {
                hospital.Id,
                hospital.Nome,
                hospital.Endereco,
                hospital.Telefone
            });
        }

        // DELETE: api/Hospital/5
        [HttpDelete("{id:int}")]
        [Authorize(Roles = "Administrador")]
        public async Task<IActionResult> DeletarHospital(int id)
        {
            var hospital = await _context.Hospitais
                .FirstOrDefaultAsync(h => h.Id == id);

            if (hospital == null)
            {
                return NotFound(new
                {
                    mensagem = "Hospital não encontrado."
                });
            }

            var possuiUsuarios = await _context.Usuarios
                .AnyAsync(u => u.HospitalId == id);

            if (possuiUsuarios)
            {
                return Conflict(new
                {
                    mensagem = "Não é possível excluir um hospital que possui usuários vinculados."
                });
            }

            _context.Hospitais.Remove(hospital);

            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}