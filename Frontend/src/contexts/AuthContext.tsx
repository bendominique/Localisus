import { createContext, useState, useContext, ReactNode} from 'react';
import { authService } from '../services/authService';
import { Usuario } from '../mocks/usuarioMock'

//aqui estamos especificando para a nossa aplicação tudo aquilo que a nossa context de autenticação deve transmitir
//uma interface dos dados que serão transmitidos
//dados do usuário, podendo ser um objeto para usuários logados ou então null para visitantes da página
//função de login e função de logout
interface AuthContextData {
    usuario: Usuario | null; 
    login: (cpf: string) => Promise<void>;
    logout: () => void;
}

//essa é a criação do nosso contexto, é uma conexão que permite o sistema compreender
//que esse contexto está seguindo todas as regras presentes na AuthContextData, então ele começa como um objeto
//vazio em {} mas que representa através do "as" todas as regras presentes em nossa interface
const AuthContext = createContext<AuthContextData> ({} as AuthContextData);

//aqui é o nosso componente provedor, recebe a propriedade de children, representando toda a nossa aplicação,
//então o useState começa a trabalhar para criar uma memória do usuário que está logado, para evitar que numa
//recarga de tela todos os dados sumam, com o children lá dentro, permitimos que sejam diversos elementos diferentes, basta declaramos em outro momento da aplicação
export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [usuario, setUsuario] = useState<Usuario | null>(null)

    const login = async (cpf: string) => {
        const userEncontrado = await authService.login(cpf);
        setUsuario(userEncontrado)
    }

const logout = () => {
    setUsuario(null)
}

return (
    <AuthContext.Provider value ={{ usuario, login, logout }}>
        {children}
    </AuthContext.Provider>
)
}

//aqui é a criação de um Hook Customizado, ele está utilizando o nosso Hook nativo que é o useContext para 
//compreender como a nossa implementação funciona e verificar qual espécie de usuário está tentando acessar o sistema 
export const useAuth = () => {
    return useContext(AuthContext)
}
