import { NavLink } from "react-router-dom"
import "./Home.css"

export const Home = () => {
    return (
        <>
            <header>
                <ul className="navbar">
                    <NavLink to="/">
                        <li>Home</li>
                    </NavLink>
                    <NavLink to="/contato">
                        <li>Contato</li>
                    </NavLink>
                    <NavLink to="/sobre">
                        <li>Sobre</li>
                    </NavLink>
                </ul>
            </header>
            <body>
                <div className="conteudo-home">
                    <section className="info-pagina">
                        <h1>Localisus</h1>
                        <h3>Conectando tecnologia ao cuidado, para que o acesso a saúde nunca seja uma distância</h3>
                        <NavLink to="/Login">
                            <button id="botao-conhecer">
                                Entrar
                            </button>
                        </NavLink>
                    </section>
                </div>
            </body>
        </>
    )
}