import "./UsuarioComum.css"
import Navbar from "../components/Navbar"
import { ComponenteCard } from "../components/Cards"

const cardsCentro = [
    { titulo: "Histórico de retiradas", descricao: "Veja com qual frequência você tem retirado seus medicamentos" },
    { titulo: "Lembretes", descricao: "Verifique se possui algum medicamento para tomar hoje" },
    { titulo: "Como funciona", descricao: "Entenda como utilizar o site, encontrar seu medicamento e muito mais" },
    { titulo: "Meus medicamentos", descricao: "Acompanhe seus e remédios e receba lembretes" }
]

const cardsDireita = [
    { titulo: "Locali", descricao: "Assistente virtual do localisus" },
    { titulo: "Últimas Notícias", descricao: "Alera: Surto de hantavírus" }
]


export const UsuarioComum = () => {

    return (
        <>
            <header>
                    <div className="cabecalho-nav">
                        <label className="container-login">
                            <h4>Nome Usuário</h4>
                            <p>Tipo de Usuário</p>
                        </label>
                    </div>
            </header>
            <main>
                <div className="conteudo-pagina">

                    <h1 id="saudacao-user">Olá, Nome</h1>
                    <h4 id="sugestao-user">Como podemos ajudar você hoje?</h4>
                    <div className="cartao-busca">
                        <h2> Encontre seu medicamento </h2>
                        <h4> Pesquise e veja onde encontrar gratuitamente por uma farmácia ou pelo SUS</h4>
                        <p>Mais buscados: </p>
                    </div>
                    <section className="componentes-pesquisa">
                        {
                            cardsCentro.map(cc =>
                                <article className="cards-usuario-comum-centro">
                                    <ComponenteCard titulo={cc.titulo} descricao={cc.descricao} />
                                </article>
                            )
                        }
                    </section>
                    <section className="componentes-lateral-direita">
                        {
                            cardsDireita.map(cd =>
                                <article className="elementos-card-usuario-comum-direita">
                                    <ComponenteCard titulo={cd.titulo} descricao={cd.descricao} />
                                </article>
                            )
                        }
                    </section>
                    <div className="mapa">

                    </div>
                </div>
            </main>
        </>
    )
}

