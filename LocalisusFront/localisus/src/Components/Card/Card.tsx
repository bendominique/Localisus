function Card(props){
    return(
        <div className='card'>
            <h1 className="titulo-pagina">{props.texto_h1}</h1>
            {/* <img src="https://www.google.com/url?sa=t&source=web&rct=j&url=https%3A%2F%2Fwww.istockphoto.com%2Fphotos%2Ffamily-with-doctor&ved=0CBYQjRxqFwoTCJiEreiJkZQDFQAAAAAdAAAAABAf&opi=89978449" alt='localisus-home-page'/> */}
            <p>{props.texto_descricao}</p>
        </div>
    )
}

export default Card