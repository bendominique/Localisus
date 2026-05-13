
//aqui foi realizada uma desestruturação, ao passarmos os elementos como ({children})
//caso nós usassemos apenas (children), teríamos que a todo momento escrever props.children pra fazer algo
//dessa forma que foi passada, podemos escrever qualquer conteúdo em uma instância de ConteudoPagina que formos utilizar
const ConteudoPagina = ({children}) => {
    return(
        <>
        <main className="conteudo-pagina">
            {children}
        </main>
        </>
    )

}

export default ConteudoPagina