using Localisus.Data;
using Localisus.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Localisus.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class EstoqueController : ControllerBase
    {
        private readonly AppDbContext _context;

        public EstoqueController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Estoque
        [HttpGet]
        public async Task<IActionResult> GetEstoque(
            [FromQuery] int? hospitalId,
            [FromQuery] int? medicamentoId)
        {
            var query = _context.ItensEstoque
                .Include(i => i.Medicamento)
                .Include(i => i.Hospital)
                .AsQueryable();

            if (hospitalId.HasValue)
            {
                query = query.Where(
                    i => i.HospitalId == hospitalId.Value);
            }

            if (medicamentoId.HasValue)
            {
                query = query.Where(
                    i => i.MedicamentoId == medicamentoId.Value);
            }

            var estoque = await query
                .OrderBy(i => i.Medicamento.NomeMedicamento)
                .Select(i => new
                {
                    i.Id,
                    i.Quantidade,
                    i.CodigoLote,
                    i.ValidadeLote,
                    i.DataAtualizacao,

                    medicamento = new
                    {
                        i.Medicamento.IdMedicamento,
                        i.Medicamento.NomeMedicamento,
                        i.Medicamento.Dosagem
                    },

                    hospital = new
                    {
                        i.Hospital.Id,
                        i.Hospital.Nome
                    }
                })
                .ToListAsync();

            return Ok(estoque);
        }

        // GET: api/Estoque/5
        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetItemEstoque(int id)
        {
            var item = await _context.ItensEstoque
                .Include(i => i.Medicamento)
                .Include(i => i.Hospital)
                .FirstOrDefaultAsync(i => i.Id == id);

            if (item == null)
            {
                return NotFound(new
                {
                    mensagem = "Item de estoque não encontrado."
                });
            }

            return Ok(new
            {
                item.Id,
                item.Quantidade,
                item.CodigoLote,
                item.ValidadeLote,
                item.DataAtualizacao,

                medicamento = new
                {
                    item.Medicamento.IdMedicamento,
                    item.Medicamento.NomeMedicamento,
                    item.Medicamento.Dosagem
                },

                hospital = new
                {
                    item.Hospital.Id,
                    item.Hospital.Nome
                }
            });
        }

        // POST: api/Estoque
        [HttpPost]
        [Authorize(Roles = "Administrador,Funcionario")]
        public async Task<IActionResult> AdicionarEstoque(
            [FromBody] CriarEstoqueRequest request)
        {
            if (request.Quantidade <= 0)
            {
                return BadRequest(new
                {
                    mensagem =
                        "A quantidade deve ser maior que zero."
                });
            }

            var medicamento = await _context.Medicamentos
                .FirstOrDefaultAsync(
                    m => m.IdMedicamento == request.MedicamentoId);

            if (medicamento == null)
            {
                return NotFound(new
                {
                    mensagem = "Medicamento não encontrado."
                });
            }

            var hospital = await _context.Hospitais
                .FirstOrDefaultAsync(
                    h => h.Id == request.HospitalId);

            if (hospital == null)
            {
                return NotFound(new
                {
                    mensagem = "Hospital não encontrado."
                });
            }

            var item = new ItemEstoque
            {
                MedicamentoId = request.MedicamentoId,
                HospitalId = request.HospitalId,
                Quantidade = request.Quantidade,
                CodigoLote = request.CodigoLote?.Trim() ?? string.Empty,
                ValidadeLote = request.ValidadeLote,
                DataAtualizacao = DateTime.UtcNow
            };

            _context.ItensEstoque.Add(item);

            medicamento.Quantidade += request.Quantidade;

            await _context.SaveChangesAsync();

            return CreatedAtAction(
                nameof(GetItemEstoque),
                new { id = item.Id },
                new
                {
                    item.Id,
                    item.Quantidade,
                    item.CodigoLote,
                    item.ValidadeLote,
                    item.MedicamentoId,
                    item.HospitalId
                }
            );
        }

        // PUT: api/Estoque/5
        [HttpPut("{id:int}")]
        [Authorize(Roles = "Administrador,Funcionario")]
        public async Task<IActionResult> AtualizarEstoque(
            int id,
            [FromBody] AtualizarEstoqueRequest request)
        {
            var item = await _context.ItensEstoque
                .Include(i => i.Medicamento)
                .FirstOrDefaultAsync(i => i.Id == id);

            if (item == null)
            {
                return NotFound(new
                {
                    mensagem = "Item de estoque não encontrado."
                });
            }

            if (request.Quantidade < 0)
            {
                return BadRequest(new
                {
                    mensagem =
                        "A quantidade não pode ser negativa."
                });
            }

            var diferenca =
                request.Quantidade - item.Quantidade;

            item.Quantidade = request.Quantidade;

            item.Medicamento.Quantidade += diferenca;

            item.CodigoLote =
                request.CodigoLote?.Trim() ?? item.CodigoLote;

            item.ValidadeLote = request.ValidadeLote;

            item.DataAtualizacao = DateTime.UtcNow;

            await _context.SaveChangesAsync();

            return Ok(new
            {
                item.Id,
                item.Quantidade,
                item.CodigoLote,
                item.ValidadeLote,
                item.DataAtualizacao
            });
        }

        // DELETE: api/Estoque/5
        [HttpDelete("{id:int}")]
        [Authorize(Roles = "Administrador")]
        public async Task<IActionResult> RemoverEstoque(int id)
        {
            var item = await _context.ItensEstoque
                .Include(i => i.Medicamento)
                .FirstOrDefaultAsync(i => i.Id == id);

            if (item == null)
            {
                return NotFound(new
                {
                    mensagem = "Item de estoque não encontrado."
                });
            }

            item.Medicamento.Quantidade -= item.Quantidade;

            if (item.Medicamento.Quantidade < 0)
            {
                item.Medicamento.Quantidade = 0;
            }

            _context.ItensEstoque.Remove(item);

            await _context.SaveChangesAsync();

            return NoContent();
        }
    }

    public class CriarEstoqueRequest
    {
        public int MedicamentoId { get; set; }

        public int HospitalId { get; set; }

        public int Quantidade { get; set; }

        public string? CodigoLote { get; set; }

        public DateTime ValidadeLote { get; set; }
    }

    public class AtualizarEstoqueRequest
    {
        public int Quantidade { get; set; }

        public string? CodigoLote { get; set; }

        public DateTime ValidadeLote { get; set; }
    }
}