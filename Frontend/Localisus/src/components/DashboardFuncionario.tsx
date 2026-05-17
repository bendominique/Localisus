import { useState, useMemo } from 'react';
import { estoqueMock } from '../mocks/estoqueMock';
import { hospitaisMock } from '../mocks/hospitaisMocks';
import { MapaFuncionario } from './MapaFuncionario';

export const DashboardFuncionario = () => {
    const [hospitalSelecionadoId, setHospitalSelecionadoId] = useState<number | null>(null)

    const metricasGlobais = useMemo(() => {
        let totalItensBaixo = 0;
        let capacidadeGeral = 0;

        estoqueMock.forEach(item => {
            capacidadeGeral += item.quantidade;
            if (item.quantidade < 20) {
                totalItensBaixo += 1;
            }
        })

        return {
            capacidadeGeral,
            totalItensBaixo
        }
    }, [])

    return (
        <>
            <main className="dashboard-funcionario-container">
                <header className="kpi-container">
                    {/* kpi = Key PErformance Indicator */}
                    <div className="card-kpi">
                        <h3> Capacidade Total Rede </h3>
                        <p>{metricasGlobais.capacidadeGeral}</p>
                    </div>
                    <div className="card-kpi-2">
                        <h3> Alertas de Estoque Crítico </h3>
                        <p className="alerta-vermelho">{metricasGlobais.totalItensBaixo}</p>
                    </div>
                </header>
                <section className="dashboard-grid">
                    <div className="area-visualizacao-mapa">
                        <h2>Mapeamento de Disponibilidade Pública</h2>
                        <MapaFuncionario 
                            hospitais={hospitaisMock}
                            onHospitalClick={setHospitalSelecionadoId}
                            />
                    </div>
                    <aside className="area-inventario-especifico">
                        {hospitalSelecionadoId ? (
                            <div className="tabela-estoque-hospital">
                                <h2> Estoque do Hospital #{hospitalSelecionadoId}</h2>
                            </div>
                        ): (
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