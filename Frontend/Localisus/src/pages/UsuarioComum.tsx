import Navbar from "../components/Navbar"
import { Cards } from "../components/Cards"
import { CardData } from "../components/Cards"
import { ComponenteCard } from "../components/Cards"
import { BarraPesquisa } from "../components/BarraPesquisa"
import { MapaLocalisus } from "../components/MapaLocalisus"

const elementosCard: CardData[] = [
    { id: 1, titulo: "dads", descricao: "" }
]


export const UsuarioComum = () => {

    return (
        <>
            <header>

            </header>
            <main>
                <h1>Olá </h1>
                <div className="componentes-centro">
                    <ComponenteCard titulo="Meus medicamentos" descricao="Acompanhe seus e remédios e receba lembretes" />
                    <ComponenteCard titulo="Postos próximos" descricao="Veja unidades de saúde perto de você" />
                    <ComponenteCard titulo="Disponibilidade" descricao="Confira a disponibilidade em tempo real" />
                    <ComponenteCard titulo="Como funciona" descricao="Entenda como encontrar seu medicamento" />
                </div>
                <div className="componentes-lateral-direita">
                    <ComponenteCard titulo="Locali" descricao="Assistente virtual do localisus" />
                    <ComponenteCard titulo="Lembretes" descricao="" />
                    <ComponenteCard titulo="Seu histórico" descricao="histórico medicamentos"/>
                </div>
            </main>
        </>
    )
}

