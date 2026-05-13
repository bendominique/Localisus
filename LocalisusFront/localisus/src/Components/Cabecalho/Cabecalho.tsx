import './Cabecalho.css'

export default function cabecalho() {
    return(
        <>
        <header>
    <ElementosCabecalho/> 
        </header>
        </>
    )
}

function ElementosCabecalho(){
    return(
        <>
        <header className="elementos-cabecalho">
            <input className='barra-pesquisa' type='search' placeholder='Pesquise por um hospital ou medicamento'/>-
        </header>
        </>
    )
}