import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom"

export default function TelaLogin(){


    const [usuario, setUsuario] = useState('');
    const [senha, setSenha] = useState('');
    const navegar = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        const resposta = await fetch('https://localhost:7024/api/auth/login', {
            method: 'POST', //aqui usamos Post ao invés de Get evitando que a requisição dos dados esteja exposta dentro da url
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ usuario, senha })
        });

        if (resposta.ok) {
            const dado = await resposta.json();
            localStorage.setItem('token', 'dado.token') //salva o token
            navegar('/')
        } else {
            alert('Usuário ou senha incorretos!')
        }
    };

    return (
        <>
            <form onSubmit={handleLogin}>
                <h1>Acesso ao Localisus</h1>
                <input type="text" onChange={(e) => setUsuario(e.target.value)} placeholder="Usuário" />
                <input type="password" onChange={(e) => setSenha(e.target.value)} placeholder="Senha" />
                <button type="submit">Entrar</button>
            </form>
            <Link to="/login">
            <p> Não possui uma conta? Cadastre-se</p>
            </Link>
            
        </>
    )

}