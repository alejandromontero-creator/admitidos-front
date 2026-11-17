import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

import { useAuth } from "../AuthContext.jsx";

export default function Login() {
  const { sesion, login } = useAuth();
  const navigate = useNavigate();
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [enviando, setEnviando] = useState(false);

  if (sesion) return <Navigate to="/" replace />;

  async function entrar(e) {
    e.preventDefault();
    setError("");
    setEnviando(true);
    try {
      await login(correo, password);
      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setEnviando(false);
    }
  }

  return (
    <div className="login">
      <form className="login-tarjeta" onSubmit={entrar}>
        <span className="marca-sello grande">A</span>
        <h1>Admitidos UCP</h1>
        <p className="sutil">Inicia sesión para continuar</p>

        <label>
          Correo
          <input type="email" value={correo} onChange={(e) => setCorreo(e.target.value)} required autoFocus />
        </label>
        <label>
          Contraseña
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </label>

        {error && <p className="alerta">{error}</p>}

        <button className="btn btn-principal" disabled={enviando}>
          {enviando ? "Entrando..." : "Entrar"}
        </button>
      </form>
    </div>
  );
}
