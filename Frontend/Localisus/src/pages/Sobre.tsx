import { CardImagem } from "../components/CardImagem";
import { ListaImagens } from "../imagens/ListaImagens";
import "./Sobre.css"
import { useState } from 'react';

export const Sobre = () => {
    const [index, setIndex] = useState(0);

    let foto = ListaImagens[index];
    return (
        <>

            <header>

            </header>
            <main>
                <section className="oq-localisus">
                    <h1>O que é o Localisus? </h1>
                    <p> Revolucionando o cuidado com a saúde através da tecnologia: uma plataforma multiplataforma que oferece controle total sobre medicamentos, promovendo segurança, autonomia e qualidade de vida para milhões de usuários. </p>
                </section>
                <section className="resposta-localisus">
                    <h1> O que o Localisus me permite fazer? </h1>
                     <CardImagem></CardImagem>
                </section>
            </main>

        </>
    )
}