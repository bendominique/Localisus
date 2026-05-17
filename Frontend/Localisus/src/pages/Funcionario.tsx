import { useEffect, useState } from "react"
import { medicamentosMock } from "../mocks/medicamentosMock"
import { useAuth } from "../contexts/AuthContext"
import { hospitaisMock } from "../mocks/hospitaisMocks"
import { estoqueMock } from "../mocks/estoqueMock"
import { TopbarUsuarios } from "../components/TopbarUsuarios"
import "./Funcionario.css"
import { IceCream } from "lucide-react"
import { ComponenteCard } from "../components/Cards"


export const Funcionario = () => {

    const { usuario } = useAuth()
    const [estoque, setEstoque] = useState<any[]>([])
    const cardsFuncionario = [
        { titulo: "Estoque total", descricao: "12,2M", icone: IceCream, cor: "#ffff" },
        { titulo: "Medicamentos disponíveis", descricao: "12.219", icone: IceCream, cor: "#ffff" },
        { titulo: "Unidades ativas", descricao: "128", icone: IceCream, cor: "#ffff" },
        { titulo: "Usuários atendidos", descricao: "56.982", icone: IceCream, cor: "#ffff" }
    ]

    useEffect(() => {
        //começa a renderização na nossa tela, caso no momento em que a tela renderize, o usuário não esteja logado, ou não possua um hospital id, nem vai
        //return vazio significa que a tela vai parrr de funcioar
        if (!usuario || !usuario.hospitalId) return

        //criando uma representação dos nossos itens do estoque
        const itemHospital = estoqueMock.filter(
            (i) => i.hospitalId === usuario.hospitalId
        )

        if (itemHospital.length === 0) {
            alert("O Estoque do hospital está vazio! Solicite uma demanda de novos medicamentos urgentemente.")
            return
        }

        const estoqueComNomes = itemHospital.map(item => {
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

    return (
        <>
            <header>
                <TopbarUsuarios />
            </header>
            <main className="conteudo-pagina-funcionario">
                <section className="pos-cabecalho-funcionario">
                    <h1 id="saudacao-user">Olá, nome!</h1>
                    <h4 id="sugestao-user">Aqui está um resumo do dia</h4>
                    <div className="info-hospital">
                        {
                            cardsFuncionario.map(cf =>
                                <article className="cards-info-hospital">
                                    <ComponenteCard titulo={cf.titulo} descricao={cf.descricao} icone={cf.icone} cor={cf.cor} />
                                </article>
                            )
                        }
                    </div>
                </section>
                <h2>Estoque {hospital?.nome}</h2>
                <ul>

                    {estoque.map(e =>
                        <li key={e.id}>
                            {e.nome} é
                            {e.descricao},
                            no nosso estoque ele contém a dosagem de {e.dosagem}ml e
                            {e.quantidade} unidades
                        </li>

                    )}
                </ul>
                <h2>Pacientes</h2>
            </main>
        </>
    )
}