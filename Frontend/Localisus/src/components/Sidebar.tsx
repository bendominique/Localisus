import { useState } from "react"
import "./Sidebar.css"

const elementosBarraLateral = [
    { id: 1, nome: "", icone: "" } //um array para os elementos da barra, assim conforme eles crescem eles apenas vão ser implementados na brra 
]

export const Sidebar = () => {

    const [estaAberta, setEstaAberta ] = useState(true)

    return (
        <>
            <div className={`barra-lateral ${estaAberta ? 'aberta' : 'fechada'}`}>
                <button onClick={() => setEstaAberta(!estaAberta)}>
                    {estaAberta ? 'Sim' : 'Nao'}
                </button>
                {
                    <div className="elementos-barra">
                           {elementosBarraLateral.map((item) => (
                            <div className="item-menu" key={item.id}>
                                <span className="icone">{item.icone}</span>
                                {estaAberta && <span className="nome">{item.nome}</span>}
                            </div>
                           ))}
                </div>
                }
            </div>
        </>
    )
}