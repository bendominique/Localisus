import React, { useState } from 'react';

interface Props {
  isDoctor: boolean;
  hospitalId?: number; // Optional so Lucy doesn't break it
}

const BarraBusca = ({ isDoctor, hospitalId }: Props) => {
  const [query, setQuery] = useState("");

  const manipularBusca = () => {
    if (isDoctor && hospitalId) {
      console.log(`Buscando ${query} no hospital ID: ${hospitalId}`);
    } else {
      console.log(`Buscando ${query} em todos os hospitais (Lucy mode)`);
    }
  };

  return (
    <div style={{ 
      display: 'flex', 
      gap: '5px', 
      background: 'white', 
      padding: '10px', 
      borderRadius: '4px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.2)' 
    }}>
      <input 
        type="text" 
        value={query} 
        onChange={(e) => setQuery(e.target.value)} 
        placeholder="Pesquisar medicamento..." 
        style={{ padding: '5px' }}
      />
      <button onClick={manipularBusca} style={{ cursor: 'pointer' }}>🔍</button>
    </div>
  );
};

export default BarraBusca;