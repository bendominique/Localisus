
interface estoque {
    id: number,
    quantidade: number,
    medicamentoId: number, //isso daqui era pra representar uma instância da interface/objeto medicamento
    hospitalId: number, //aqui também
    validadeLote: Date,
    codigoLote: number
}

export const estoqueMock = [
    {id: 1, quantidade: 10, medicamentoId: 1, hospitalId: 1, validadeLote: new Date('2026-05-12'), codigoLote: 1234 },
    {id: 2, quantidade: 100, medicamentoId: 2, validadeLote: new Date('2026-05-12'), codigoLote: 1234 },
    {id: 3, quantidade: 100, medicamentoId: 3, validadeLote: new Date('2026-05-12'), codigoLote: 123456 }
]