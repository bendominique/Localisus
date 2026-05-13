using Microsoft.AspNetCore.Mvc;
using Localisus.Models;

namespace Localisus.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EstoqueController : ControllerBase
    {
        //lisitnha pra testar os dados mocados fellas
        List<Estoque> listarMedicamentos = new List<Estoque>();
        
        public EstoqueController()
        {
            listarMedicamentos.Add(new Estoque
            {
                Id = 1,
                HospitalID = 2,
                MedicamentoID = 3,
                Quantidade = 10,
                Lote = 42034,
                DataValidade = new DateTime(2026, 7, 12),
                DataAtualizacao = new DateTime(2026, 3, 12)

            });
        }
        [HttpGet]
        public ActionResult<IEnumerable<Estoque>> Get()
        {
            // Lógica para obter a lista de estoques
            return Ok(listarMedicamentos); // Retorna uma de estoque, pq não criaram a de medicamentos ainda.
        }

    }
}
