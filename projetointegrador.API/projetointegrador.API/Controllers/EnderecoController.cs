using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using projetointegrador.API.Data;
using projetointegrador.API.DTO;
using projetointegrador.API.Models;

namespace projetointegrador.API.Controllers
{
    [ApiController]
    [Route("api/controller")]
    public class EnderecoController : ControllerBase
    {

        private readonly AppDbContext _enderecoDbContext;

        
        public EnderecoController(AppDbContext context)
        {
            _enderecoDbContext = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllEnderecos()
        {

            List<Endereco> listarEnderecos = await _enderecoDbContext.Enderecos.ToListAsync();

            return Ok(listarEnderecos);

        }

        [HttpPost]
        public async Task<IActionResult> CriarEndereco([FromBody] CriarEnderecoDTO dadosEndereco)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Usuario? usuarioEncontrado = await _enderecoDbContext.Usuarios.FirstOrDefaultAsync(usuario => usuario.Id == dadosEndereco.UsuarioId);

            if (usuarioEncontrado == null)
            {
                return NotFound($"Cliente com ID {dadosEndereco.UsuarioId} não encontrado.");
            }


            //dados que vem do nosso corpo da requisição, e a partir disso, criar um novo objeto do tipo Endereco para ser inserido no banco de dados
            Endereco novoEndereco = new Endereco
            {
                Logradouro = dadosEndereco.Logradouro,
                Numero = dadosEndereco.Numero,
                Complemento = dadosEndereco.Complemento,
                Bairro = dadosEndereco.Bairro,
                Cidade = dadosEndereco.Cidade,
                Estado = dadosEndereco.Estado,
                CEP = dadosEndereco.CEP,
                UsuarioId = dadosEndereco.UsuarioId
            };

            _enderecoDbContext.Enderecos.Add(novoEndereco);
            int resultadoInserirEnderecos = await _enderecoDbContext.SaveChangesAsync();

            if (resultadoInserirEnderecos > 0)
            {
                return Created();
            }
            else
            {
                return BadRequest("Endereço não registrado corretamente");
            }
        }
    }

}
