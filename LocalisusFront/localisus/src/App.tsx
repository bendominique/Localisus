import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import TelaHome from "../Paginas/TelaHome/TelaHome";
import Login from "../Paginas/TelaLogin/TelaLogin";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={<TelaHome />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;