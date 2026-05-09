import { useState } from 'react'
import { estoqueMock } from '../mocks/estoqueMock'
import { medicamentosMock } from '../mocks/medicamentosMock'
import { hospitaisMock } from '../mocks/hospitaisMocks'
import { BarraPesquisa } from '../components/BarraPesquisa'
import { MapaLocalisus } from '../components/MapaLocalisus'

export const Home = () => {
    //representação da memória do state
    const [erro, setErro] = useState('')
    const [resultado, setResultado] = useState<any[]>([])

    const handlePesquisa = (termoPesquisado: string) => {
        setErro('')
        setResultado([]) //limpando buscas anteriores

        if (!termoPesquisado.trim()) {
            setErro('Por favor, digite o nome de um medicamento')
            return
        }

        setErro('')

        const buscarMedicamento = termoPesquisado.toLowerCase();
        const medicamentosEncontrados = medicamentosMock.filter(m => 
            m.nome.toLowerCase().includes(buscarMedicamento)
        )
        if (medicamentosEncontrados.length === 0) {
            setErro('Medicamento não encontrado')
            return null
        }

        const idMedicamentos = medicamentosEncontrados.map(m => m.id)

        const estoqueDisponivel = estoqueMock.filter(i =>
            idMedicamentos.includes(i.medicamentoId) && i.quantidade > 0
        )

        if(estoqueDisponivel.length === 0) {
            setErro('Nenhum hospital possui esse medicamento em estoque no momento')
            return
        }

        const hospitalComEstoque = estoqueDisponivel.map(item => {
            const hospital = hospitaisMock.find(h => h.id === item.hospitalId)
            const medicamento = medicamentosEncontrados.find(m => m.id === item.medicamentoId)

            return {
                hospital: hospital,
                nomeMedicamento: medicamento?.nome,
                quantidadeRestante: item.quantidade
            }
        })

        const resultadoFinal = hospitalComEstoque.filter(res => res.hospital != undefined)
        setResultado(resultadoFinal)
    }

    return(
        <>
            <h1>Localisus</h1>
            <p>Conectando tecnologia ao cuidado, para que o acesso a saúde nunca seja uma distância</p>
            <BarraPesquisa onSearch={handlePesquisa} />
            {erro && <p style={{ color: 'red' }}>{erro}</p>}
            <div>
                {resultado.length > 0 && (
                    <MapaLocalisus hospitaisEncontrados={resultado}/>
                )}
                {/* {resultado.length> 0 && <p>Hospitais Encontados:</p>}
                <ul>
                    {resultado.map((resultadoItem, index) =>
                    (
                        <li key={index}>
                            <strong>{resultadoItem.hospital?.nome}</strong> <br/>
                            Tem {resultadoItem.quantidadeResulta} unidades de {resultadoItem.nomeMedicamento}
                        </li>
                    ))}
                </ul> */}
            </div>

        </>
    )
}

