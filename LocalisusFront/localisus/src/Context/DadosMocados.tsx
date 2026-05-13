import { type HospitalBackend } from '../Services/HospitalService';
import { type ItemEstoque } from '../Services/EstoqueService';

export const LISTA_ESTOQUE_MOCK: ItemEstoque[] = [
    { id: 1, hospitalID: 1, medicamentoID: 10, nome: "Ibuprofeno", quantidade: 150, validadeLote: "2026-12-15", codigoLote: "LT-8821" },
    { id: 2, hospitalID: 1, medicamentoID: 12, nome: "Azitromicina", quantidade: 45,  validadeLote: "2025-08-20", codigoLote: "LT-9930" },
    { id: 3, hospitalID: 2, medicamentoID: 5,  nome: "Losartana Potássica", quantidade: 300, validadeLote: "2027-01-10", codigoLote: "LT-1022" },
    { id: 4, hospitalID: 3, medicamentoID: 8,  nome: "Atenolol", quantidade: 12,  validadeLote: "2025-06-05", codigoLote: "LT-4451" },
    { id: 5, hospitalID: 4, medicamentoID: 22, nome: "Rivaroxabana", quantidade: 80,  validadeLote: "2026-03-30", codigoLote: "LT-3320" },
    { id: 6, hospitalID: 4, medicamentoID: 3,  nome: "Soro Fisiológico", quantidade: 500, validadeLote: "2028-11-22", codigoLote: "LT-1111" },
    { id: 7, hospitalID: 5, medicamentoID: 14, nome: "Ceftriaxona", quantidade: 25,  validadeLote: "2025-09-12", codigoLote: "LT-2298" },
    { id: 8, hospitalID: 1, medicamentoID: 25, nome: "Simvastatina", quantidade: 120, validadeLote: "2027-02-18", codigoLote: "LT-9910" }
];

export const LISTA_HOSPITAIS_MOCK: HospitalBackend[] = [
    { 
        id: 1, 
        nome: "Hospital Central de São Paulo", 
        endereco: "Rua Santa Isabel, 305 - Vila Buarque", // Localização da Santa Casa
        telefone: "(11) 2176-7000", 
        latitude: -23.5434, 
        longitude: -46.6449,
        itensEstoque: LISTA_ESTOQUE_MOCK.filter(item => item.hospitalID === 1)
    },
    { 
        id: 2, 
        nome: "Hospital Santa Maria", 
        endereco: "Av. Paulista, 900", 
        telefone: "(11) 3251-1000", 
        latitude: -23.5657, 
        longitude: -46.6521,
        itensEstoque: LISTA_ESTOQUE_MOCK.filter(item => item.hospitalID === 2)
    },
    { 
        id: 3, 
        nome: "UPA Zona Leste", 
        endereco: "Rua Itaquera, 45", 
        telefone: "(11) 2050-3000", 
        latitude: -23.5350, 
        longitude: -46.4715, 
        itensEstoque: [] 
    },
    { 
        id: 4, 
        nome: "Hospital das Clínicas", 
        endereco: "Av. Dr. Enéas Carvalho, 255", 
        telefone: "(11) 2661-0000", 
        latitude: -23.5568, 
        longitude: -46.6715, 
        itensEstoque: [] 
    },
    { 
        id: 5, 
        nome: "Hospital São Luiz", 
        endereco: "Rua Dr. Alceu de Campos, 95", 
        telefone: "(11) 3040-1100", 
        latitude: -23.5910, 
        longitude: -46.6755, 
        itensEstoque: [] 
    },
    { 
        id: 6, 
        nome: "Hospital Israelita Albert Einstein", 
        endereco: "Av. Albert Einstein, 627", 
        telefone: "(11) 2151-1233", 
        latitude: -23.5998, 
        longitude: -46.7155 
    },
    { 
        id: 7, 
        nome: "Hospital Sírio-Libanês", 
        endereco: "Rua Dona Adma Jafet, 91", 
        telefone: "(11) 3394-0200", 
        latitude: -23.5575, 
        longitude: -46.6558 
    },
    { 
        id: 8, 
        nome: "Hospital Infantil Darcy Vargas", 
        endereco: "Rua Dr. Seráfico Assunção, 469", 
        telefone: "(11) 3723-3700", 
        latitude: -23.5912, 
        longitude: -46.7185 
    },
    { 
        id: 9, 
        nome: "Hospital Metropolitano", 
        endereco: "Rua Marcelina, 441", 
        telefone: "(11) 3677-2000", 
        latitude: -23.5285, 
        longitude: -46.6995 
    },
    { 
        id: 10, 
        nome: "Hospital Nove de Julho", 
        endereco: "Rua Peixoto Gomide, 625", 
        telefone: "(11) 3147-9999", 
        latitude: -23.5592, 
        longitude: -46.6575 
    },
    { 
        id: 11, 
        nome: "Hospital Santa Joana", 
        endereco: "Rua Dr. Eduardo Amaro, 225", 
        telefone: "(11) 5080-6000", 
        latitude: -23.5765, 
        longitude: -46.6415 
    },
    { 
        id: 12, 
        nome: "Hospital Alemão Oswaldo Cruz", 
        endereco: "Rua João Julião, 331", 
        telefone: "(11) 3549-0000", 
        latitude: -23.5712, 
        longitude: -46.6455 
    },
    { 
        id: 13, 
        nome: "Hospital Samaritano", 
        endereco: "Rua Conselheiro Brotero, 1486", 
        telefone: "(11) 3821-5300", 
        latitude: -23.5375, 
        longitude: -46.6625 
    },
    { 
        id: 14, 
        nome: "Upa Vila Mariana", 
        endereco: "Rua Domingos de Morais, 200", 
        telefone: "(11) 5571-0000", 
        latitude: -23.5855, 
        longitude: -46.6385 
    },
    { 
        id: 15, 
        nome: "Hospital da Luz", 
        endereco: "Rua Teixeira da Silva, 450", 
        telefone: "(11) 3017-3300", 
        latitude: -23.5735, 
        longitude: -46.6485 
    }
];