import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { TipoUsuario } from '../mocks/usuarioMock'
import { authService } from '../services/authService'
import celularimagem from '../imagens/login-celular.png'
import mapaimagem from '../imagens/mapa1.png'
import "./Login.css"

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

            if (usuarioLogado.tipoUsuario === TipoUsuario.ADMIN) {
                navegar("/admin")
            } else if (usuarioLogado.tipoUsuario === TipoUsuario.FUNCIONARIO) {
                navegar("/funcionario")
            } else {
                navegar("/home-user")
            }


        } catch (error: any) {
            setErro(error.message)
        }
    }
    return (
        <>
            <div className="conteudo-login">
                <div className="elementos-login">
                    <h2>Tecnologia que aproxima você do que realmente importa: <span>sua saúde</span></h2>
                    <img id='mapa' src={mapaimagem} />
                    <img id='celular' src={celularimagem} />
                </div>
                <div className="login-container">
                    <h3>Faça login para continuar</h3>
                    <form onSubmit={handleLogin}>
                        <div className="inputs">
                            <p> CPF ou Email</p>
                            <input
                                type="text"
                                value={cpfDigitado}
                                onChange={(e) => setCpfDigitado(e.target.value)}
                            />
                            <p>Senha</p>
                            <input
                                type="password"
                                value={senhaDigitada}
                                onChange={(e) => setSenhaDigitada(e.target.value)}
                            />

                        </div>
                        <button type="submit">Entrar</button>
                        <h4> Ou entre com</h4>
                        {erro && <p>{erro}</p>}
                    </form>
                </div>
            </div>
        </>
    )
}