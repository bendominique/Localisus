export const url_base = 'https://localhost:7024/api'; //estamos declarando a api de conexão de uma vez permitindo que ela possa ser reutilizada de forma profissional ao longo do código

export const api = {
    //realizando a conexão com a authcontroller da api do localisus
    login: async (cpf, senha) => {
        const resposta = await fetch(`${url_base}/auth/login`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ cpf, senha})
        });
        return resposta
    },

    //realizando a conexão com o usuariocontroller, onde fica a lógica do nosso cadastro
    cadastrar: async (dados) => {
        const resposta = await fetch(`${url_base}/usuarios/CriarUsuario`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dados)
        });
        return resposta;
    }
};