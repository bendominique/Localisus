using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using projetointegrador.API.Data;
using projetointegrador.API.DTO;
using projetointegrador.API.Models;

namespace projetointegrador.API.Controllers
{
    [ApiController]
    [Route("api/clientes")]
    public class ClientesController : ControllerBase
    {
        private readonly AppDbContext _clienteDbContext;

        public ClientesController(AppDbContext context)
        {
            _clienteDbContext = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllClientes()
        {
            List<Cliente> listaClientes = await _clienteDbContext.Clientes.Include(cliente => cliente.Enderecos).ToListAsync();
            return Ok(listaClientes);
            //include está inserindo o endereço dos nossos clientes.
        }

        [HttpGet("{id}")]
        public ActionResult<IEnumerable<Cliente>> GetClienteById(int id)
        {
            var cliente = _clienteDbContext.Clientes.FirstOrDefault(m => m.Id == id);
            if (cliente == null)
            {
                return NotFound(
                    
                    new {Erro = true, Mensagem = $"O cliente com o id {id} não foi encontrado"});
            }
            return Ok(cliente);
        }

        [HttpPost("CriarCliente")]
        public async Task<IActionResult> CriarCliente([FromBody] CriarClienteDTO dadosCliente)
        {
            //caso os dados não sejam encontnrados, nos retorna um modelo pronto do que não foi encontrado com a bad request
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            //Faremos uma busca no banco de dados para verificar se já existe um cliente com o mesmo CPF, caso exista, retornamos um bad request informando que o cliente já existe
            //Cliente? permite que seja um valor nulo
            Cliente? clienteEncontrado = await _clienteDbContext.Clientes.FirstOrDefaultAsync(cliente => cliente.CPF == dadosCliente.CPF);

            //se o cpf encontrado seja diferente de nulo, ou seja, se já existir um cliente com esse cpf, retornamos um bad request informando que já existe um cliente cadastrado com esse cpf
            if ( clienteEncontrado != null)
            {
                return BadRequest(new { Erro = true, Mensagem = "Já existe um cliente cadastrado com esse CPF" });
            }
            { 
            }

            //Criamos um objeto cliente utilizando os dados do DTO, e setamos a data de cadastro para o momento atual, e o status de ativo para true
            //após isso o cliente é incluso no banco de dados e retornamos o cliente criado com o status 201 created
            Cliente cliente = new Cliente
            {
                //Dados foram passados na CriarClienteDTO, e aqui estamos mapeando os dados do DTO para o modelo Cliente
                Nome = dadosCliente.Nome,
                Email = dadosCliente.Email,
                CPF = dadosCliente.CPF
            };

            _clienteDbContext.Clientes.Add(cliente);
            //resultado da gravação é caso o nosso cliente seja salvo com sucesso, o resultado da gravação será maior que 0, caso contrário, será 0 ou menor
            int resultadoGravacao = await _clienteDbContext.SaveChangesAsync();
            
            if (resultadoGravacao > 0)
                return Created("Usuario criado com sucesso", cliente);

            return BadRequest("Erro ao criar cliente");
        
        }
    }
}
