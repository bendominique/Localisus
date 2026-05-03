using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
<<<<<<< HEAD
using Microsoft.IdentityModel.Tokens;
=======
>>>>>>> 41245695cf3e62cc59e6c904e3e5b8464e6e46cd
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

<<<<<<< HEAD
        //adicionando um método http para a busca de hospitais no frontend, permitindo que o usuário visualize o estoque do mesmo e caso seja um adm atualize
        [HttpGet("buscar/{nome}")]
        public async Task<ActionResult<IEnumerable<Hospital>>> BuscarHospital(string nome)
        {
            var resultados = await _hospitalDbContext.Hospitais
        .Where(h => h.Nome.Contains(nome))
        .ToListAsync();

            if (!resultados.Any()) return NotFound("Nenhum hospital encontrado.");

            return Ok(resultados);
        }

=======
>>>>>>> 41245695cf3e62cc59e6c904e3e5b8464e6e46cd
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
<<<<<<< HEAD


        //criação do método http para atualizar o hospital, permitindo que o usuário visualize o estoque dele no frontend
        [HttpPut("{id}")]
        [Authorize(Roles = "Administrador")]
        public async Task<IActionResult> AtualizarHospital(int id, Hospital HospitalDto)
        {
            if (id != HospitalDto.Id) return BadRequest();

            _hospitalDbContext.Entry(HospitalDto).State = EntityState.Modified;

            try {
                var HospitalExiste = await _hospitalDbContext.SaveChangesAsync();
            } catch (DbUpdateConcurrencyException)
            {
                if (!HospitalExists(id)) return NotFound();
                else throw;
                }
            return NoContent();
        }
            private bool HospitalExists(int id)
            {
                return _hospitalDbContext.Hospitais.Any(e => e.Id == id);
        }
    }
};
=======
    }
}
>>>>>>> 41245695cf3e62cc59e6c904e3e5b8464e6e46cd
