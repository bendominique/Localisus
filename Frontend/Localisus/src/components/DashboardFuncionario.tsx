// src/components/DashboardFuncionario.tsx
import { useState, useMemo } from 'react';
import { estoqueMock } from '../mocks/estoqueMock';
import { hospitaisMock } from '../mocks/hospitaisMocks';
import { MapaFuncionario } from './MapaFuncionario';
import { PainelInventario } from './PainelInventario'; // Importação do componente criado
import { ComponenteCard } from './Cards';
import { Archive, AlertTriangle } from 'lucide-react';

export const DashboardFuncionario = () => {
    // 1. O PONTEIRO DE MEMÓRIA (Fonte Única da Verdade para a Hierarquia)
    const [hospitalSelecionadoId, setHospitalSelecionadoId] = useState<number | null>(null);

    // 2. AGREGAÇÃO DE DADOS MATEMÁTICOS (Top-Level Analysis)
    const metricasGlobais = useMemo(() => {
        let totalItensBaixo = 0;
        let capacidadeGeral = 0;

        estoqueMock.forEach(item => {
            capacidadeGeral += item.quantidade;
            if (item.quantidade < 20) {
                totalItensBaixo += 1;
            }
        });

        return { capacidadeGeral, totalItensBaixo };
    }, []);

    const hospitaisCustomizados = useMemo(() => {
        return hospitaisMock.map(hosp => {
            const estoqueLocal = estoqueMock.filter(e => e.hospitalId === hosp.id)

            const volumeTotal = estoqueLocal.reduce((soma, item) => soma + item.quantidade, 0)

            let statusLogistico = 'DISPONIVEL';
            if (volumeTotal === 0) statusLogistico = 'INDISPONIVEL'
            else if (volumeTotal < 50) statusLogistico = 'CRITICO'

            return {
                id: hosp.id,
                nome: hosp.nome,
                latitude: hosp.latitude,
                longitude: hosp.longitude,
                endereco: "",
                telefone: "",
                status: statusLogistico,
                volumeEstoque: volumeTotal
            }
        })
    }, []
)
    return (
        <>

            <main className="dashboard-funcionario-container">
                <header>
                </header>
                <section className="dashboard-grid">
                    <article className="area-visualizacao-mapa">
                        <h2>Mapeamento de Disponibilidade Pública</h2>
                        <MapaFuncionario
                            hospitais={hospitaisCustomizados}
                            onHospitalClick={setHospitalSelecionadoId}
                        />
                    </article>
                </section>
                <section className="kpi-container">
                    <article className="card-kpi">
                        <h3> Capacidade Total Rede </h3>
                        <p>{metricasGlobais.capacidadeGeral}</p>
                    </article>
                    <article className="card-kpi-2">
                        <h3> Alertas de Estoque Crítico </h3>
                        <p className="alerta-vermelho">{metricasGlobais.totalItensBaixo}</p>
                    </article>

                    <aside className="area-inventario-especifico">
                        {hospitalSelecionadoId ? (
                            <div className="tabela-estoque-hospital">
                                <h2> Estoque do Hospital {hospitalSelecionadoId}</h2>
                            </div>
                        ) : (
                            <div className="estado-vazio">
                                <p> Selecione um hospital público para o mapa analisar o estoque integral</p>
                            </div>
                        )}
                    </aside>
                </section>
            </main>
        </>
    )
}