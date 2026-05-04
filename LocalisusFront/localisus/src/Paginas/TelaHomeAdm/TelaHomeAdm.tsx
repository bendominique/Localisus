import { useEffect, useState } from "react";
import { getHospitais, atualizarDadosHospital, type HospitalBackend } from "../../Services/HospitalService";

export default function TelaHomeAdm() {
    const [hospitais, setHospitais] = useState<HospitalBackend[]>([])

    

    const carregarLista = async () => {
        const dados = await getHospitais();
        setHospitais(dados)
    }

    useEffect(() => {
        const inicializar = async () => {
         await carregarLista();
        }
        inicializar();
    }, [])
    
    const handleEditar = async (h: HospitalBackend) => {
        const novoNome = prompt("Novo nomedo hospital:", h.nome) || h.nome;
        const novoEndereco = prompt("Novo endereço:", h.endereco) || h.endereco;

        try {
            await atualizarDadosHospital(h.id, {...h, nome: novoNome, endereco: novoEndereco})
            alert("Hospital atualizado!")
            carregarLista();
        } catch {
            alert("Falha na atualização")
        }

    }

    return (
        <div>
            <h1>Portal Administrativo </h1>
            <button onClick={() => alert("Abrir formulário de cadastro de novo hospital")}>
                Adicionar Novo Hospital
            </button>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Hospital</th>
                        <th>Endereço</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {hospitais.map(h => (
                        <tr key={h.id}>
                            <td>{h.id}</td>
                            <td>{h.nome}</td>
                            <td>{h.endereco}</td>
                            <td>
                                <button onClick={() => handleEditar(h)}>Editar Unidade</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

    )

    
}

