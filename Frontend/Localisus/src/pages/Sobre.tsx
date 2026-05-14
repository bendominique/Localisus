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
                    <h4>O que é o Localisus? </h4>
                    <h2>Tecnologia que aproxima você do que realmente importa:<span id="saude-span">sua saúde</span></h2>
                    <p> O Localisus é uma plataforma inteligente que conecta você aos medicamentos, postos de saúdes, farmácias e informações para que você cuide melhor de si e quem ama </p>
                </section>
                <section className="resposta-localisus">
                    <h4> O que o Localisus me permite fazer? </h4>
                     <CardImagem></CardImagem>
                </section>
            </main>

        </>
    )
}