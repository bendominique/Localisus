import { NavLink } from "react-router-dom";
import "./NavbarLembretes.css"
import { ComponenteCard } from "./Cards";

export const NavbarLembretes = () => {
    const cardMedicamentosAtivo = [
        { titulo: "Dipirona 500mg", descricao: "Tomar 1 comprimido a cada 8 horas", cor: "#ff0000ff" }
    ]

    return (
        <>
            <NavLink to="/lembretes/ativos" className="lembretes-nav">
                <li id="ativos-navbar">Ativos</li>
            </NavLink>
            {
                cardMedicamentosAtivo.map((cmA, index) =>
                    <article key={index} className="medicamentos-ativos">
                        <ComponenteCard titulo={cmA.titulo} descricao={cmA.descricao} cor={cmA.cor}/>
                    </article>
                )

            }
        </>
    )
}