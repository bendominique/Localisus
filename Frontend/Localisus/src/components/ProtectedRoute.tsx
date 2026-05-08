//permitimos que sejam feita uma navegação entre as telas
import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { TipoUsuario } from '../mocks/usuarioMock'
import { JSX } from 'react'

//agora é criada uma interface para definir a segurança para não permitir que qualquer pessoa acesse a página
interface ProtectedRouteProps {
    children: JSX.Element; //essa children representa apenas as páginas que podem acessar o conteúdo presente na rota 
    allowedRoles: TipoUsuario[] //aqui estão listados os tipos de usuários que podem acessar a rota
    
}

//aqui temos a nossa função principal, está fazendo com que a nossa variável usuário passe pelos parâmetros presentes
//na hook de autenticação, caso não seja o usuário ele retorna para a página de login, mas caso ele não tenha as permissões retorna um unauthorized
//se tudo der certo, funciona
export const ProtectedRoute = ({ children, allowedRoles}: ProtectedRouteProps) => {
    const {usuario} = useAuth()

    if (!usuario) {
        return <Navigate to="/login" replace />
    }

    //o includes faz a verificação se o tipo que o usuário logado tenta acessar está presente no nosso array
    //caso não esteja incluso já era
    if (!allowedRoles.includes(usuario.tipoUsuario)) {
        return <Navigate to="/unauthorized" replace />
    }

    return children
}