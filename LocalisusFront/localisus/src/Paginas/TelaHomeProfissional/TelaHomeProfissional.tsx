import { useEffect, useState } from "react";
import { getEstoqueLocal, atualizarEstoqueLocal, ItemEstoque } from "../../Services/EstoqueService";

export default function TelaHomeProfissional() {
    const [estoque, setEstoque] = useState<ItemEstoque[]>([])
    const hospitalId = Number(localStorage.getItem('hospitalId'))

 

    const carregarDados = async () => {
        const dados = await getEstoqueLocal(hospitalId)
        setEstoque(dados)
    }

       useEffect(() => {
        if(hospitalId) carregarDados();
    }, [hospitalId]);

    const handleAjusteEstoque = async (item: ItemEstoque, operacao: 'entrada' | 'doacao') => {
        const valor = Number(prompt(`Quantidade para ${operacao}`))
        if(!valor || valor <= 0) return;

        const quantidadeFinal = operacao === 'doacao' ? -valor : valor;

        try {
            await atualizarEstoqueLocal({
                medicamentoId: item.medicamentoID,
                hospitalId: hospitalId,
                quantidade: quantidadeFinal,
                validadeLote: item.validadeLote,
                codigoLote: item.codigoLote
            });
            alert("Operação registrada com sucesso!")
            carregarDados()
        } catch (err) {
            alert("Erro ao atualizar o estoque")
        }
    }

    return(
        <div>
            <h2>Painel do Supervisor - Unidade ID: {hospitalId}</h2>
            <table>
                <thead>
                    <tr>
                        <th>Medicamento</th>
                        <th>Quantidade Atual</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {estoque.map(item => (
                        <tr key={item.id}>
                            <td>{item.medicamento?.nome}</td>
                            <td>{item.quantidade}</td>
                            <td>
                                <button onClick={() => handleAjusteEstoque(item, 'entrada')}>Registrar Entrada</button>
                                <button onClick={() => handleAjusteEstoque(item, 'doacao')}>Registrar Doação/Envio</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}