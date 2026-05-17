import { User2Icon } from "lucide-react"
import { Sidebar } from "./Sidebar"
import "./TopbarUsuario.css"

export const TopbarUsuarios = () => {

    const topBarIcones = [
        { icone: User2Icon }
    ]

    return (
        <>
            <div className="elementos-cabecalho">
                <Sidebar />
                <ul className="elementos-usuario">
                    {

                        topBarIcones.map(i => (
                            <li className="icone">
                                [i.icone]
                            </li>
                        )
                        )
                    }
                </ul>
            </div>
        </>
    )
}