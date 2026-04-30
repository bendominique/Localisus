import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { api } from '../../Services/api'

export default function TelaCadastro() {
    const [dadoFormulario, setDadoFormulario] = useState({
        nome: '', email: '', cpf: '', senha: '', tipoUsuario: 1, hospitalId: ''
    });
    const navegar = useNavigate();

    /// ????????????????????????
    const handleEntrada = (e) => {
        const { name, value } = e.target;
        setDadoFormulario({ ...dadoFormulario, [name]: value });
    };

    const handleSaida = async (e) => {
        e.preventDefault();



        const enviarDados = {
            ...dadoFormulario,
            tipoUsuario: (dadoFormulario.tipoUsuario),
            hospitalId: dadoFormulario.hospitalId ? parseInt(dadoFormulario.hospitalId) : null
        };


        try {
            const res = await api.cadastrar(enviarDados);
            const dado = await res.json();

            if (res.ok) {
                alert('Cadasto realizado!');
                navegar('/login')
            } else {
                alert(dado.Mensagem || "Erro ao cadastrar");
            };

        } catch (erro) {
            console.error(erro)
        }

    }



    return (
        <>
            <form onSubmit={handleSaida}>
                <h1>Cadastro Localisus</h1>
                <input name="nome" placeholder="Nome" onChange={handleEntrada} required />
                <input name="email" type="email" placeholder="Email" onChange={handleEntrada} required />
                <input name="cpf" placeholder="CPF" onChange={handleEntrada} required />
                <input name="senha" type="password" placeholder="Senha" onChange={handleEntrada} required />

                <select name="tipoUsuario" onChange={handleEntrada}>
                    <option value="1">Cidadão</option>
                    <option value="2">Funcionário</option>
                </select>

                {dadoFormulario.tipoUsuario == 2 && (
                    <input name="hospitalId" placeholder="ID do Hospital" onChange={handleEntrada} />
                )}

                <button type="submit">Finalizar Cadastro</button>
            </form>
        </>
    )
}



/*
                DIFERENÇA ENTRE CONST E FUNCTION
            
    - const: cria-se uma variável que dentro dela executa-se uma função.
    -function: cria-se uma declaração, é através dela que o React faz a transição, obtém as informações presentes para ser utilizado no nosso programa.




*/