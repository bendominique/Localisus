export default function TelaHomeUsuario(){
const nomeSalvo = localStorage.getItem('usuarioNome');

useEffect(() => {
        const nomeSalvo = localStorage.getItem('usuarioNome');
        
        if (nomeSalvo) {
            setNomeUsuario(nomeSalvo);
        }
    }, []);

    return(
        <>
        <h1>
            ${`Olá ${nomenomeSalvo}}`}
        </h1>
        </>
    )
}