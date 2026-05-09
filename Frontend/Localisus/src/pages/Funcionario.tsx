import { useEffect, useState } from "react"
import { medicamentosMock } from "../mocks/medicamentosMock"
import { useAuth } from "../contexts/AuthContext"
import { hospitaisMock } from "../mocks/hospitaisMocks"
import { estoqueMock } from "../mocks/estoqueMock"


export const Funcionario = () => {

   const { usuario } = useAuth()
   const [estoque, setEstoque] = useState<any[]>([])

  useEffect(() => {
    //começa a renderização na nossa tela, caso no momento em que a tela renderize, o usuário não esteja logado, ou não possua um hospital id, nem vai
    //return vazio significa que a tela vai parrr de funcioar
    if(!usuario || !usuario.hospitalId) return

    //criando uma representação dos nossos itens do estoque
    const itemHospital = estoqueMock.filter(
        (i) => i.hospitalId === usuario.hospitalId
    )

    if (itemHospital.length === 0){
        alert("O Estoque do hospital está vazio! Solicite uma demanda de novos medicamentos urgentemente.")
        return
    }

    const estoqueComNomes = itemHospital.map(item =>
    {
        const remedio = medicamentosMock.find(m => m.id === item.medicamentoId)

        return {
            idEstoque: item.id,
            nome: remedio?.nome,
            descricao: remedio?.descricao,
            dosagem: remedio?.dosagem,
            quantidade: remedio?.quantidade
        }
    })
    setEstoque(estoqueComNomes)
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