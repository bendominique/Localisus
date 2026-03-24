using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using projetointegrador.API.Data;
using projetointegrador.API.DTO;
using projetointegrador.API.Models;

namespace projetointegrador.API.Controllers
{
    [ApiController]
    [Route("api/hospital")]
    public class HospitalController : ControllerBase
    {
        private readonly AppDbContext _hospitalDbContext;

        public HospitalController(AppDbContext context)
        {
            _hospitalDbContext = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetHospitals()
        {
            List<Hospital> ListaHospitais = await _hospitalDbContext.Hospitais.ToListAsync();
            return Ok(ListaHospitais);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetHospitalById(int id)
        {
            Hospital? hospital = await _hospitalDbContext.Hospitais.FindAsync(id);
            if (hospital == null)
            {
                return NotFound();
            }
            return Ok(hospital);
        }

        [HttpPost("CriarHospital")]
        [Authorize(Roles ="Administrador")]
        public async Task<IActionResult> CreateHospital(CriarHospitalDTO hospitaldto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var hospital = new Hospital
            {
                Nome = hospitaldto.Nome,
                Endereco = hospitaldto.Endereco,
                Telefone = hospitaldto.Telefone
            };

            _hospitalDbContext.Hospitais.Add(hospital);

            var resultadoCriarHospital = await _hospitalDbContext.SaveChangesAsync();

            if (resultadoCriarHospital > 0)
            {
                return Ok(hospital);
            }
            else
            {
                return StatusCode(500, "Ocorreu um erro ao criar o hospital.");

            }
        }
    }
}