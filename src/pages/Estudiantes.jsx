import { useState } from "react";

import { api } from "../api.js";
import { useCrud } from "../useCrud.js";

const VACIO = { nombre: "", apellido: "", documento: "", correo: "", programa: "", estado: "pendiente" };

export default function Estudiantes() {
  const { lista, cargando, error, setError, guardar, eliminar } = useCrud("estudiantes");
  const { lista: programas } = useCrud("programas");
  const [form, setForm] = useState(VACIO);
  const [editando, setEditando] = useState(null);
  const [aviso, setAviso] = useState("");

  function cambiar(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function limpiar() {
    setForm(VACIO);
    setEditando(null);
  }

  function editar(est) {
    setEditando(est._id);
    setForm({
      nombre: est.nombre,
      apellido: est.apellido,
      documento: est.documento,
      correo: est.correo,
      programa: est.programa?._id ?? est.programa,
      estado: est.estado
    });
  }

  async function enviar(e) {
    e.preventDefault();
    setAviso("");
    try {
      await guardar(form, editando);
      limpiar();
    } catch (err) {
      setError(err.message);
    }
  }

  async function borrar(est) {
    if (!window.confirm(`¿Eliminar a ${est.nombre} ${est.apellido}?`)) return;
    try {
      await eliminar(est._id);
    } catch (err) {
      setError(err.message);
    }
  }

  async function crearCuenta(est) {
    const password = window.prompt(`Contraseña para ${est.correo} (mínimo 6 caracteres):`);
    if (!password) return;
    setAviso("");
    try {
      await api("/auth/usuarios", { method: "POST", body: { estudiante: est._id, password } });
      setError("");
      setAviso(`Cuenta creada. ${est.nombre} ya puede entrar con ${est.correo}`);
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <section>
      <h2>Estudiantes</h2>

      <form className="formulario rejilla" onSubmit={enviar}>
        <input name="nombre" placeholder="Nombre" value={form.nombre} onChange={cambiar} required />
        <input name="apellido" placeholder="Apellido" value={form.apellido} onChange={cambiar} required />
        <input name="documento" placeholder="Documento" value={form.documento} onChange={cambiar} required />
        <input name="correo" type="email" placeholder="Correo" value={form.correo} onChange={cambiar} required />
        <select name="programa" value={form.programa} onChange={cambiar} required>
          <option value="">Programa...</option>
          {programas.map((p) => <option key={p._id} value={p._id}>{p.nombre}</option>)}
        </select>
        <select name="estado" value={form.estado} onChange={cambiar}>
          <option value="pendiente">Pendiente</option>
          <option value="admitido">Admitido</option>
          <option value="rechazado">Rechazado</option>
        </select>
        <div className="formulario-botones">
          <button className="btn btn-principal">{editando ? "Guardar cambios" : "Crear"}</button>
          {editando && <button type="button" className="btn btn-suave" onClick={limpiar}>Cancelar</button>}
        </div>
      </form>

      {error && <p className="alerta">{error}</p>}
      {aviso && <p className="exito">{aviso}</p>}

      {cargando ? <p className="sutil">Cargando...</p> : (
        <table className="tabla">
          <thead>
            <tr><th>Estudiante</th><th>Documento</th><th>Programa</th><th>Estado</th><th></th></tr>
          </thead>
          <tbody>
            {lista.map((est) => (
              <tr key={est._id}>
                <td>
                  {est.nombre} {est.apellido}
                  <div className="sutil">{est.correo}</div>
                </td>
                <td>{est.documento}</td>
                <td className="sutil">{est.programa?.nombre ?? "—"}</td>
                <td><span className={`estado estado-${est.estado}`}>{est.estado}</span></td>
                <td className="acciones">
                  <button className="btn btn-suave" onClick={() => crearCuenta(est)}>Crear cuenta</button>
                  <button className="btn btn-suave" onClick={() => editar(est)}>Editar</button>
                  <button className="btn btn-peligro" onClick={() => borrar(est)}>Eliminar</button>
                </td>
              </tr>
            ))}
            {lista.length === 0 && <tr><td colSpan="5" className="vacio">Todavía no hay estudiantes</td></tr>}
          </tbody>
        </table>
      )}
    </section>
  );
}
