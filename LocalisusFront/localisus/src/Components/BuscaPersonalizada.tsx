import React, { useEffect, useState } from 'react'
import { useMap } from 'react-leaflet'
import L, { map } from 'leaflet'
import { createPortal } from 'react-dom'

interface Props {
    position: L.ControlPosition;
    children: React.ReactNode
}

const BuscaPersonalizada = ({ position, children}: Props) => {
    const mapa = useMap();
    const [container, setContainer] = useState<HTMLDivElement | null>(null)   

    useEffect(() => {
        const controle = new L.Control({ position })

        controle.onAdd = () => {
            const div =  L.DomUtil.create('div')

            L.DomEvent.disableClickPropagation(div)
            L.DomEvent.disableScrollPropagation(div)
            
            setContainer(div)
            return div
        }

        controle.addTo(mapa)
        return () => { controle.remove(); }
    }, [mapa, position])

    return container ? createPortal(children, container) : null
}

export default BuscaPersonalizada