import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; // CRITICAL: Must be here
import L from 'leaflet';
import BuscaPersonalizada from './BuscaPersonalizada';
import BarraBusca from './BarraBusca';

// --- FIXED MARKER ICONS ---
// This prevents the "Marker not found" crash
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

const MapaMedicamentos = () => {
  const rawTipo = localStorage.getItem('tipoUsuario');
  const rawHospitalId = localStorage.getItem('hospitalId');

  const isDoctor = rawTipo === "2";
  const hospitalId = rawHospitalId ? parseInt(rawHospitalId) : undefined;

  return (
    /* We use inline styles here to guarantee it has a size */
    <div style={{ height: '100vh', width: '100vw', position: 'absolute', top: 0, left: 0 }}>
      <MapContainer 
        center={[-23.5505, -46.6333]} 
        zoom={12} 
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer 
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png" 
          attribution='&copy; OpenStreetMap contributors'
        />

        <BuscaPersonalizada position="topleft">
          <BarraBusca isDoctor={isDoctor} hospitalId={hospitalId} />
        </BuscaPersonalizada>

        <Marker position={[-23.5505, -46.6333]}>
           <Popup>Teste de Mapa</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MapaMedicamentos;