import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import { HospitalProvider } from "./Context/HospitalContext";

import MapaMedicamentos from "../src/Components/MapaMedicamentos";
import TelaCadastro from "./Paginas/TelaCadastro/TelaCadastro"
import TelaLogin from "./Paginas/TelaLogin/TelaLogin";
import TelaHome from "./Paginas/TelaHome/TelaHome";
import TelaHomeUsuario from "./Paginas/TelaHomeUsuario/TelaHomeUsuario";
import TelaHomeFuncionario from "./Paginas/TelaHomeProfissional/TelaHomeProfissional"
import TelaHomeAdm from "./Paginas/TelaHomeAdm/TelaHomeAdm"


function App() {
  return (
    <HospitalProvider>
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
            path="/mapa"
            element={<MapaMedicamentos />}
          />
          <Route
            path="/home-funcionario"
            element={<TelaHomeFuncionario/>}
          />
           <Route
            path="/home-adm"
            element={<TelaHomeAdm/>}
          />
          <Route
            path="/home-usuario"
            element={<TelaHomeUsuario />}
          />

        </Routes>
      </BrowserRouter>
    </HospitalProvider>

  );
}

export default App;