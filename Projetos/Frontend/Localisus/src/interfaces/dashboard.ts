export interface KPIMetrica {
    titulo: string;
    valor: string;
    percentualDelta: string;
    isPositivo: boolean;
}

export interface RegistroRegiao {
    regiao: string;
    unidades: number;
    disponibilidadeMedia: number;
    estoqueTotal: number;
    medicamentosDisponiveis: number;
    usuariosAtendidos: number;
}