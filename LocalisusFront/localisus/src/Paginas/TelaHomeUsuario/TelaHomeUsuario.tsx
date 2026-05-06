import { useState } from 'react';
import 'leaflet/dist/leaflet.css';
import { buscarHospitais, type HospitalBackend } from '../../Services/HospitalService';
import { getEstoqueLocal, type ItemEstoque } from '../../Services/EstoqueService';

export default function TelaHomeUsuario(){
    const [busca, setBusca] = useState('')
    const [hospitais, setHospitais] = useState<HospitalBackend[]>([]);
    const [hospitalSelecionado, setHospitalSelecionado] = useState<HospitalBackend | null>(null);
    const [estoque, setEstoque] = useState<ItemEstoque[]>([]);

    const handleBusca = async () => {
        const res = await buscarHospitais(busca);
        setHospitais(res);
    }

    const verDetalhes = async (h: HospitalBackend) => {
        setHospitalSelecionado(h);
        const itens = await getEstoqueLocal(h.id)
        setEstoque(itens)
    };
    
    return (
        <div>
            <h2>Consulta de Medicamentos (Dona Alzira)</h2>
            <input value={busca} onChange={e => setBusca(e.target.value)} placeholder="Nome do Hospital..." />
            <button onClick={handleBusca}>Buscar</button>

            <ul>
                {hospitais.map(h => (
                    <li key={h.id}>
                        {h.nome} - <button onClick={() => verDetalhes(h)}>Ver Estoque e Rota</button>
                    </li>
                ))}
            </ul>

        </div>
    )
}