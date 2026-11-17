import { useEffect, useState } from "react";

import { api } from "../api.js";

export default function MiPerfil() {
  const [perfil, setPerfil] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api("/estudiantes/mi-perfil").then(setPerfil).catch((e) => setError(e.message));
  }, []);

  if (error) return <p className="alerta">{error}</p>;
  if (!perfil) return <p className="sutil">Cargando...</p>;

  return (
    <section className="perfil">
      <div className="perfil-cabecera">
        <span className="perfil-inicial">{perfil.nombre[0]}</span>
        <div>
          <h2>{perfil.nombre} {perfil.apellido}</h2>
          <span className={`estado estado-${perfil.estado}`}>{perfil.estado}</span>
        </div>
      </div>

      <dl className="perfil-datos">
        <dt>Documento</dt><dd>{perfil.documento}</dd>
        <dt>Correo</dt><dd>{perfil.correo}</dd>
        <dt>Programa</dt><dd>{perfil.programa?.nombre ?? "—"}</dd>
        <dt>Facultad</dt><dd>{perfil.programa?.facultad?.nombre ?? "—"}</dd>
      </dl>
    </section>
  );
}
