import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom"

export default function TelaCadastro() {

    const [nome, setNome] = useState('');
    const [tipoUsuario, setTipoUsuario] = useState('');
    const navegar = useNavigate();

    //como estamos utilizando uma tag de formulário para realizar o cadastro do usuário, todas as vezes em que nós clicarmos num botão é padrão o html reiniciar a página
    //preventDefault impede que esse padrão seja executado
    const handleCadastro = async (e) => {
        e.preventDefault();


        const resposta = await fetch('https://localhost:7024/api/usuarios/CriarUsuario', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nome, tipoUsuario }) //tramsformando o texto obtido em JSON
        });

        if (resposta.ok) {
            alert('Cadastro realizado com sucesso!');
            navegar('/')
        } else {
            alert('Erro ao cadastrar. Tente novamente.');
        }
    }


    return (
        <>
            <h1>Seja bem vindo ao Localisus</h1>
            <form onSubmit={handleCadastro}>
                <input
                    type="text"
                    placeholder="Nome de Usuário"
                    onChange={(e) => setNome(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="Tipo de Usuário"
                    onChange={(e) => setTipoUsuario(e.target.value)}
                />
                <button type="submit">Cadastrar</button>
            </form>
            <Link to="/cadastro">
                <p> Já possui uma conta? Entre</p>
            </Link>

        </>
    )


}
