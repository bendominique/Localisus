import * as L from 'leaflet'

export const gerarIconePorStatus = (status: string) => {

    let classeStatus = 'status-disponivel'

    if (status === 'INDISPONIVEL') classeStatus = 'status-indisponivel'
    else if (status === 'CRITICO') classeStatus = 'status-critico'

    return L.divIcon({
        className: `marcador-base ${classeStatus}`,
        html: `<div></div>`,
        iconSize: [24, 24],
        iconAnchor: [12, 12]
    })
}
