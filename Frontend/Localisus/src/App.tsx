import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { Admin } from './pages/Admin'
import { Cadastro} from './pages/Cadastro'
import { Login} from './pages/Login'

export function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route 
                        path="/admin" 
                        element={<Admin />}
                        />
                         <Route 
                        path="/cadastro" 
                        element={<Cadastro />}
                        /> 
                        <Route 
                        path="/login" 
                        element={<Login />}
                        />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    )
}