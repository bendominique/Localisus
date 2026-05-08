import { createContext, useState, useContext, ReactNode} from 'react';
import { authService } from '../services/authService';
import { usuarioMock, TipoUsuario, Usuario } from '../mocks/usuarioMock'


interface AuthContextData {
    usuario: Usuario | null; 
    login: (cpf: string) => Promise<void>;
    logout: () => void;
    register: (nome: string, cpf: string, email: string, tipo: TipoUsuario, hospitalId: number) => Promise<void>
}

const AuthContext = createContext<AuthContextData> ({} as AuthContextData);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [usuario, setUsuario] = useState<Usuario | null>(null)

    const login = async (cpf: string) => {
        const userEncontrado = await authService.login(cpf);
        setUsuario(userEncontrado)
    }

const logout = () => {
    setUsuario(null)
}

const register = async (nome: string, cpf: string, email: string, tipo: TipoUsuario, hospitalId: number) => {
    try {
 
    const novoUsuario = await authService.register(nome, cpf, email, tipo, hospitalId)
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
