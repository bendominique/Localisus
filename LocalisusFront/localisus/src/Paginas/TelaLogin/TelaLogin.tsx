import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../Services/api'
import { Link } from "react-router-dom"

export default function TelaLogin() {


    const [cpf, setCpf] = useState('');
    const [senha, setSenha] = useState('');
    const navegar = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        const res = await api.login(cpf, senha);
        const dado = await res.json();

        if (res.ok) {
            localStorage.setItem('token', dado.token);
            localStorage.setItem('usuarioNome', dado.usuarioNome);
            navegar('/home-usuario')
        } else {
            alert(dado.message);
        }
    };

    return (
        <>
            <form onSubmit={handleLogin}>
                <h1>Entrar</h1>
                <input placeholder="CPF" onChange={(e) => setCpf(e.target.value)} />
                <input type="password" placeholder="Senha" onChange={(e) => setSenha(e.target.value)} />
                <button type="submit">Entrar</button>
            </form>
             <Link to="/cadastro">
                    Não possui uma conta? Cadastre-se
                </Link>

        </>
    )

}