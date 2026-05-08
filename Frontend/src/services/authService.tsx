import { usuarioMock, type Usuario, TipoUsuario } from "../mocks/usuarioMock";



//simulando o carregamento na tela, ms é a representação de milisegundos
//esse carregamento é uma promessa de um setTimeout, ou seja atribuir um espaço de tempo, em milisegundos com 
// parâmetros de caso seja resolvido e milisegundos
const carregamentoTela = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export const authService = {

    //método de login
    async login(cpfDigitado: string): Promise<Usuario> {
        
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

    async register(nome: string, cpf: string, email: string, tipoUsuario: TipoUsuario, hospitalId: number | null): Promise<Usuario>{

        await carregamentoTela(1000)
        
        const dadosMocados = import.meta.env.VITE_USE_MOCKS === 'true'

        if(dadosMocados) {
            const cpfExistente = usuarioMock.find(u => u.cpf === cpf)
            if (cpfExistente) {
                throw new Error("Cpf já cadastrado no sistema!")
            }
        }

        const novoUsuario: Usuario = {
            //a lógica a seguiir é a representação de um auto-increment das nossas ids, o sistema
            //vai procurar se já existe um id anterior e apenas somar para obter um novo id
            id: usuarioMock.length > 0 ? Math.max(...usuarioMock.map(u => u.id)) + 1 : 1, 
            //...usuarioMock é um SpreadOperator, funciona como um espelhamento, com ele expandimos 
            //aquilo que está presente dentro da nossa interface que são os nossos elementos em array e podemos reutilizar eles
            //Math.max pega o maior valor dentro dese array através do map, pois o max não aceita arrays
            nome: nome,
            cpf: cpf,
            email: email,
            tipoUsuario: TipoUsuario.CIDADAO,
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