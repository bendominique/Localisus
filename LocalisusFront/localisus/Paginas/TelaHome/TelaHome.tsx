import './telahome.css'
import Botao from '../../src/Components/Botao/Botao'
import Card from '../../src/Components/Card/Card'
import ConteudoPagina from '../../src/Components/Body/Body'
import ElementosCabecalho from '../../src/Components/Cabecalho/Cabecalho'
import Login from '../TelaLogin/TelaLogin'
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
                    {/* quando um conteúdo é injetável, é necessário que ele seja fechado através de /antes do nome */}
                </ConteudoPagina>

            </main>
        </>
    )
}


