import { ComponenteCard } from "../components/Cards";
import { useState } from "react";
import { BarraPesquisa } from "../components/BarraPesquisa";
import { MapaLocalisus } from "../components/MapaLocalisus";
import { medicamentosMock } from "../mocks/medicamentosMock";
import { estoqueMock } from "../mocks/estoqueMock";
import "./UsuarioComum.css"
import { Clock, Bell, Info, Pill, Search, HeartPlus, CalendarCheck, Hospital, AlarmClock, Bot, Newspaper } from "lucide-react";
import { hospitaisMock } from "../mocks/hospitaisMocks";
import { Sidebar } from "../components/Sidebar";

export const UsuarioComum = () => {

    const cardsCentro = [
        { titulo: "Histórico de retiradas", descricao: "Acompanhe todas as retiradas realizadas e visualize a frequência com que seus medicamentos estão sendo utilizados.", icone: CalendarCheck, cor: "#ff1aff" },
        { titulo: "Lembretes", descricao: "Receba alertas importantes para não esquecer horários, dosagens e medicamentos que precisam ser tomados hoje.", icone: AlarmClock, cor: "#ff1aff" },
        { titulo: "Meus medicamentos", descricao: "Gerencie seus medicamentos em um só lugar, acompanhe tratamentos ativos e receba lembretes personalizados.", icone: Pill, cor: "#ff1aff" },
        { titulo: "Postos próximos", descricao: "Encontre unidades de saúde, farmácias e postos de atendimento próximos da sua localização de forma rápida e prática.", icone: Hospital, cor: "#afff1a" }
    ]

    const cardsDireita = [
        { titulo: "Cali", descricao: "Assistente virtual do localisus", icone: Bot, cor: "#ff1a1a"},
        { titulo: "Últimas Notícias", descricao: "Alera: Surto de hantavírus", icone: Newspaper, cor: "#ff9218" }
    ]

    //criou-se uma memória para a busca dentro do nosso mapa, agora a nossa tela de home sabe oq pesquisar e aonde pesquisar
    const [hospitaisNoMapa, setHospitaisNoMapa] = useState<any[]>([])
    const executarBusca = (termoPesquisado: string) => {
        //as implementações dessas constantes resolvem o erro que estava presente no momento de buscar com o componente de BarraPesquisa
        if (!termoPesquisado.trim()) {
            setHospitaisNoMapa([])
            return;
        }

        const termoLimpo = termoPesquisado.toLowerCase()

        const medicamentosEncontrados = medicamentosMock.filter(m =>
            m.nome.toLowerCase().includes(termoLimpo)
        )

        const idsMedicamentos = medicamentosEncontrados.map(m => m.id)

        const estoqueComRemedio = estoqueMock.filter(e =>
            idsMedicamentos.includes(e.medicamentoId) && e.quantidade > 0
        )

        const hospitaisFormatados = estoqueComRemedio.map(itemEstoque => {
            const hosp = estoqueComRemedio.find(h => h.id === itemEstoque.hospitalId)
            const med = medicamentosEncontrados.find(m => m.id === itemEstoque.id)

            return {
                hospital: hosp,
                nomeMedicamento: med?.nome,
                quantidadeRestante: itemEstoque.quantidade
            }
        }).filter(item => item.hospital !== undefined)
        setHospitaisNoMapa(hospitaisFormatados)
    }

    return (
        <>
            <header>

            </header>
            <main>
                <div className="conteudo-pagina">
                    <div className="pos-cabecalho">
                        <h1 id="saudacao-user">Olá, nome!</h1>
                        <h4 id="sugestao-user">Como podemos ajudar hoje? </h4>
                    </div>
                    <section className="pesquisa-elementos">
                        <div className="cartao-busca">
                            <h2> Encontre seu medicamento </h2>
                            <h4> Pesquise e veja onde encontrar gratuitamente por uma farmácia ou pelo SUS</h4>
                            <article className="area-pesquisa">
                                <BarraPesquisa onSearch={executarBusca} />
                            </article>
                            <p id="mais-buscados">Mais buscados:</p>
                        </div>
                        <article className="componentes-abaixo-pesquisa">
                            {
                                cardsCentro.map(cc =>
                                    <article className="cards-usuario-comum-centro" style={{"--cor-tema": cc.cor} as React.CSSProperties}>
                                        <ComponenteCard titulo={cc.titulo} descricao={cc.descricao} icone={cc.icone} cor={cc.cor}/>
                                    </article>
                                )
                            }
                        </article>
                    </section>
                    <section className="componentes-cotidiano">
                        {
                            cardsDireita.map(cd =>
                                <article className="elementos-card-usuario-comum-cotidiano" style={{"--cor-tema": cd.cor} as React.CSSProperties}>
                                    <ComponenteCard titulo={cd.titulo} descricao={cd.descricao} icone={cd.icone} cor={cd.cor}/>
                                </article>
                            )
                        }
                    </section>

                    <div className="area-do-mapa">
                        {hospitaisNoMapa.length > 0 && (
                            <MapaLocalisus hospitaisEncontrados={hospitaisNoMapa} />
                        )}
                    </div>
                </div>
            </main>
        </>
    )
}