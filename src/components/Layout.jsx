import { NavLink, Outlet, useNavigate } from "react-router-dom";

import { useAuth } from "../AuthContext.jsx";

export default function Layout() {
  const { sesion, logout } = useAuth();
  const navigate = useNavigate();

  function salir() {
    logout();
    navigate("/login");
  }

  return (
    <div className="app">
      <header className="barra">
        <div className="marca">
          <span className="marca-sello">A</span>
          <span>Admitidos UCP</span>
        </div>

        <nav className="menu">
          {sesion.rol === "admin" ? (
            <>
              <NavLink to="/admin/facultades">Facultades</NavLink>
              <NavLink to="/admin/programas">Programas</NavLink>
              <NavLink to="/admin/estudiantes">Estudiantes</NavLink>
            </>
          ) : (
            <NavLink to="/mi-perfil">Mi perfil</NavLink>
          )}
        </nav>

        <div className="usuario">
          <span className="usuario-correo">{sesion.correo}</span>
          <span className={`rol rol-${sesion.rol}`}>{sesion.rol}</span>
          <button className="btn btn-suave" onClick={salir}>Salir</button>
        </div>
      </header>

      <main className="contenido">
        <Outlet />
      </main>
    </div>
  );
}
