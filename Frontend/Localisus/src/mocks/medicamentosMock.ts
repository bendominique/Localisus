interface medicamento {
    id: number,
    nome: string,
    descricao: string,
    dosagem: number,
    quantidade: number,
    hospitalId: number
}

export const medicamentosMock = [
    {id: 1, nome: "Dipirona", descricao: "muito amargo", dosagem: 100, quantidade: 1100, hospitalId: 1},
    {id: 2, nome: "Paracetamol Comprimido", descricao: "irmão do dipirona", dosagem: 50, quantidade: 10, hospitalId: 1}
]