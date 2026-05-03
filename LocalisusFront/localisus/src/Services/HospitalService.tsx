import {url_base} from '../Services/api'

export interface HospitalBackend{
    id: number,
    nome: string, 
    endereco: string,
    telefone: string,
    longitude: number,
    latitude: number
    itensEstoque?: any[]
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