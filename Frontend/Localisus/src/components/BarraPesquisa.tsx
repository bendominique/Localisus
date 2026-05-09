import { useState } from 'react'

interface BarraPesquisaProps {
    onSearch: (termo:string) => void
}

export const BarraPesquisa = ({ onSearch }: BarraPesquisaProps) => {
    const [termo, setTermo] = useState('')

    const handleEnvio = (e: React.FormEvent) => {
        e.preventDefault()
            onSearch(termo)
        
    }

    return(
        <form onSubmit={handleEnvio}>
            <input
                type='text'
                value={termo}
                onChange={(e) => setTermo(e.target.value)}
                placeholder='Pesquise por um medicamento'
                />
                <button type='submit'>Pesquisar</button>
        </form>
    )
}