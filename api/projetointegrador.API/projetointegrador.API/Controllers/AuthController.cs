using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using projetointegrador.API.Data;
using projetointegrador.API.DTO;
using BCrypt.Net;
using projetointegrador.API.Models;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using System.Security.Claims;

namespace projetointegrador.API.Controllers
{
    [ApiController]
    [Route("api/auth")]
    public class AuthController : Controller
    {
        private readonly AppDbContext _authDbContext;
        private readonly IConfiguration _configuration;

        public AuthController(AppDbContext authDbContext, IConfiguration configuration)
        {
            _authDbContext = authDbContext;
            _configuration = configuration;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDTO loginDados)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }


            //buscanodo o usuário pelo CPF
            var usuario = await _authDbContext.Usuarios
                .FirstOrDefaultAsync(u => u.CPF == loginDados.CPF);

            //realizando a verificação de existência de um usuário
            if (usuario == null)
            {
                return Unauthorized(new { message = "CPF ou Senha inválidos!" });
            }

            //Bcrypt para comparar a senha fornecida com a senha armazenada no banco
            bool senhaValida = BCrypt.Net.BCrypt.Verify(loginDados.Senha, usuario.SenhaHash);

            if (!senhaValida)
            {
                return Unauthorized(new { message = "CPF ou Senha inválidos!" });
            }


            var gerarToken = GerarTokenJWT(usuario); //acessa também a private string GerarTokenJWT(Usuario usuario) que é responsável por gerar o token JWT e assim gera o token

            return Ok(new
            {
                message = "Login realizado com sucesso!",
                UsuarioNome = usuario.Nome,
                Tipo = usuario.TipoUsuario,
                HospitalId = usuario.HospitalId
            });

        }

        private string GerarTokenJWT(Usuario usuario)
        {
            //manipulador do nosso token
            var tokenHandler = new JwtSecurityTokenHandler();

            //realizando a leitura da palavra secreta do nosso appsettings.json
            var chaveSecreta =
                _configuration.GetSection("Jwt:ChaveSecreta").Value;
            var chaveValor = Encoding.ASCII.GetBytes(chaveSecreta);
            //no código acima o programa armazenava dentro da variável chaveSecreta a string criada em appsettings.json e a convertia para um array de bytes
            //que está sendo passando em var chaveValor, para ser utilizada na criação do token JWT

            //como o nome propõe o tokenDescriptor é o objeto que descreve as informações do token, como as claims, a data de expiração e as credenciais de assinatura
            //as claims são as informações que serão incluídas no token, como o id do usuário, o tipo de usuário e o id do hospital
            //signingCredentials são as credenciais de assinatura do token, que utilizam a chave secreta e o algoritmo de assinatura HmacSha256
            //HmacSha256 é um algoritmo de hash que é utilizado para garantir a integridade do token, ou seja, para garantir que o token não foi alterado após ser gerado
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim("id", usuario.Id.ToString()),
                    new Claim(ClaimTypes.Role, usuario.TipoUsuario.ToString()),
                    new Claim("hospitalId", usuario.HospitalId.HasValue ? usuario.HospitalId.Value.ToString() : string.Empty)
                }),
                Expires = DateTime.UtcNow.AddHours(8),

                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(chaveValor), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}

