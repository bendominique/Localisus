import svgherosemfundo from "../assets/svgherosemfundo.svg"
import BackgroundHome from "./BackgroundHome"
import "./HeroImagem.css"

export const HeroImagem = () => {
    return (
        <>
            <section className="hero-container">
                <BackgroundHome/>
                <div className="hero-texto">
                    <h2>SUS + Perto de você</h2>
                    <h1>Encontre seus medicamentos <br></br> do <span> SUS </span> com mais facilidade</h1>
                    <p>Busque, localize e encontre medicamentos disponíveis <br></br> nos postos de saúde mais próximos de você.</p>
                </div>
                <div className="hero-imagem">
                    {
                        <img src={svgherosemfundo} className="dispositivos-hero" />
                    }
                </div>
            </section>
        </>
    )
}