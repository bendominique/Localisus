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
    public class ClientesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ClientesController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Clientes
        [HttpGet]
        [Authorize(Roles = "Administrador,Funcionario")]
        public async Task<IActionResult> GetClientes()
        {
            var clientes = await _context.Clientes
                .Include(c => c.Enderecos)
                .Select(c => new
                {
                    c.Id,
                    c.Nome,
                    c.Email,
                    c.CPF,
                    c.Ativo,
                    c.DataCadastro,

                    enderecos = c.Enderecos.Select(e => new
                    {
                        e.Id,
                        e.Logradouro,
                        e.Numero,
                        e.Complemento,
                        e.Bairro,
                        e.Cidade,
                        e.Estado,
                        e.CEP,
                        e.TipoEndereco
                    })
                })
                .ToListAsync();

            return Ok(clientes);
        }

        // GET: api/Clientes/5
        [HttpGet("{id:int}")]
        [Authorize]
        public async Task<IActionResult> GetCliente(int id)
        {
            var cliente = await _context.Clientes
                .Include(c => c.Enderecos)
                .FirstOrDefaultAsync(c => c.Id == id);

            if (cliente == null)
            {
                return NotFound(new
                {
                    mensagem = "Cliente não encontrado."
                });
            }

            return Ok(cliente);
        }

        // POST: api/Clientes
        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> CriarCliente(
            [FromBody] CriarClienteDTO dto)
        {
            if (dto == null)
            {
                return BadRequest(new
                {
                    mensagem = "Os dados do cliente são obrigatórios."
                });
            }

            var cpfExiste = await _context.Clientes
                .AnyAsync(c => c.CPF == dto.CPF);

            if (cpfExiste)
            {
                return Conflict(new
                {
                    mensagem = "Já existe um cliente com este CPF."
                });
            }

            var emailExiste = await _context.Clientes
                .AnyAsync(c => c.Email == dto.Email);

            if (emailExiste)
            {
                return Conflict(new
                {
                    mensagem = "Já existe um cliente com este email."
                });
            }

            var cliente = new Cliente
            {
                Nome = dto.Nome.Trim(),
                Email = dto.Email.Trim().ToLowerInvariant(),
                CPF = dto.CPF.Trim(),
                Ativo = true,
                DataCadastro = DateTime.UtcNow
            };

            _context.Clientes.Add(cliente);

            await _context.SaveChangesAsync();

            return CreatedAtAction(
                nameof(GetCliente),
                new { id = cliente.Id },
                new
                {
                    cliente.Id,
                    cliente.Nome,
                    cliente.Email,
                    cliente.CPF,
                    cliente.Ativo,
                    cliente.DataCadastro
                }
            );
        }

        // PUT: api/Clientes/5
        [HttpPut("{id:int}")]
        [Authorize]
        public async Task<IActionResult> AtualizarCliente(
            int id,
            [FromBody] CriarClienteDTO dto)
        {
            var cliente = await _context.Clientes
                .FirstOrDefaultAsync(c => c.Id == id);

            if (cliente == null)
            {
                return NotFound(new
                {
                    mensagem = "Cliente não encontrado."
                });
            }

            var cpfExiste = await _context.Clientes
                .AnyAsync(c =>
                    c.CPF == dto.CPF &&
                    c.Id != id);

            if (cpfExiste)
            {
                return Conflict(new
                {
                    mensagem =
                        "O CPF já está sendo utilizado."
                });
            }

            var emailExiste = await _context.Clientes
                .AnyAsync(c =>
                    c.Email == dto.Email &&
                    c.Id != id);

            if (emailExiste)
            {
                return Conflict(new
                {
                    mensagem =
                        "O email já está sendo utilizado."
                });
            }

            cliente.Nome = dto.Nome.Trim();
            cliente.Email = dto.Email.Trim().ToLowerInvariant();
            cliente.CPF = dto.CPF.Trim();

            await _context.SaveChangesAsync();

            return Ok(new
            {
                cliente.Id,
                cliente.Nome,
                cliente.Email,
                cliente.CPF,
                cliente.Ativo,
                cliente.DataCadastro
            });
        }

        // DELETE: api/Clientes/5
        [HttpDelete("{id:int}")]
        [Authorize]
        public async Task<IActionResult> DeletarCliente(int id)
        {
            var cliente = await _context.Clientes
                .FirstOrDefaultAsync(c => c.Id == id);

            if (cliente == null)
            {
                return NotFound(new
                {
                    mensagem = "Cliente não encontrado."
                });
            }

            cliente.Ativo = false;

            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}