import {url_base} from '../Services/api'

export interface Medicamento {
    id: number,
    nome: string,
    descricao: string,
    dosagem: number,
    quantidade: number;
}

export interface ItemEstoque {
    id: number,
    medicamentoID: number,
    quantidade: number,
    validadeLote: string,
    codigoLote: string,
    medicamento?: Medicamento
}
export interface HospitalBackend{
    id: number,
    nome: string, 
    endereco: string,
    telefone: string,
    longitude: number,
    latitude: number
    itensEstoque?: ItemEstoque[];
}

export const getHospitais = async (): Promise<HospitalBackend[]> => {
    const resposta = await
    fetch(`${url_base}/hospital`);
    if(!resposta.ok) throw new Error("Erro ao conectar com o backend");
    return resposta.json();
}

export const buscarHospitais = async (nome: string): Promise<HospitalBackend[]> => {
    const resposta = await
    fetch(`${url_base}/hospital/buscar/${nome}`)
    if(!resposta.ok) return [];
    return resposta.json();
}

export const getHospitalId = async (id: number): Promise<HospitalBackend> => {
    const resposta = await
    fetch(`${url_base}/hospital/buscar/${id}`)
    if(!resposta.ok) throw new Error("Nenhuma unidade hospitalar encontrada")
    return resposta.json();
}

export const atualizarEstoqueLocal = async (id: number, novoEstoque: ItemEstoque[]): Promise<Response> => {
    const token = localStorage.getItem('token');
    return await fetch(`${url_base}/hospital/${id}/estoque`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(novoEstoque)
    })
}

export const criarNovoHospital = async (dados: HospitalBackend) => {
    const token = localStorage.getItem('token')
    return await fetch(`${url_base}/hospital/CriarHospital`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(dados)
    })
}

export const atualizarDadosHospital = async (id: number, dados: Partial<HospitalBackend>) => {
    const token = localStorage.getItem('token')
    return await fetch(`${url_base}/hospital/CriarHospital`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(dados)
    })
    
}