import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import iconMarker from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

const customIcon = L.icon({
    iconUrl: iconMarker,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
});

interface MapaProps {
    hospitaisEncontrados: any[]
}

export const MapaLocalisus = ({hospitaisEncontrados}: MapaProps) => {
    const centro: [number, number] = [-23.5505, -46.6333]

    return (
        <div className="conteudo-mapa">
            <MapContainer center={[-23.5505, -46.6333]} zoom={12} style={{ height: '500px', width: '100%', borderRadius: '8px', marginTop: '20px' }}>
            
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

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
        </div>
    )
}