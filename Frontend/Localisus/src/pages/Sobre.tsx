import { ListaImagens } from "../imagens/ListaImagens";
import { useState } from 'react';

export const Sobre = () => {
const [index, setIndex] = useState(0);
    
    let foto = ListaImagens[index];
    return (
        <>
            <h1 className="pq-localisus"> Por que usar o Localisus? </h1>
            <section className="resposta-localisus">
                <article className="para-todos">
                    
                </article>
                <article className="possibilidades">

                </article>
                <article className="vantagens">

                </article>
            </section>
        </>
    )
}