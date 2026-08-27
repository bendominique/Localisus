
interface estoque {
    id: number,
    nome: string,
    quantidade: number,
    medicamentoId: number, //isso daqui era pra representar uma instância da interface/objeto medicamento
    hospitalId: number, //aqui também
    validadeLote: Date,
    codigoLote: number
}

export const estoqueMock = [
    {id: 1, nome: "Dipirona", quantidade: 10, medicamentoId: 1, hospitalId: 1, validadeLote: new Date('2026-05-12'), codigoLote: 1234 },
    {id: 2, nome: "Paracetamol", quantidade: 100, medicamentoId: 2, hospitalId: 2, validadeLote: new Date('2026-05-12'), codigoLote: 1234 },
    {id: 3, nome: "Amoxicilina", quantidade: 100, medicamentoId: 3, hospitalId: 2,  validadeLote: new Date('2026-05-12'), codigoLote: 123456 }
]