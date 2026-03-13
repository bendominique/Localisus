using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using LocaliSUS.API.Data;
using LocaliSUS.API.Models;

namespace LocaliSUS.API.Controllers
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
        public async Task<IActionResult> CreateHospital(Hospital hospital)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            
            _hospitalDbContext.Hospitais.Add(hospital);
            int resultadoGravacao = await _hospitalDbContext.SaveChangesAsync();

            if (resultadoGravacao > 0)
                return Created("Hospital registrado com sucesso", hospital);

            return BadRequest("Erro ao registrar o hospital");
        }
    }
}
