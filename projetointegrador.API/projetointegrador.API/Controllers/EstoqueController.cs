using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using projetointegrador.API.Data;
using projetointegrador.API.Models;
using System.Security.Claims;

namespace projetointegrador.API.Controllers
{
    [ApiController]
    public class EstoqueController : Controller
    {

        private readonly AppDbContext _estoqueDbContext;


        public EstoqueController(AppDbContext context)
        {
            _estoqueDbContext = context;
        }

        [HttpGet]
        [Route("api/estoque")]
        //implementando o get, com essa lógica podemos descobrir como e onde está o estoque de um medicamento específico, ou seja, em quais hospitais ele está disponível e qual a quantidade disponível em cada um deles.
        [HttpGet("hospital/{hospitalId}")]
        public async Task<IActionResult> GetEstoquePorHospital(int hospitalId)
        {
            //lógica pra buscar o estoque

            //primeiro buscamos a tabela itemestoque do banco, depois vamos usar o include para trazer os dados de determinado medicamento (join do nosso database), ao final o filtro é realizado apenas para o hospital que foi solicitado.
            var estoque = await _estoqueDbContext.ItensEstoque
                .Include(ie => ie.Medicamento) //.include é o join, inclui os dados do medicamento no hospital que está sendo buscado
                .Where(ie => ie.HospitalId == hospitalId) //qual hospital
                .ToListAsync();

            if (estoque == null || estoque.Count == 0)
            {
                return NotFound($"Nenhum estoque encontrado para o hospital.");
            }

            return Ok(estoque);

        }
        
        [HttpPost("atualizarEstoque")]
        [Authorize(Roles = "Administrador, Funcionario")] //apenas usuários com a role de admin e funcionários podem acessar essa rota para atualizar o estoque
        public async Task<IActionResult> AtualizarEstoque([FromBody] ItemEstoque dadosEstoque)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            //verificando se já existe esse medicamento no nosso hospital, caso exista, o sistema irá atualizar a quantidade,
            ////caso contrário, ele irá criar um novo registro de estoque para aquele medicamento e hospital.
            /////importante destacar que busca da tabela de estoque e não da de medicamentos
            var medicamentoExistente = await _estoqueDbContext.ItensEstoque //expressão lambfa
                .FirstOrDefaultAsync(x => x.MedicamentoId == dadosEstoque.MedicamentoId && x.HospitalId == dadosEstoque.HospitalId);

            var hospitalIDToken = User.FindFirst("hospitalId")?.Value; //pegando o hospitalId do token do usuário logado
            var nivelAcessoUsuario = User.FindFirst(ClaimTypes.Role)?.Value; //pegando o nível de acesso do usuário logado
            if (nivelAcessoUsuario != "Administrador" && hospitalIDToken != dadosEstoque.HospitalId.ToString())
            {
                return Forbid("Você não tem permissão para atualizar o estoque."); //verificando se o usuário é administrador ou se o hospitalId do token corresponde ao hospitalId do estoque que está sendo atualizado, caso contrário, ele não tem permissão para atualizar o estoque daquele hospital
            }

            if (_estoqueDbContext.ItensEstoque.Update(medicamentoExistente) != null)
            {
                //atualizando o nosso estoque
                //somando a quantidade que já existe com a nova quantidade que está sendo adicionada
                medicamentoExistente.Quantidade += dadosEstoque.Quantidade; //quantidade do medicamento que está sendo implementada
                medicamentoExistente.DataAtualizacao = DateTime.Now; //atualizando a data de atualização do medicamento
                medicamentoExistente.ValidadeLote = dadosEstoque.ValidadeLote; //atualizando a validade do lote do medicamento
                medicamentoExistente.CodigoLote = dadosEstoque.CodigoLote; //atualizando o código do lote do medicamento

                _estoqueDbContext.ItensEstoque.Update(medicamentoExistente); //atualizando o medicamento no banco de dados


            } else
            {
                //caso o medicamento seja novo vamos inserir um novo registro de estoque
                dadosEstoque.DataAtualizacao = DateTime.Now; //definindo a data de atualização do medicamento como a data atual
                _estoqueDbContext.Add(dadosEstoque); //adicionando o novo estoque ao banco de dados

            }
            var atualizadoComSucesso = await _estoqueDbContext.SaveChangesAsync() > 0; //salvando as alterações no banco de dados

            if (atualizadoComSucesso)
            {
                return Ok("Estoque atualizado com sucesso.");
            }
            else
            {
                return StatusCode(500, "Ocorreu um erro ao atualizar o estoque.");
            }

        }

    }
};
