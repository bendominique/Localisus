import './Botao.css'

function Botao(props){
    return(
        <>
        <button id="botao" type="button">
        {props.texto}
        </button>
        </>
    )
}

export default Botao