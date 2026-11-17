import { Navigate, Route, Routes } from "react-router-dom";

import { useAuth } from "./AuthContext.jsx";
import Layout from "./components/Layout.jsx";
import RutaProtegida from "./components/RutaProtegida.jsx";
import Login from "./pages/Login.jsx";
import Facultades from "./pages/Facultades.jsx";
import Programas from "./pages/Programas.jsx";
import Estudiantes from "./pages/Estudiantes.jsx";
import MiPerfil from "./pages/MiPerfil.jsx";

function Inicio() {
  const { sesion } = useAuth();
  if (!sesion) return <Navigate to="/login" replace />;
  return <Navigate to={sesion.rol === "admin" ? "/admin/facultades" : "/mi-perfil"} replace />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Inicio />} />

      <Route element={<RutaProtegida rol="admin"><Layout /></RutaProtegida>}>
        <Route path="/admin/facultades" element={<Facultades />} />
        <Route path="/admin/programas" element={<Programas />} />
        <Route path="/admin/estudiantes" element={<Estudiantes />} />
      </Route>

      <Route element={<RutaProtegida rol="estudiante"><Layout /></RutaProtegida>}>
        <Route path="/mi-perfil" element={<MiPerfil />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
