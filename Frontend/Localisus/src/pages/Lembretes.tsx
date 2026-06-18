import { NavLink } from "react-router-dom"
import { NavbarLembretes } from "../components/NavbarLembretes"
import "./Lembretes.css"

export const Lembretes = () => {
    return (
        <>
            <h2> Meus Lembretes</h2>
            <p>Gerencie seus lembretes de medicamentos. </p>
            
            <NavLink to="/lembretes/ativos" className="lembretes-nav">
                <li id="ativos-navbar">Ativos</li>
            </NavLink>  
            <div className="lembretes-elementos">
            <NavbarLembretes/>
            </div>
            </>
    )
}