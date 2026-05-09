import { useEffect, useState } from "react"
import { medicamentosMock } from "../mocks/medicamentosMock"
import { useAuth } from "../contexts/AuthContext"
import { hospitaisMock } from "../mocks/hospitaisMocks"


export const Funcionario = () => {

   const { usuario } = useAuth()
   const [estoque, setEstoque] = useState<any[]>([])

   useEffect(() => {
    if(!usuario || !usuario.hospitalId) return;

    const estoqueHospital = medicamentosMock.filter(
        (m) => m.hospitalId === usuario.hospitalId
    )

    
    if (estoqueHospital.length === 0){
        alert("Estoque do hospital vazio! Solicite uma entrega urgentemente")
    }

    setEstoque(estoqueHospital)
   }, [usuario]) 

   const hospital = hospitaisMock.find(h => h.id === usuario?.hospitalId)

    return(
        <>
        <h2>Estoque {hospital?.nome}</h2>
        <ul>

            { estoque.map(e => 
                <li key={e.id}>
                    {e.nome} é
                    {e.descricao},
                   no nosso estoque ele contém a dosagem de {e.dosagem}ml e 
                    {e.quantidade} unidades
                </li>
       
            )}
         </ul>
        <h2>Pacientes</h2>
        </>
    )
}