import Navbar from "../components/Navbar"

export const UsuarioComum = () => {

    return(
        <>
        <Navbar elementos={[
            {
                id: 'primeiro',
                titulo: 'Primeiro',
                conteudo: <p> Esse é o primeiro</p>
            },
            {
                id: 'segundo',
                titulo: 'Segundo',
                conteudo: <p> Esse é o segundo </p>
            }

        ]}
        />
    </>
    )
}

