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

    const estoqueHospitalSelecionado = useMemo(() => {
        if (!hospitalSelecionadoId) return []

        return estoqueMock.filter(item => item.hospitalId === hospitalSelecionadoId)
    }, [hospitalSelecionadoId])

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
    {hospitalSelecionadoId && hospitalSelecionadoId ? (
        <div className="tabela-estoque-hospital">
            <h2> Estoque do Hospital: {hospitalSelecionadoId}</h2>
            
            {estoqueHospitalSelecionado.length > 0 ? (
                <table className="tabela-medicamentos">
                    <thead>
                        <tr>
                            <th>Medicamento</th>
                            <th>Dosagem</th>
                            <th>Quantidade</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {estoqueHospitalSelecionado.map((medicamento) => (
                            <tr key={medicamento.id}>
                                 <td>{medicamento.nome}</td>
                                { /*<td>{medicamento.dosagem}mg</td> */}
                                <td>{medicamento.quantidade} un.</td>
                                <td className={medicamento.quantidade < 20 ? 'vermelho' : 'ok'}>
                                    {medicamento.quantidade < 20 ? 'Crítico' : 'Normal'}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>Nenhum medicamento registrado para esta unidade.</p>
            )}
        </div>
    ) : (
        <div className="estado-vazio">
            <p> Selecione um hospital no mapa para analisar o estoque integral</p>
        </div>
    )}
</aside>
                </section>
            </main>
        </>
    )
}