import './telahome.css'
import '../UI/Botoes'

export default function TelaHome() {
    return (
        <>
        <header className='cabecalho'>
        <h1 className='letreiro'>Localisus</h1>
        <PicCabecalhoLocalisus/>
        <Botao/>
        <BarraPesquisa/>
        </header>
        </>
    )
}

function PicCabecalhoLocalisus() {
    return(
        <>
        <img id='familia-localisus'
        src="https://images.pexels.com/photos/7446997/pexels-photo-7446997.jpeg"
        alt="familia.sus"
        />
{/* 
        <img id="mr-localisus-pic"
        src="https://www.shutterstock.com/image-photo/healthcare-arms-crossed-portrait-black-600nw-2480452541.jpg"
        alt="mr.localisus" 
        />*/}
        
        </>
    )
}

function BarraPesquisa() { 
    return(
            <input className='barra-pesquisa' type='search' placeholder='Pesquise por um hospital ou medicamento'/>
    )
}