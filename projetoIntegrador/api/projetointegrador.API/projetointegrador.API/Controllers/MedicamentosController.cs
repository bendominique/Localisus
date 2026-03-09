using Microsoft.AspNetCore.Mvc;
using projetointegrador.API.Models;

namespace projetointegrador.API.Controllers
{
    [ApiController]
    [Route("api/medicamentos")]

    public class MedicamentosController : ControllerBase
    {
        public static List<Medicamento> _medicamentos = new List<Medicamento>
        {
            new Medicamento { IdMedicamento = 1, NomeMedicamento = "Paracetamol", Dosagem = 500, Quantidade = 20 },
            new Medicamento { IdMedicamento = 2, NomeMedicamento = "Ibuprofeno", Dosagem = 200, Quantidade = 15 },
            new Medicamento { IdMedicamento = 3, NomeMedicamento = "Amoxicilina", Dosagem = 250, Quantidade = 10 }
        };

        [HttpGet]
        public ActionResult<IEnumerable<Medicamento>> GetMedicines()
        {
            return Ok(_medicamentos);
        }

        [HttpGet("{id}")]
        public ActionResult<IEnumerable<Medicamento>> GetMedicineById(int id)
        {
            var medicamento = _medicamentos.FirstOrDefault(m => m.IdMedicamento == id);
            if (medicamento == null)
            {
                return NotFound();
            }
            return Ok(medicamento);
        }
         [HttpPost]
         public ActionResult<Medicamento> CreateMedicine(Medicamento medicamento)
         {
             _medicamentos.Add(medicamento);
             return CreatedAtAction(nameof(GetMedicineById), new { id = medicamento.IdMedicamento }, medicamento);
        }
    }
}
