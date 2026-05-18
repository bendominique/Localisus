import { MapContainerProps, TileLayer, Marker, Popup, MapContainer } from "react-leaflet";
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { stat } from "fs";

interface MapaFuncionarioProps {
    hospitais: any[]
    onHospitalClick: (hospitalId: number) => void
}

const gerarIconePorStatus = (status: string) => {

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

export const MapaFuncionario = ({ hospitais, onHospitalClick }: MapaFuncionarioProps) => {
    const centro: [number, number] = [-23.55045, -46.6333]

    return (
        <div className="conteudo-mapa-funcionario">
            <MapContainer
                center={centro}
                zoom={12}
                style={{ height: '400px', width: '100%', borderRadius: '15px' }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                />
                {hospitais.map((hosp, index) => (
                    <Marker
                        key={index}
                        position={[hosp.latitude, hosp.longitude]}
                        eventHandlers={{
                            click: () => onHospitalClick(hosp.id),
                        }}
                    >
                        <Popup>
                            <strong>{hosp.nome}</strong>
                            Clique para abrir o inventário
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    )
}