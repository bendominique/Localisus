//permitimos que sejam feita uma navegação entre as telas
import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { TipoUsuario } from '../mocks/usuarioMock'
import { JSX } from 'react'


interface ProtectedRouteProps {
    children: JSX.Element; 
    allowedRoles: TipoUsuario[] 
    
}


export const ProtectedRoute = ({ children, allowedRoles}: ProtectedRouteProps) => {
    const {usuario} = useAuth()

    if (!usuario) {
        return <Navigate to="/login" replace />
    }

    if (!allowedRoles.includes(usuario.tipoUsuario)) {
        return <Navigate to="/unauthorized" replace />
    }

    return children
}