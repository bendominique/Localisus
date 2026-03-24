using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using projetointegrador.API.Data;
using projetointegrador.API.DTO;
using projetointegrador.API.Models;
using BCrypt.Net;

namespace projetointegrador.API.Controllers
{
    [ApiController]
    [Route("api/usuarios")]
    public class UsuariosController : ControllerBase
    {
        private readonly AppDbContext _usuarioDbContext;

        public UsuariosController(AppDbContext context)
        {
            _usuarioDbContext = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllUsuarios()
        {
            List<Usuario> listaUsuarios = await _usuarioDbContext.Usuarios.Include(usuario => usuario.Enderecos).ToListAsync();
            return Ok(listaUsuarios);
            //include está inserindo o endereço dos nossos Usuarios.
        }

        [HttpGet("{id}")]
        public ActionResult<IEnumerable<Usuario>> GetUsuarioById(int id)
        {
            var usuario = _usuarioDbContext.Usuarios.FirstOrDefault(m => m.Id == id);
            if (usuario == null)
            {
                return NotFound(

                    new { Erro = true, Mensagem = $"O usuario com o id {id} não foi encontrado" });
            }
            return Ok(usuario);
        }

        [HttpPost("CriarUsuario")]
        public async Task<IActionResult> CriarUsuario([FromBody] CriarUsuarioDTO dadosUsuario)
        {
            //caso os dados não sejam encomtrados, nos retorna um modelo pronto do que não foi encontrado com a bad request
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }


            //Regra de negócio para validar o tipo de usuário, caso ele seja um usuário do tipo funcionario e ele não tenha um HospitalId válido, ou seja, nulo, ele retorna uma bad request com a mensagem de erro
            if (dadosUsuario.TipoUsuario == Enum.TipoUsuario.Funcionario)
            {
                if (dadosUsuario.HospitalId == null)
                {
                    return BadRequest(new { Erro = true, Mensagem = $"O usuario do tipo Funcionario deve ter um HospitalId válido" });
                }
            }

            //agora vamos buscar no banco de dados se existe um hospital com o id que foi passado no HospitalId, caso não exista, ele retorna uma bad request com a mensagem de erro
            if (dadosUsuario.HospitalId != null)
            {
                //var hospital = await _usuarioDbContext.Hospitais.FindAsync(dadosUsuario.HospitalId); // esse código faz a busca de todos os dados de um hospital.
                var hospitalexiste = await _usuarioDbContext.Hospitais.AnyAsync(h => h.Id == dadosUsuario.HospitalId); //aqui faz a busca apenas para o ID do hospita, gastando menos memória
                if (!hospitalexiste) //verificando se o hospital não existe, caso ele não exista, ele retorna uma bad request com a mensagem de erro
                {
                    return BadRequest(new { Erro = true, Mensagem = $"O Hospital com o id {dadosUsuario.HospitalId} não foi encontrado" });
                }
            }

            //criando a senha criptografada
            string senhaHash = BCrypt.Net.BCrypt.HashPassword(dadosUsuario.Senha); //aqui estamos utilizando o método HashPassword da biblioteca BCrypt para gerar a senha criptografada, passando a senha que foi recebida no corpo da requisição pelo DTO, e essa senha criptografada vai ser armazenada no banco de dados no campo SenhaHash do nosso modelo Usuario.

            //criando um novo objeto do tipo usuario, para depois ser adicionado ao banco de dados com os dados que foram passados no corpo da requisição pelo DTO
            Usuario usuario = new Usuario
            {
                Nome = dadosUsuario.Nome,
                Email = dadosUsuario.Email,
                CPF = dadosUsuario.CPF,
                TipoUsuario = dadosUsuario.TipoUsuario,
                HospitalId = dadosUsuario.HospitalId,
                 SenhaHash = senhaHash //se a senha for redirecionada da forma na qual ela vem da DTO, acaba sendo transportada para o nosso banco de maneira limpa, sem a criptografia, para evitar isso vamos gerar a senha criptografada com o hash da BCrypt;

            };

            //criando o nosso usuário no banco de dados, adicionando ele ao contexto e depois salvando as mudanças
            _usuarioDbContext.Usuarios.Add(usuario);

            var criarUsuario = await _usuarioDbContext.SaveChangesAsync();

            if (criarUsuario > 0)
            {
                return Ok(usuario);

            }
            else
            {
                return BadRequest(new { Erro = true, Mensagem = $"Ocorreu um erro ao criar o usuario" });
            }


        }
    }
}
