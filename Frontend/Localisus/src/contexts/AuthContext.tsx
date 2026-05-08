import { createContext, useState, useContext, ReactNode} from 'react';
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
    const [usuario, setUsuario] = useState<Usuario | null>(null)

    const login = async (cpf: string, senha: string) => {
        const userEncontrado = await authService.login(cpf, senha)
        setUsuario(userEncontrado)
    }

const logout = () => {
    setUsuario(null)
}

const register = async (nome: string, cpf: string, email: string, senha: string, tipo: TipoUsuario, hospitalId: number | null) => {
    try {
 
    const novoUsuario = await authService.register(nome, cpf, email, senha, tipo, hospitalId)
     setUsuario(novoUsuario)

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
