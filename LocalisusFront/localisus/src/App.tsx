import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import TelaCadastro from "./Paginas/TelaCadastro/TelaCadastro"
import TelaLogin from "./Paginas/TelaLogin/TelaLogin";

function App() {
  return (
    <BrowserRouter>
      <Routes>
{/* Através de BrowserRoutes, conseguimos definir os endereços de rotas com seus respectivos apelidos para realizarmos as navegações entre páginas */}
        <Route
          path="/cadastro"
          element={<TelaCadastro />}
        />
        <Route
          path="/login"
          element={<TelaLogin />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;