import { NavLink } from "react-router-dom"
import "./Home.css"
import { PartticulasFundo } from "./ParticulasFundo"

export const Home = () => {
    return (
        <>
        <PartticulasFundo/>
            <header>
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
                </ul>
            </header>
            <main>
                <div className="conteudo-home">
                    <section className="info-pagina">
                        <h1>LOCALISUS</h1>
                        <h3>Conectando tecnologia ao cuidado, para que o acesso a saúde nunca seja uma distância</h3>
                        <NavLink to="/Login">
                            <button id="botao-conhecer">
                                Entrar
                            </button>
                        </NavLink>
                    </section>
                </div>
            </main>
        </>
    )
}