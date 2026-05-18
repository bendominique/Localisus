import { NavLink } from "react-router-dom"
import "./Home.css"
import { PartticulasFundo } from "./ParticulasFundo"
import { Cards } from "../components/Cards"
import { BarraPesquisa } from "../components/BarraPesquisa"
import { HeroImagem } from "../components/HeroImagem"
import { Navbar } from "../components/Navbar"

export const Home = () => {
    return (
        <>
            <header>
                <Navbar />
            </header>
            <main>
                <div className="conteudo-home">
                    <section className="info-pagina">
                        <HeroImagem/>
                        <h2>Tudo o que você precisa, <span>em um só lugar</span></h2>
                        <Cards></Cards>
                    </section>
                </div>
            </main>
        </>
    )
}