using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using projetointegrador.API.Data;
using projetointegrador.API.DTO;
using projetointegrador.API.Models;
using BCrypt.Net;
using projetointegrador.API.Services;

namespace projetointegrador.API.Controllers
{
    [ApiController]
    [Route("api/usuarios")]
    public class UsuariosController : ControllerBase
    {
        private readonly IUsuarioService _usuarioService;

        public UsuariosController(IUsuarioService usuarioService)
        {
            _usuarioService = usuarioService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllUsuarios()
        {
            var usuarios = await _usuarioService.GetAlUsuariosAsync();
            return Ok(usuarios);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUsuarioById(int id)
        {
            try
            {
                var usuario = await _usuarioService.GetUsuarioByIdAsync(id);
                return Ok(usuario);
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new { Erro = true, Mensagem = ex.Message });
            }
        }

        [HttpPost("CriarUsuario")]
        public async Task<IActionResult> CriarUsuario([FromBody] CriarUsuarioDTO dadosUsuario)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            try
            {
                var novoUsuario = await _usuarioService.CriarUsuarioAsync(dadosUsuario);
                return Ok(novoUsuario);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { Erro = true, Mensagem = ex.Message });
            }
            catch (Exception)
            {
                return StatusCode(500, new { Erro = true, Mensagem = "Ocorreu um erro interno" });
            }
        }
    }
}
