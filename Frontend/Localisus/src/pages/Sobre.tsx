import { ListaImagens } from "../imagens/ListaImagens";
import { useState } from 'react';

export default function Sobre() {
const [index, setIndex] = useState(0);
    
    let foto = ListaImagens[index];
    return (
        <>
            <h1 className="pq-localisus"> Por que usar o Localisus? </h1>
            <img src={foto.url} />
            <section className="resposta-localisus">
                <article className="para-todos">
                    ({index + 1} of {ListaImagens.length})
                    <img src={foto.url} />
                </article>
                <article className="possibilidades">

                </article>
                <article className="vantagens">

                </article>
            </section>
        </>
    )
}