import { ComponenteCard } from "../components/Cards";
import { useState } from "react";
import { BarraPesquisa } from "../components/BarraPesquisa";
import { medicamentosMock } from "../mocks/medicamentosMock";
import { estoqueMock } from "../mocks/estoqueMock";
import "./UsuarioComum.css"
import { Clock, Pill, CalendarCheck, Hospital, AlarmClock, Newspaper, Map, BellRing, BookOpenCheck } from "lucide-react";
import { hospitaisMock } from "../mocks/hospitaisMocks";
import { Sidebar } from "../components/Sidebar";
import { TopbarUsuarios } from "../components/TopbarUsuarios";
import { useAuth } from "../contexts/AuthContext";
import medicamentos from "../imagens/medicamentos.png"
import { DadosHospitalMapa, MapaLocalisus } from "../components/MapaLocalisus";

export const UsuarioComum = () => {

    const { usuario } = useAuth()

    const cardsCentro = [
        { titulo: "Históricos", descricao: "Acompanhe todas as retiradas realizadas e visualize a frequência com que seus medicamentos estão sendo utilizados.", icone: CalendarCheck, cor: "#6f00ffff" },
        { titulo: "Lembretes", descricao: "Receba alertas importantes para não esquecer horários, dosagens e medicamentos que precisam ser tomados hoje.", icone: AlarmClock, cor: "#19b900ff" },
        { titulo: "Medicamentos", descricao: "Gerencie seus medicamentos em um só lugar, acompanhe tratamentos ativos e receba lembretes personalizados.", icone: Pill, cor: "#0396ffff" },
        { titulo: "Postos/Farmácias", descricao: "Encontre unidades de saúde, farmácias e postos de atendimento próximos da sua localização de forma rápida e prática.", icone: Hospital, cor: "#ff8c00ff" }
    ]

    const cardsDireita = [
        { titulo: "Seu dia", descricao: "Amoxicilina", icone: BookOpenCheck, cor: "#e600ffff" }
    ]

    const cardsInfoDia = [
        { titulo: "16:00", descricao: "Amoxicilina 250ml", icone: Clock, cor: "#fff" },
        { titulo: "UBS Central", descricao: "1,2km de distância", icone: Map, cor: "#821ff1" },
        { titulo: "Consulta agendada", descricao: "Amanhã às 10:00  ", icone: BellRing, cor: "rgba(225, 255, 0, 0.67)" }
    ]

    const [hospitaisNoMapa, setHospitaisNoMapa] = useState<DadosHospitalMapa[]>([])
    const executarBusca = (termoPesquisado: string) => {
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

        const hospitaisFormatados = estoqueComRemedio.reduce<DadosHospitalMapa[]>((dadosMedicamento, itemEstoque) => {

            const hosp = hospitaisMock.find(h => h.id === itemEstoque.hospitalId)
            const med = medicamentosEncontrados.find(m => m.id === itemEstoque.medicamentoId)

            if (hosp) {
                dadosMedicamento.push({
                    hospital: hosp,
                    nomeMedicamento: med?.nome,
                    quantidadeRestante: itemEstoque.quantidade
                })
            }
            return dadosMedicamento;
        }, [])

        setHospitaisNoMapa(hospitaisFormatados)
    }

    return (
        <>
            <header>
                <TopbarUsuarios />
            </header>
            <main>
                <Sidebar />
                <div className="conteudo-pagina">
                    <div className="pos-cabecalho">
                        <h1 id="saudacao-user">Olá, {usuario?.nome}!</h1>
                        <h4 id="sugestao-user">Como podemos ajudar hoje? </h4>
                    </div>
                    <section className="pesquisa-elementos">
                        <div className="info-container">
                            {
                                cardsInfoDia.map((ci, index) =>
                                    <article key={index} className="info-dia">
                                        <ComponenteCard titulo={ci.titulo} descricao={ci.descricao} icone={ci.icone} cor={ci.cor} />
                                    </article>
                                )
                            }

                            <img id="medicamento-imagem" src={medicamentos} />
                        </div>
                        <BarraPesquisa onSearch={executarBusca} />

                        <div style={{ marginTop: '30px', marginBottom: '30px' }}>
                            <MapaLocalisus hospitaisEncontrados={hospitaisNoMapa} />
                        </div>

                        <p id="mais-buscados">Buscas Recentes: Mais buscados:</p>
                        <h2 id="acoes-rapidas">Ações rápidas</h2>
                        <div className="componentes-abaixo-pesquisa">
                            {
                                cardsCentro.map((cc, index) =>
                                    <article key={index} className="cards-usuario-comum-centro" style={{ "--cor-tema": cc.cor } as React.CSSProperties}>
                                        <ComponenteCard titulo={cc.titulo} descricao={cc.descricao} icone={cc.icone} cor={cc.cor} />
                                    </article>
                                )
                            }
                        </div>
                    </section>
                    <section className="componentes-cotidiano">
                        {
                            cardsDireita.map((cd, index) =>
                                <article key={index} className="cards-usuario-comum-cotidiano" style={{ "--cor-tema": cd.cor } as React.CSSProperties}>
                                    <ComponenteCard
                                        titulo={cd.titulo}
                                        descricao={cd.descricao}
                                        icone={cd.icone} cor={cd.cor} />
                                </article>
                            )
                        }
                    </section>
                </div>
            </main>
        </>
    )
}