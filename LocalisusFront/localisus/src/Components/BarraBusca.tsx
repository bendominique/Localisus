import {useState} from 'react'
import { useHospital } from '../Context/HospitalContext'

export const BarraBusca = () => {
    const [termo, setTermo] = useState('');
    const {pesquisar} = useHospital()

    const lidarComBusca = (e: React.FormEvent) => {
        e.preventDefault();
        pesquisar(termo)
    }

    return (
        <form onSubmit={lidarComBusca} className='caixa-pesqusia'>
            <input
                type='text'
                value={termo}
                onChange={(e) => setTermo(e.target.value)}
                placeholder='Pesquisar hospital ou estoque...'
            />
            <button type="submit">Buscar</button>
            </form>
    )
}    