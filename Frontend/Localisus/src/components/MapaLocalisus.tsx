import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import 'leaflet/dist/leaflet.css'
import { latLng } from "leaflet";

interface MapaProps {
    hospitaisEncontrados: any[]
}

export const MapaLocalisus = ({hospitaisEncontrados}: MapaProps) => {
    const centro: [number, number] = [-23.5505, -46.6333]

    return (
        <MapContainer center={[-23.5505, -46.6333]} zoom={12} style={{ height: '500px', width: '100%', borderRadius: '8px', marginTop: '20px' }}>
            
            {/* O "Chão" do mapa construído com imagens do OpenStreetMap */}

            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {/* A "Mágica": Desenhando um pino para cada hospital que o Gerente (Home) mandou */}
            {hospitaisEncontrados.map((item, index) => (
                <Marker key={index} position={[item.hospital.latitude, item.hospital.longitude]}>
                    <Popup>
                        <strong>{item.hospital.nome}</strong> <br />
                        Medicamento: {item.nomeMedicamento} <br />
                        Estoque disponível: {item.quantidadeRestante} un.
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    )
}