import { useState } from "react";

import { useCrud } from "../useCrud.js";

const VACIO = { nombre: "", facultad: "" };

export default function Programas() {
  const { lista, cargando, error, setError, guardar, eliminar } = useCrud("programas");
  const { lista: facultades } = useCrud("facultades");
  const [form, setForm] = useState(VACIO);
  const [editando, setEditando] = useState(null);

  function cambiar(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function limpiar() {
    setForm(VACIO);
    setEditando(null);
  }

  function editar(p) {
    setEditando(p._id);
    setForm({ nombre: p.nombre, facultad: p.facultad?._id ?? p.facultad });
  }

  async function enviar(e) {
    e.preventDefault();
    try {
      await guardar(form, editando);
      limpiar();
    } catch (err) {
      setError(err.message);
    }
  }

  async function borrar(p) {
    if (!window.confirm(`¿Eliminar "${p.nombre}"?`)) return;
    try {
      await eliminar(p._id);
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <section>
      <h2>Programas</h2>

      <form className="formulario" onSubmit={enviar}>
        <input name="nombre" placeholder="Nombre del programa" value={form.nombre} onChange={cambiar} required />
        <select name="facultad" value={form.facultad} onChange={cambiar} required>
          <option value="">Facultad...</option>
          {facultades.map((f) => <option key={f._id} value={f._id}>{f.nombre}</option>)}
        </select>
        <button className="btn btn-principal">{editando ? "Guardar cambios" : "Crear"}</button>
        {editando && <button type="button" className="btn btn-suave" onClick={limpiar}>Cancelar</button>}
      </form>

      {error && <p className="alerta">{error}</p>}

      {cargando ? <p className="sutil">Cargando...</p> : (
        <table className="tabla">
          <thead><tr><th>Programa</th><th>Facultad</th><th></th></tr></thead>
          <tbody>
            {lista.map((p) => (
              <tr key={p._id}>
                <td>{p.nombre}</td>
                <td className="sutil">{p.facultad?.nombre ?? "—"}</td>
                <td className="acciones">
                  <button className="btn btn-suave" onClick={() => editar(p)}>Editar</button>
                  <button className="btn btn-peligro" onClick={() => borrar(p)}>Eliminar</button>
                </td>
              </tr>
            ))}
            {lista.length === 0 && <tr><td colSpan="3" className="vacio">Todavía no hay programas</td></tr>}
          </tbody>
        </table>
      )}
    </section>
  );
}
