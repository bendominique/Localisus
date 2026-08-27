import { usuarioMock, type Usuario, TipoUsuario } from "../mocks/usuarioMock";



//simulando o carregamento na tela, ms é a representação de milisegundos
//esse carregamento é uma promessa de um setTimeout, ou seja atribuir um espaço de tempo, em milisegundos com 
// parâmetros de caso seja resolvido e milisegundos
const carregamentoTela = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export const authService = {

    //método de login
    async login(cpfDigitado: string,
                 senhaDigitada: string
                    ): Promise<Usuario> {
        
        const dadosMocados = import.meta.env.VITE_USE_MOCKS === 'true'

        if (dadosMocados) {

            await carregamentoTela(1000);

            const usuarioEncontrado = usuarioMock.find(usuario => usuario.cpf === cpfDigitado);

            if (!usuarioEncontrado) {
                throw new Error("CPF ou Senha inválidos!")
            }

            return usuarioEncontrado;
        }

        /*
            CONEXÃO COM O BACKEND REAL
        const resposta = await fetch(url da api, {
            method: 'POST',
            body: JSON.stringfy({ cpf: cpfDigitado, senha: 'bilubilu'})
        }) 
            return await resposta.json()
        */
       throw new Error("Backend não conectado")
    },

    async register(nome: string, 
                    cpf: string, 
                    email: string,
                     senha: string,
                      tipoUsuario: TipoUsuario, 
                      hospitalId: number | null): Promise<Usuario>{

        await carregamentoTela(1000)
        
        const dadosMocados = import.meta.env.VITE_USE_MOCKS === 'true'

        if(dadosMocados) {
            const cpfExistente = usuarioMock.find(u => u.cpf === cpf)
            if (cpfExistente) {
                throw new Error("Cpf já cadastrado no sistema!")
            }
        }

        const novoUsuario: Usuario = {
            id: usuarioMock.length > 0 ? Math.max(...usuarioMock.map(u => u.id)) + 1 : 1,
            nome: nome,
            cpf: cpf,
            email: email,
            senha: senha,
            tipoUsuario: tipoUsuario,
            hospitalId: hospitalId
        }

        usuarioMock.push(novoUsuario)
    

        return novoUsuario
        
        throw new Error("Backend não encotrado")
    },

    /*
            CONEXÃO COM O BACKEND REAL
            const resposta = await fetch('url', {...mesma lógica})
    
    
    */

}