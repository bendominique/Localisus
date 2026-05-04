import {url_base} from './api'
import { type Medicamento } from './HospitalService'


export interface ItemEstoque {
    id: number,
    medicamentoID: number,
    quantidade: number,
    validadeLote: string,
    codigoLote: string,
    medicamento?: Medicamento
}

export const atualizarEstoqueLocal = async (novoEstoque: ItemEstoque[]): Promise<Response> => {
    const token = localStorage.getItem('token');
    return await fetch(`${url_base}/estoque/atualizarEstoque`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(novoEstoque)
    })
}

export const getEstoqueLocal = async (id: number): Promise<ItemEstoque[]> => {
    const resposta = await
    fetch(`${url_base}/estoque/hospital/${id}`);
    if(!resposta.ok) throw new Error("Erro ao conectar com o backend");
    return resposta.json();
}