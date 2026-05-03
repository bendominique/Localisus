import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useHospital } from '../Context/HospitalContext';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import '../App.css'
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

// 2. Configure the Default Icon FIX (Outside the component)
let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;


const MapaMedicamentos = () => {
  const { hospitais, carregando } = useHospital(); // Tune in!

  if (carregando) return <p>Sincronizando com Backend...</p>;

  return (
    <MapContainer center={[-23.5505, -46.6333]} zoom={12}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      
      {/* Loop through global data to create pins */}
      {hospitais.map(h => (
        <Marker key={h.id} position={h.coords}>
          <Popup>
            <strong>{h.name}</strong>
            <hr />
            <p><strong>Estoque Disponível</strong></p>
            <ul>
                {/* Aqui listamos o que o Entity Framework trouxe do SQL Server */}
                {h.estoque?.map((item: any) => (
                    <li key={item.id}>{item.medicamento.nome}: {item.quantidade} un.</li>
                ))}
            </ul>
            </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapaMedicamentos