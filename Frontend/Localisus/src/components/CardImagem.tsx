import "./CardImagem.css"

export const CardImagem = () => {
    const cards = [
        { id: 1, titulo: 'Card 1', descricao: 'textotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotexto', link: 'https://picsum.photos/200/320'},
        { id: 2, titulo: 'Card 2', descricao: 'textotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotexto', link: 'https://picsum.photos/200/300'},
        { id: 3, titulo: 'Card 3', descricao: 'textotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotexto',link: 'https://picsum.photos/200/301'},
        { id: 3, titulo: 'Card 3', descricao: 'textotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotexto',link: 'https://picsum.photos/200/310'}
    ]

    return(
        <>
        <div className="cards">
            {
                cards.map( c =>
                    <div key={c.id} className="item-imagem">
                        <img src={c.link} alt={c.titulo} />
                        <div className="informacao">
                            <h2>{c.titulo}</h2>
                            <p>{c.descricao}</p>
                        </div>
                    </div>
                )
            }
        </div> 
        </>
    )
}