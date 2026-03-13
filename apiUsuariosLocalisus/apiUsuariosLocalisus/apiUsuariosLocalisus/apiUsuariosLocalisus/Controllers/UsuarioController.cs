using apiUsuariosLocalisus.Data;
using apiUsuariosLocalisus.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace apiUsuariosLocalisus.Controllers
{

    [ApiController] //Ao passarmos a tag ApiController, estamos definindo que a classe será uma controladora da nossa API
    //Ou seja, através dela conseguimos acessar a nossa API pelo seu domínio Localhost que contém as informações e métodos HTTP
    [Route("api/[controller]")] //A tag Route é utilizada para definir a rota de acesso aos métodos HTTP da nossa API.
                                //O caminho que devemos seguir para acessar os métodos HTTP da nossa API, nesse caso, o caminho será api/Usuario, onde Usuario é o nome do nosso controller,
                                //e o [controller] é uma forma de referenciar o nome do controller de forma dinâmica, caso o nome do controller seja alterado, a rota de acesso aos métodos HTTP da nossa API também será alterada automaticamente.
    public class UsuarioController : ControllerBase
    {
        private readonly AppDbContext _appDbContext; //A private readonly AppDbContext _appDbContext é uma variável de instância que representa o contexto do banco de dados da aplicação.
                                                     //Ela é utilizada para realizar a interação com o banco de dados.
                                                     //Está sendo passada como private readonly para garantir que ela seja inicializada apenas uma vez, no construtor da classe, e não possa ser modificada posteriormente.
        public UsuarioController(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext; //No construtor da classe, estamos recebendo uma instância do AppDbContext através da injeção de dependência, e atribuindo essa instância à variável _appDbContext para que possamos utilizá-la nos métodos HTTP da nossa API.

        }

        [HttpGet("GetAllUsers")]

        public async Task<ActionResult<List<Usuario>>> GetAllUsers()
        {
            var users = await _appDbContext.Usuarios.ToListAsync(); //O método ToListAsync é utilizado para converter a consulta LINQ (Language Intergrated Query) em uma lista de objetos do tipo Usuario de forma assíncrona,
                                                                    //ele permite que a consulta seja executada de forma não bloqueante, permitindo que outras operações sejam realizadas enquanto a consulta está sendo processada.
            return Ok(users);
        }

        [HttpPost("CreateUser")]
        public async Task<ActionResult<Usuario>> CreateUserAsync([FromBody] CreateUserDTO dadosUsuario)
        {
            if (!ModelState.IsValid) //O ModelState.IsValid é utilizado para verificar se os dados recebidos no corpo da requisição estão de acordo com as regras de validação definidas no modelo CreateUserDTO.
            {
                return BadRequest(ModelState); //Se os dados não estiverem válidos, o método retorna um BadRequest com o ModelState, que contém informações sobre os erros de validação.
            }
            Usuario usuarioSalvar = new Usuario
            {
                Nome = dadosUsuario.Nome,
                Email = dadosUsuario.Email,
                CPF = dadosUsuario.CPF,
                Senha = dadosUsuario.Senha
            };
            _appDbContext.Usuarios.Add(usuarioSalvar); //O método Add é utilizado para adicionar um novo objeto do tipo Usuario à coleção de usuários do banco de dados, ou seja, ele prepara o objeto para ser inserido no banco de dados.
            int result = await _appDbContext.SaveChangesAsync(); //O método SaveChangesAsync é utilizado para salvar as alterações feitas no contexto do banco de dados de forma assíncrona, ou seja, ele executa a operação de inserção no banco de dados e garante que as alterações sejam persistidas.

            if (result > 0)
            {
                return Ok("Usuário salvo com sucesso!");
            }
            return BadRequest("Erro ao salvar o usuário.");


        }
        }
}