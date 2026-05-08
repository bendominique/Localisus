export enum tipoUsuario {
    ADMIN, 
    CIDADAO,
    FUNCIONARIO,   
}

export interface Usuario {
    id: number, //para mim o id deveria entrar como string tb
    nome: string,
    email: string,
    cpf: string, //não faremos nenhum cálculo com isso
    tipoUsuario: tipoUsuario,
    hospitalId: number | null //permitindo que um cidadão ou então um admin registrem-se, mesmo que seja nulo, se deixarmos apenas number é obrigatório um number
}

export const usuarioMock: Usuario[] = [
    {id: 1, nome: "Benjamin", email: "benja@gmail.com", cpf: "111.111.111-11", tipoUsuario: tipoUsuario.ADMIN, hospitalId: null},
    {id: 2, nome: "Ruth", email: "ruth@gmail.com", cpf: "111.111.111-12", tipoUsuario: tipoUsuario.FUNCIONARIO, hospitalId: 1},
    {id: 3, nome: "Neuza", email: "neuza@gmail.com", cpf: "111.111.111-13", tipoUsuario: tipoUsuario.CIDADAO, hospitalId: null}
] 
