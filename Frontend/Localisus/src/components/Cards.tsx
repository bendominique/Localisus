import "./Card.css"

interface CardData {
    id: number,
    titulo: string,
    descricao: string
}

interface CardProps {
    titulo: string,
    descricao: string
}

const elementosCard: CardData[] = [
    {id: 1, titulo: "Buscar medicamentos", descricao: "Encontre os seus medicamentos através do nome, comercial ou técnico."},
    {id: 2, titulo: "Localizar postos", descricao: "Visualize os postos de saúde próximos a você que possuem o medicamento que precisa."},
    {id: 3, titulo: "Veja rotas", descricao: "Saiba qual é a rota mais rápida entre você e o seu medicamento com apenas um clique."},
    {id: 4, titulo: "Cuide da saúde", descricao: "Tenha mais controle, acompanhe e gerencie consultas e medicamentos. "}
]

function ComponenteCard({
    titulo,
    descricao
}: CardProps) {
    return(
        <div>
            <h1>{titulo}</h1>
            <p>{descricao}</p>
        </div>
    )
}

export const Cards = () => {
    return(
        <>
            <div className="cards">
                {
                    elementosCard.map( e => 
                        <div key={e.id} className="descricao-cards">
                            <ComponenteCard
                               titulo={e.titulo}
                                descricao={e.descricao}
                            />
                        </div>
                    )
                }
            </div>
        </>
    )    
}