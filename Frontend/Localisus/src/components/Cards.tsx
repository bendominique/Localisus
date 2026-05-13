import "./Card.css"

interface Card {
    id: number,
    titulo: string,
    descricao: string
}

const elementosCard: Card[] = [
    {id: 1, titulo: "Buscar medicamentos", descricao: "Encontre os seus medicamentos através do nome, comercial ou técnico."},
    {id: 2, titulo: "Localizar postos", descricao: "Visualize os postos de saúde próximos a você que possuem o medicamento que precisa."},
    {id: 3, titulo: "Veja rotas", descricao: "Saiba qual é a rota mais rápida entre você e o seu medicamento com apenas um clique."},
    {id: 4, titulo: "Cuide da saúde", descricao: "Tenha mais controle, acompanhe e gerencie consultas e medicamentos. "}
]


export const Cards = () => {
    return(
        <>
            <div className="cards">
                {
                    elementosCard.map( e => 
                        <div key={e.id} className="descricao-cards">
                            <h1> {e.titulo} </h1>
                            <p> {e.descricao} </p>
                        </div>
                    )
                }
            </div>
        </>
    )    
}