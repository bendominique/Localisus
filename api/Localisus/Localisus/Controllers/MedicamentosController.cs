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
    public class MedicamentosController : ControllerBase
    {
        private readonly AppDbContext _context;

        public MedicamentosController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Medicamentos
        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> GetMedicamentos(
            [FromQuery] string? busca)
        {
            var query = _context.Medicamentos
                .AsQueryable();

            if (!string.IsNullOrWhiteSpace(busca))
            {
                var termo = busca.Trim().ToLower();

                query = query.Where(m =>
                    m.NomeMedicamento
                        .ToLower()
                        .Contains(termo));
            }

            var medicamentos = await query
                .OrderBy(m => m.NomeMedicamento)
                .Select(m => new
                {
                    m.IdMedicamento,
                    m.NomeMedicamento,
                    m.Dosagem,
                    m.Quantidade
                })
                .ToListAsync();

            return Ok(medicamentos);
        }

        // GET: api/Medicamentos/5
        [HttpGet("{id:int}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetMedicamento(int id)
        {
            var medicamento = await _context.Medicamentos
                .Include(m => m.ItensEstoque)
                    .ThenInclude(i => i.Hospital)
                .FirstOrDefaultAsync(
                    m => m.IdMedicamento == id);

            if (medicamento == null)
            {
                return NotFound(new
                {
                    mensagem = "Medicamento não encontrado."
                });
            }

            return Ok(new
            {
                medicamento.IdMedicamento,
                medicamento.NomeMedicamento,
                medicamento.Dosagem,
                medicamento.Quantidade,

                estoque = medicamento.ItensEstoque.Select(i => new
                {
                    i.Id,
                    i.Quantidade,
                    i.CodigoLote,
                    i.ValidadeLote,

                    hospital = new
                    {
                        i.Hospital.Id,
                        i.Hospital.Nome
                    }
                })
            });
        }

        // POST: api/Medicamentos
        [HttpPost]
        [Authorize(Roles = "Administrador,Funcionario")]
        public async Task<IActionResult> CriarMedicamento(
            [FromBody] CriarMedicamentoDTO dto)
        {
            if (dto == null)
            {
                return BadRequest(new
                {
                    mensagem = "Os dados do medicamento são obrigatórios."
                });
            }

            if (string.IsNullOrWhiteSpace(dto.NomeMedicamento))
            {
                return BadRequest(new
                {
                    mensagem = "O nome do medicamento é obrigatório."
                });
            }

            if (dto.Dosagem <= 0)
            {
                return BadRequest(new
                {
                    mensagem = "A dosagem deve ser maior que zero."
                });
            }

            if (dto.Quantidade < 0)
            {
                return BadRequest(new
                {
                    mensagem = "A quantidade não pode ser negativa."
                });
            }

            var medicamento = new Medicamento
            {
                NomeMedicamento = dto.NomeMedicamento.Trim(),
                Dosagem = dto.Dosagem,
                Quantidade = dto.Quantidade
            };

            _context.Medicamentos.Add(medicamento);

            await _context.SaveChangesAsync();

            return CreatedAtAction(
                nameof(GetMedicamento),
                new { id = medicamento.IdMedicamento },
                new
                {
                    medicamento.IdMedicamento,
                    medicamento.NomeMedicamento,
                    medicamento.Dosagem,
                    medicamento.Quantidade
                }
            );
        }

        // PUT: api/Medicamentos/5
        [HttpPut("{id:int}")]
        [Authorize(Roles = "Administrador,Funcionario")]
        public async Task<IActionResult> AtualizarMedicamento(
            int id,
            [FromBody] CriarMedicamentoDTO dto)
        {
            var medicamento = await _context.Medicamentos
                .FirstOrDefaultAsync(
                    m => m.IdMedicamento == id);

            if (medicamento == null)
            {
                return NotFound(new
                {
                    mensagem = "Medicamento não encontrado."
                });
            }

            medicamento.NomeMedicamento =
                dto.NomeMedicamento.Trim();

            medicamento.Dosagem = dto.Dosagem;

            medicamento.Quantidade = dto.Quantidade;

            await _context.SaveChangesAsync();

            return Ok(new
            {
                medicamento.IdMedicamento,
                medicamento.NomeMedicamento,
                medicamento.Dosagem,
                medicamento.Quantidade
            });
        }

        // DELETE: api/Medicamentos/5
        [HttpDelete("{id:int}")]
        [Authorize(Roles = "Administrador")]
        public async Task<IActionResult> DeletarMedicamento(int id)
        {
            var medicamento = await _context.Medicamentos
                .FirstOrDefaultAsync(
                    m => m.IdMedicamento == id);

            if (medicamento == null)
            {
                return NotFound(new
                {
                    mensagem = "Medicamento não encontrado."
                });
            }

            var possuiEstoque = await _context.ItensEstoque
                .AnyAsync(i =>
                    i.MedicamentoId == id &&
                    i.Quantidade > 0);

            if (possuiEstoque)
            {
                return Conflict(new
                {
                    mensagem =
                        "Não é possível excluir um medicamento que possui estoque."
                });
            }

            _context.Medicamentos.Remove(medicamento);

            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}