using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using projetointegrador.API.Data;
using projetointegrador.API.DTO;
using projetointegrador.API.Models;
using System.Threading.Tasks;

namespace projetointegrador.API.Controllers
{
    [ApiController]
    [Route("api/medicamentos")]
    public class MedicamentosController : ControllerBase
    {
        //ativando a injeção de dependência
        //a injeção de dependência é um padrão de design que permite que as dependências de um objeto sejam fornecidas por um contêiner de injeção de dependência, em vez de serem criadas diretamente pelo objeto.
        //Isso torna o código mais modular, testável e fácil de manter. Ele é usado como readonly para garantir que a lista de medicamentos não seja modificada diretamente, mas apenas através dos métodos da classe.
        
        private readonly AppDbContext _medicamentoDbContext;


        //A dependência de injeção foi inicializada em Program.cs, onde nós passamos AppDbContext, com o uso do SqlServer
        public MedicamentosController(AppDbContext context)
        {
            //agora a classe _medicamentos recebe todos os dados do nosso banco de dados,através da nossa classe AppDbContext, que é a classe que representa o nosso banco de dados.
            _medicamentoDbContext = context;
        }

        [HttpGet]
        //task é especificamente para métodos assíncronos, ou seja, métodos que podem levar algum tempo para serem concluídos, como operações de I/O, chamadas de rede ou acesso a banco de dados. Ele permite que o método seja executado de forma assíncrona, sem bloquear a thread principal do aplicativo.
        public async Task<IActionResult> GetAllMedicines()
        {
            List<Medicamento> listaMedicamentos = await _medicamentoDbContext.Medicamentos.ToListAsync();
            return Ok(listaMedicamentos);
        }

        [HttpGet("{id}")]
        public ActionResult<IEnumerable<Medicamento>> GetMedicineById(int id)
        {
            var medicamento = _medicamentoDbContext.Medicamentos.FirstOrDefault(m => m.IdMedicamento == id);
            if (medicamento == null)
            {
                return NotFound();
            }
            return Ok(medicamento);
        }
         [HttpPost("CriarMedicamento")]
         public async Task<ActionResult<Medicamento>> CreateMedicine(Medicamento medicamento)
         {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            _medicamentoDbContext.Add(medicamento);
            int resultadoGravacao = await _medicamentoDbContext.SaveChangesAsync();

            if (resultadoGravacao > 0)
                return Created("Medicamento registrado com sucesso", medicamento);

            return BadRequest("Erro ao registrar medicamento");
        }
    }
}
