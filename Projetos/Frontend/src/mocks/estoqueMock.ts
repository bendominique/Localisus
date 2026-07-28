
interface estoque {
    id: number,
    quantidade: number,
    medicamentoId: number, //isso daqui era pra representar uma instância da interface/objeto medicamento
    hospitalId: number, //aqui também
    validadeLote: Date,
    codigoLote: number
}