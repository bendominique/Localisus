import {  useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { TipoUsuario } from '../mocks/usuarioMock'

export const Cadastro = () => {
    const [ nome, setNome] = useState('')
    const [ cpf, setCpf] = useState('')
    const [ email, setEmail] = useState('')
    const [ senha, setSenha] = useState('')
    const [ tipo, setTipo] = useState<TipoUsuario>(TipoUsuario.CIDADAO)
    const [ hospital, setHospital] = useState<number | null>(null)
    const [erro, setErro] = useState('')
    const { register } = useAuth()
    const navegar = useNavigate()

    const handleCadastro = async (evento: React.FormEvent) => {
        evento.preventDefault()
        setErro('')

        try {
            await register(nome, cpf, email, senha, tipo, hospital)
            navegar('/login')
        } catch (error: any) {
            setErro(error.message)
        }
    }

    const handleEscolhaUsuario = async (evento: React.ChangeEvent<HTMLSelectElement>) => {
        evento.preventDefault()
        const valorSelecionado = Number(evento.target.value)
        setTipo(valorSelecionado)
        
        if (valorSelecionado === TipoUsuario.CIDADAO) {
            setHospital(null)
        }
    }

    return(
        <>
        <h2> Cadastre-se no Localisus </h2>
        <form onSubmit={handleCadastro}>
            <input
                type="text"
                value={nome}
                placeholder='Nome'
                onChange={(e) => setNome(e.target.value)}
                />
                <input
                type="email"
                value={email}
                placeholder='Email'
                onChange={(e) => setEmail(e.target.value)}
                />
                <input
                type="text"
                value={cpf}
                placeholder='Cpf'
                onChange={(e) => setCpf(e.target.value)}
                />
                <input
                type="password"
                value={senha}
                placeholder='Senha'
                onChange={(e) => setSenha(e.target.value)}
                />
                <div>
                    <select
                        id='escolha-usuario'
                        value={tipo}
                        onChange={handleEscolhaUsuario}
                        >
                        <option value="cidadao">Cidadão</option>
                        <option value="funcionario">Funcionário</option>
                    </select>
                    
                    {tipo === TipoUsuario.FUNCIONARIO && (
                    <input 
                        type="number"
                        value={hospital || ''}
                        placeholder='Id do Hospital'
                        onChange={(e) => setHospital(Number(e.target.value))}/>
                )}
                </div>
        </form>
        </>
    )
}