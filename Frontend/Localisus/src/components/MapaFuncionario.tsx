import { MapContainerProps, TileLayer, Marker, Popup, MapContainer } from "react-leaflet";
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

interface MapaFuncionarioProps {
    hospitais: any[]
    onHospitalClick: (hospitalId: number) => void
}

export const MapaFuncionario = ({ hospitais, onHospitalClick }: MapaFuncionarioProps) => {
    const centro: [number, number] = [-23.55045, -46.6333]

    return (
        <div className="conteudo-mapa-funcionario">
            <MapContainer
                center={centro}
                zoom={12}
                style={{ height: '400px', width: '100%', borderRadius: '15px' }}
            />
            <TileLayer
                attribution='&copy; <a href="https://carto.com/">CARTO</a>'
                url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            />
            {hospitais.map((hosp, index) => (
                <Marker 
                    key={index}
                    position={[hosp.latitude, hosp.longitude]}
                    eventHandlers={{
                        click: () => onHospitalClick?.(hosp.id),
                    }}
                >
                    <Popup>
                    <strong>{hosp.nome}</strong>
                        Clique para abrir o inventário
                    </Popup>
                </Marker>
            ))}
        </div>
    )
}