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
        public async Task<IActionResult> GetMedicineById(int id)
        {
            Medicamento? medicamento = await _medicamentoDbContext.Medicamentos.FindAsync(id);
            if (medicamento == null)
            {
                return NotFound();
            }
            return Ok(medicamento);
        }

        [HttpPost("AdicionarMedicamento")] //lógica deve ser igual a da nossa controller de estoque!!
        public async Task<IActionResult> AddMedicine(CriarMedicamentoDTO medicamentodto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var medicamento = new Medicamento
            {
                Nome = medicamentodto.Nome,
                Dosagem = medicamentodto.Dosagem,
                Quantidade = medicamentodto.Quantidade,
            };
        
            _medicamentoDbContext.Medicamentos.Add(medicamento);

            var resultadoCriarMedicamento = await _medicamentoDbContext.SaveChangesAsync();

            if (resultadoCriarMedicamento > 0)
            {
                return Ok(medicamento);
            }
            else
            {
                return BadRequest("Não foi possível criar o medicamento.");
            }   
        }

    }
}


/*
 * [HttpPost("AdicionarMedicamento")] //lógica deve ser igual a da nossa controller de estoque!!
        public async Task<IActionResult> AddMedicine(CriarMedicamentoDTO medicamentodto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var medicamento = new Medicamento
            {
                Nome = medicamentodto.Nome,
                Dosagem = medicamentodto.Dosagem,
                Quantidade = medicamentodto.Quantidade,
            };
        
            _medicamentoDbContext.Medicamentos.Add(medicamento);

            var resultadoCriarMedicamento = await _medicamentoDbContext.SaveChangesAsync();

            if (resultadoCriarMedicamento > 0)
            {
                return Ok(medicamento);
            }
            else
            {
                return BadRequest("Não foi possível criar o medicamento.");
            }   
        }


Como eu estou pensando em recriar esse medicamento para que possa ser implementado no estoque de um hospital.
 
[HttpPost("AdicionarMedicamento{hospitalId}")] -> passo os parâmetros de id do hospital e aí depois disso segue a mesma lógica, devo prosseguir dessa maneira?

*/