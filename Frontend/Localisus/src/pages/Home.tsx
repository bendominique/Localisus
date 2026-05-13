import { NavLink } from "react-router-dom"
import "./Home.css"
import { PartticulasFundo } from "./ParticulasFundo"
import { Cards } from "../components/Cards"

export const Home = () => {
    return (
        <>
            <header className="elementos-cabecalho">
                <span>
                    <h1 className="letreiro">
                        LOCALISUS
                    </h1>
                    <ul className="navbar">
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
                        <h3>Conectando tecnologia ao cuidado, para que o acesso a saúde nunca seja uma distância</h3>
                        <Cards></Cards>
                    </section>
                </div>
            </main>
        </>
    )
}