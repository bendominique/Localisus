using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using projetointegrador.API.Data;
using projetointegrador.API.Models;

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
        public async Task<IActionResult> AtualizarEstoque([FromBody] ItemEstoque dadosEstoque)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            //verificando se já existe esse medicamento no nosso hospital, caso exista, o sistema irá atualizar a quantidade,
            ////caso contrário, ele irá criar um novo registro de estoque para aquele medicamento e hospital.
            /////importante destacar que busca da tabela de estoque e não da de medicamentos
            var medicamentoExistente = await _estoqueDbContext.ItensEstoque //expressão lambfa
                .FirstOrDefaultAsync(x => x.MedicamentoId == dadosEstoque.MedicamentoId && x.HospitalId == dadosEstoque.HospitalId);

            if (_estoqueDbContext.ItensEstoque.Update(medicamentoExistente) != null)
            {
                //atualizando o nosso estoque
                //somando a quantidade que já existe com a nova quantidade que está sendo adicionada
                medicamentoExistente.Quantidade += dadosEstoque.Quantidade; //quantidade do medicamento que está sendo implementada
                medicamentoExistente.DataAtualizacao = DateTime.Now; //atualizando a data de atualização do medicamento
                medicamentoExistente.ValidadeLote = dadosEstoque.ValidadeLote; //atualizando a validade do lote do medicamento
                _estoqueDbContext.ItensEstoque.Update(medicamentoExistente); //atualizando o medicamento no banco de dados


            } else
            {
                //caso o medicamento seja novo vamos inserir um novo registro de estoque
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
/*
 * 
 * CONTROLLER EstoqueController

    // MÉTODO: Ver estoque de um hospital específico
    AÇÃO GetEstoquePorHospital(hospitalId)
        estoque = BUSCAR todos os ItensEstoque ONDE HospitalId == hospitalId
        INCLUIR Dados do Medicamento (Nome, Miligramagem)
        RETORNAR Lista(estoque)

    // MÉTODO: Entrada de Medicamentos (Soma ao que já existe ou cria novo)
    AÇÃO AdicionarOuAtualizarEstoque(dadosEntrada)
        // dadosEntrada contém: MedicamentoId, HospitalId, Quantidade
        
        itemExistente = BUSCAR ItemEstoque ONDE MedicamentoId == dadosEntrada.Id 
                        E HospitalId == dadosEntrada.HospitalId

        SE itemExistente EXISTE ENTÃO
            itemExistente.Quantidade = itemExistente.Quantidade + dadosEntrada.Quantidade
            itemExistente.DataUltimaAtualizacao = AGORA
            ATUALIZAR no banco
        SENÃO
            CRIAR NOVO ItemEstoque com os dados informados
            SALVAR no banco
        
        RETORNAR Sucesso(201 ou 200)

    // MÉTODO: Baixa de Estoque (Saída/Uso do remédio)
    AÇÃO DarBaixaEstoque(idItem, quantidadeSaida)
        item = BUSCAR ItemEstoque por ID
        
        SE item NÃO EXISTE ENTÃO RETORNAR Erro("Item não encontrado")

        SE item.Quantidade >= quantidadeSaida ENTÃO
            item.Quantidade = item.Quantidade - quantidadeSaida
            SALVAR no banco
            RETORNAR Sucesso
        SENÃO
            RETORNAR Erro("Quantidade insuficiente em estoque")

FIM CONTROLLER
 */