import { useState } from "react";

import { useCrud } from "../useCrud.js";

export default function Facultades() {
  const { lista, cargando, error, setError, guardar, eliminar } = useCrud("facultades");
  const [nombre, setNombre] = useState("");
  const [editando, setEditando] = useState(null);

  function limpiar() {
    setNombre("");
    setEditando(null);
  }

  async function enviar(e) {
    e.preventDefault();
    try {
      await guardar({ nombre }, editando);
      limpiar();
    } catch (err) {
      setError(err.message);
    }
  }

  async function borrar(f) {
    if (!window.confirm(`¿Eliminar "${f.nombre}"?`)) return;
    try {
      await eliminar(f._id);
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <section>
      <h2>Facultades</h2>

      <form className="formulario" onSubmit={enviar}>
        <input placeholder="Nombre de la facultad" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
        <button className="btn btn-principal">{editando ? "Guardar cambios" : "Crear"}</button>
        {editando && <button type="button" className="btn btn-suave" onClick={limpiar}>Cancelar</button>}
      </form>

      {error && <p className="alerta">{error}</p>}

      {cargando ? <p className="sutil">Cargando...</p> : (
        <table className="tabla">
          <thead><tr><th>Nombre</th><th></th></tr></thead>
          <tbody>
            {lista.map((f) => (
              <tr key={f._id}>
                <td>{f.nombre}</td>
                <td className="acciones">
                  <button className="btn btn-suave" onClick={() => { setEditando(f._id); setNombre(f.nombre); }}>Editar</button>
                  <button className="btn btn-peligro" onClick={() => borrar(f)}>Eliminar</button>
                </td>
              </tr>
            ))}
            {lista.length === 0 && <tr><td colSpan="2" className="vacio">Todavía no hay facultades</td></tr>}
          </tbody>
        </table>
      )}
    </section>
  );
}
