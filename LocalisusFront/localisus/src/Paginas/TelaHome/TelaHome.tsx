import './telahome.css'
import Botao from '../../Components/Botao/Botao'
import Card from '../../Components/Card/Card'
import ConteudoPagina from '../../Components/Body/Body'
import ElementosCabecalho from '../../Components/Cabecalho/Cabecalho'

import { Link } from "react-router-dom"

export default function TelaHome() {
    return (
        <>
            <header className='cabecalho'>
                <Card texto_h1="Localisus" texto_descricao="Conectando a tecnologia ao cuidado, para que o acesso à saúde nunca seja uma distância" />
                <ul className='botoes'>
                    <li>
                        <Link to="/login">
                        <Botao texto="Entrar"/>
                        </Link>
                    </li>
                </ul>
                <ElementosCabecalho />
            </header>
            <main className='body'>
                <ConteudoPagina>
                    <article className='elementos-pagina-home'>
                        <section className='possibilidades'>
                            <h2>Com o Localisus você pode:</h2>
                        </section>
                        <section className='vantagens'>
                            <h2 >Vantagens do Localisus:</h2>
                        </section>
                    </article>
                    <article className='mapa-busca'>
                        <section className='buscar-no-mapa'>
                            <h2>Busque por um medicamento no mapa</h2>
                            <Link to="/mapa">
                                <button>
                                    buscar
                                </button>
                            </Link>
                        </section>
                    </article>
                    {/* quando um conteúdo é injetável, é necessário que ele seja fechado através de /antes do nome */}
                </ConteudoPagina>

            </main>
        </>
    )
}


