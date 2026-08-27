
export interface hospital{
    id: number,
    nome: string,
    endereco: string,
    telefone: string,
    longitude: number,
    latitude: number,
    status: string
}

export const hospitaisMock = [
    { id: 1, nome: "Hospital das Clínicas", latitude: -23.556, longitude: -46.669, status: "DISPONIVEL"},
     { id: 2, nome: "Santa Casa", latitude: -23.543, longitude: -46.652, status: "INDISPONIVEL"}
]