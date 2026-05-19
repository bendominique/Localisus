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

    return (
        <main className="dashboard-funcionario-container">
            
            {/* CABEÇALHO ANALÍTICO */}
            <header className="kpi-container" style={{ display: 'flex', gap: '20px', marginBottom: '30px' }}>
                <article style={{"--cor-tema": "#25c900"} as React.CSSProperties}>
                    <ComponenteCard 
                        titulo="Capacidade Total Rede" 
                        descricao={`${metricasGlobais.capacidadeGeral} unidades armazenadas`} 
                        icone={Archive} cor="#25c900" 
                    />
                </article>
                <article style={{"--cor-tema": "#ff1a1a"} as React.CSSProperties}>
                    <ComponenteCard 
                        titulo="Alertas de Estoque Crítico" 
                        descricao={`${metricasGlobais.totalItensBaixo} lotes necessitando reposição`} 
                        icone={AlertTriangle} cor="#ff1a1a" 
                    />
                </article>
            </header>

            {/* MALHA MESTRE-DETALHE */}
            <section className="dashboard-grid" style={{ display: 'flex', gap: '20px' }}>
                
                {/* O MESTRE: Emissor de Interrupções */}
                <div className="area-visualizacao-mapa" style={{ flex: '1' }}>
                    <h2>Mapeamento de Disponibilidade Pública</h2>
                    <MapaFuncionario 
                        hospitais={hospitaisMock}
                        // INJEÇÃO DO CALLBACK: O mapa recebe a permissão de alterar o estado do Pai
                        onHospitalClick={setHospitalSelecionadoId}
                    />
                </div>

                {/* O DETALHE: Consumidor do Estado Derivado */}
                <aside className="area-inventario-especifico" style={{ width: '400px' }}>
                    {hospitalSelecionadoId !== null ? (
                        // Componente isolado. A complexidade do JOIN em memória fica encapsulada lá.
                        <PainelInventario hospitalId={hospitalSelecionadoId} />
                    ) : (
                        <div className="estado-vazio" style={{ padding: '20px', border: '1px dashed #ccc' }}>
                            <h2>Análise Estática</h2>
                            <p>Aguardando instrução de hardware. Selecione um nó logístico (hospital) no mapa para carregar o detalhamento integral do estoque.</p>
                        </div>
                    )}
                </aside>

            </section>
        </main>
    );
};