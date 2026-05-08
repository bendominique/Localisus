import {  useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export const Login = () => {
    const [cpfDigitado, setCpfDigitado] = useState('')
    const [senhaDigitada, setSenhaDigitada] = useState('')
    const [erro, setErro] = useState('')
    const { login } = useAuth()
    const navigate = useNavigate()

    const handleLogin = async (evento: React.FormEvent) => {
        evento.preventDefault()
        setErro('')

        try {
            await login(cpfDigitado, senhaDigitada);
            navigate('/admin')

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