import { NavLink } from "react-router-dom"
import "./Home.css"
import { PartticulasFundo } from "./ParticulasFundo"
import { Cards } from "../components/Cards"
import { BarraPesquisa } from "../components/BarraPesquisa"

export const Home = () => {
    return (
        <>
            <header className="elementos-cabecalho">
                <span>
                    <ul className="navbar">
                        <li>
                            <h1 id="letreiro">
                                LOCALISUS
                            </h1>
                        </li>
                        <NavLink to="/">
                            <li id="home-navbar">Home</li>
                        </NavLink>
                        <NavLink to="/contato">
                            <li id="contato-navbar">Contato</li>
                        </NavLink>
                        <NavLink to="/sobre">
                            <li id="sobre-navbar">Sobre</li>
                        </NavLink>
                        <NavLink to="/Login">
                            <button id="botao-conhecer">
                                Entrar
                            </button>
                        </NavLink>
                    </ul>
                </span>
            </header>
            <main>
                <div className="conteudo-home">
                    <section className="info-pagina">
                        
                        <h1>Encontre seus medicamentos com mais facilidade</h1>
                        <h2>Tudo o que você precisa, <span>em um só lugar</span></h2>
                        <Cards></Cards>
                    </section>
                </div>
            </main>
        </>
    )
}