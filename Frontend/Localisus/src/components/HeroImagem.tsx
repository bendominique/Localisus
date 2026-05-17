import svgherosemfundo from "../assets/svgherosemfundo.svg"
import "./HeroImagem.css"

export const HeroImagem = () => {
    return (
        <>
            <section className="hero-container">
                <div className="hero-texto">
                    <h1>Encontre seus medicamentos com mais facilidade</h1>
                    <div className="hero-imagem">
                        {
                            <img src={svgherosemfundo} className="dispositivos-hero" />
                        }
                    </div>
                </div>
            </section>
        </>
    )
}