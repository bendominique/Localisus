import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useHospital } from '../Context/HospitalContext';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import '../App.css'
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import { LISTA_HOSPITAIS_MOCK, LISTA_ESTOQUE_MOCK} from '../Context/DadosMocados'

// 2. Configure the Default Icon FIX (Outside the component)
let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;


const MapaMedicamentos = () => {
  // const { hospitais, carregando } = useHospital(); // Tune in!

  // if (carregando) return <p>Sincronizando com Backend...</p>;

  return (
    <MapContainer center={[-23.5505, -46.6333]} zoom={12}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      
      {/* Loop through global data to create pins */}
      {LISTA_HOSPITAIS_MOCK.map(h => (
        <Marker key={h.id} position={[h.latitude, h.longitude]}>
          <Popup>
            
            </Popup>
        </Marker>
        // <Marker key={h.id} position={[-46.4712, -23.5325]}>
        //   <Popup>
        //     <strong> Hospital </strong>
        //   </Popup>
        // </Marker>
      ))}
    </MapContainer>
  );
};

export default MapaMedicamentos