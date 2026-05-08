import { createContext, useState, useContext, ReactNode, useEffect} from 'react';
import { authService } from '../services/authService';
import { TipoUsuario, Usuario } from '../mocks/usuarioMock'


interface AuthContextData {
    usuario: Usuario | null; 
    login: (cpf: string, senha: string) => Promise<void>;
    logout: () => void;
    register: (nome: string, cpf: string, email: string, senha: string, tipo: TipoUsuario, hospitalId: number | null) => Promise<void>
}

const AuthContext = createContext<AuthContextData> ({} as AuthContextData);

export const AuthProvider = ({ children }: { children: ReactNode }) => {

    //é um hook onde o seu elemento interno é a primeira coisa que inicializa
    //no momento em que a tela renderiza
    useEffect(() => {
        //realizando uma busca no nosso HD -> HardDisk, aquele que guarda todos os dados da memória do nosso PC
        //procura a chave 
        const usuarioSalvo = localStorage.getItem('@localisus:usuario')

        if(usuarioSalvo) { //caso encontre algum usuário em memória, vai enviar em JSON.parse, transformando ele em objeto
            setUsuario(JSON.parse(usuarioSalvo))

        }
    }, []) //permite que inicialize apenas no momento em que a tela renderiza

    const [usuario, setUsuario] = useState<Usuario | null>(null)

    const login = async (cpf: string, senha: string) => {
        const usuarioEncontrado = await authService.login(cpf, senha)
        setUsuario(usuarioEncontrado)

        localStorage.setItem('@localisus:usuario', JSON.stringify(usuarioEncontrado))
    }

const logout = () => {
    setUsuario(null)
    //tira da memória
    localStorage.removeItem('@localisus:usuario')
}

const register = async (nome: string, cpf: string, email: string, senha: string, tipo: TipoUsuario, hospitalId: number | null) => {
    try {
 
    const novoUsuario = await authService.register(nome, cpf, email, senha, tipo, hospitalId)
     setUsuario(novoUsuario)

     localStorage.setItem('@localisus:usuario', JSON.stringify(novoUsuario))
    } catch (error: any) {
        console.error("Erro ao registrar novo usuário", error.message)
    }
   
}

return (
    <AuthContext.Provider value ={{ usuario, login, logout, register }}>
        {children}
    </AuthContext.Provider>
)
}

export const useAuth = () => {
    return useContext(AuthContext)
}
