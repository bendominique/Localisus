using Localisus.Data;
using Localisus.DTO;
using Localisus.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Localisus.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IConfiguration _configuration;

        public AuthController(
            AppDbContext context,
            IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDTO login)
        {
            if (login == null ||
                string.IsNullOrWhiteSpace(login.CPF) ||
                string.IsNullOrWhiteSpace(login.Senha))
            {
                return BadRequest(new
                {
                    mensagem = "CPF e senha são obrigatórios."
                });
            }

            var cpf = login.CPF.Trim();

            var usuario = await _context.Usuarios
                .Include(u => u.Hospital)
                .FirstOrDefaultAsync(u => u.CPF == cpf);

            if (usuario == null)
            {
                return Unauthorized(new
                {
                    mensagem = "CPF ou senha inválidos."
                });
            }

            if (!usuario.Ativo)
            {
                return Unauthorized(new
                {
                    mensagem = "Este usuário está inativo."
                });
            }

            if (string.IsNullOrWhiteSpace(usuario.SenhaHash))
            {
                return Unauthorized(new
                {
                    mensagem = "Este usuário não possui uma senha cadastrada."
                });
            }

            bool senhaValida;

            try
            {
                senhaValida = BCrypt.Net.BCrypt.Verify(
                    login.Senha,
                    usuario.SenhaHash
                );
            }
            catch
            {
                senhaValida = false;
            }

            if (!senhaValida)
            {
                return Unauthorized(new
                {
                    mensagem = "CPF ou senha inválidos."
                });
            }

            var token = GenerateToken(usuario);

            return Ok(new LoginResponseDTO
            {
                Token = token,
                UsuarioId = usuario.Id,
                Nome = usuario.Nome,
                Email = usuario.Email,
                CPF = usuario.CPF,
                TipoUsuario = usuario.TipoUsuario,
                HospitalId = usuario.HospitalId
            });
        }

        private string GenerateToken(Usuario usuario)
        {
            var key = _configuration["Jwt:Key"];

            if (string.IsNullOrWhiteSpace(key))
            {
                throw new InvalidOperationException(
                    "A chave JWT não está configurada."
                );
            }

            var issuer = _configuration["Jwt:Issuer"];
            var audience = _configuration["Jwt:Audience"];

            var claims = new List<Claim>
            {
                new Claim(
                    ClaimTypes.NameIdentifier,
                    usuario.Id.ToString()
                ),

                new Claim(
                    ClaimTypes.Name,
                    usuario.Nome
                ),

                new Claim(
                    ClaimTypes.Email,
                    usuario.Email
                ),

                new Claim(
                    "CPF",
                    usuario.CPF
                ),

                new Claim(
                    ClaimTypes.Role,
                    usuario.TipoUsuario.ToString()
                ),

                new Claim(
                    "TipoUsuario",
                    ((int)usuario.TipoUsuario).ToString()
                )
            };

            if (usuario.HospitalId.HasValue)
            {
                claims.Add(
                    new Claim(
                        "HospitalId",
                        usuario.HospitalId.Value.ToString()
                    )
                );
            }

            var securityKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(key)
            );

            var credentials = new SigningCredentials(
                securityKey,
                SecurityAlgorithms.HmacSha256
            );

            var expirationMinutes =
                _configuration.GetValue<int>(
                    "Jwt:ExpirationMinutes",
                    120
                );

            var token = new JwtSecurityToken(
                issuer: issuer,
                audience: audience,
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(
                    expirationMinutes
                ),
                signingCredentials: credentials
            );

            return new JwtSecurityTokenHandler()
                .WriteToken(token);
        }
    }
}