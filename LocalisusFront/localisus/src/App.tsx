import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import TelaCadastro from "./Paginas/TelaCadastro/TelaCadastro"
import TelaLogin from "./Paginas/TelaLogin/TelaLogin";
import TelaHome from "./Paginas/TelaHome/TelaHome";
import TelaHomeUsuario from "./Paginas/TelaHomeUsuario/TelaHomeUsuario";

function App() {
  return (
    <BrowserRouter>
      <Routes>
{/* Através de BrowserRoutes, conseguimos definir os endereços de rotas com seus respectivos apelidos para realizarmos as navegações entre páginas */}
        
        <Route
          path="/"
          element={<TelaHome />}
        />
        <Route
          path="/cadastro"
          element={<TelaCadastro />}
        />
        <Route
          path="/login"
          element={<TelaLogin />}
        />
        <Route
          path="/home-usuario"

          element={<TelaHomeUsuario/>}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;