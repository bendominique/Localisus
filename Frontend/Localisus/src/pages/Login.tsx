import {  useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { TipoUsuario } from '../mocks/usuarioMock'
import { authService } from '../services/authService'

export const Login = () => {
    const [cpfDigitado, setCpfDigitado] = useState('')
    const [senhaDigitada, setSenhaDigitada] = useState('')
    const [erro, setErro] = useState('')
    const { login } = useAuth()
    const navegar = useNavigate()

    const handleLogin = async (evento: React.FormEvent) => {
        evento.preventDefault()
        setErro('')

        try {
            const usuarioLogado = await login(cpfDigitado, senhaDigitada)
            
            if(usuarioLogado.tipoUsuario === TipoUsuario.ADMIN){
                navegar("/admin")
            } else if (usuarioLogado.tipoUsuario === TipoUsuario.FUNCIONARIO){
                navegar("/funcionario")
            } else {
                navegar("/")
            }
           

        } catch (error: any) {
            setErro(error.message)
        }
    }
    return (
        <>
        <h2> Seja bem vindo de volta </h2>
        <form onSubmit={handleLogin}>
            <input
                type="text"
                value={cpfDigitado}
                onChange={(e) => setCpfDigitado(e.target.value)}
                />
                <input
                type="password"
                value={senhaDigitada}
                onChange={(e) => setSenhaDigitada(e.target.value)}
                />
                <button type="submit">Entrar</button>
        </form>
            {erro && <p>{erro}</p>}
        </>
    )
}