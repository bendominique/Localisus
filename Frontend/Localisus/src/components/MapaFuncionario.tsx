import { TileLayer, Marker, Popup, MapContainer } from "react-leaflet";
import 'leaflet/dist/leaflet.css'
import {type hospital} from "../mocks/hospitaisMocks"
import "../pages/Funcionario.css"
import { gerarIconePorStatus } from "./ElementosMapa/mapaUtil";

export interface HospitalMapeado extends hospital {
    status: string;
}


interface MapaFuncionarioProps {
    hospitais: HospitalMapeado[];
    onHospitalClick: (hospitalNome: number) => void
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
                        icon={gerarIconePorStatus(hosp.status)}
                        eventHandlers={{
                            click: () => onHospitalClick(hosp.id),
                        }}
                    >
                        <Popup>
                            <strong>{hosp.nome}</strong>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    )
}