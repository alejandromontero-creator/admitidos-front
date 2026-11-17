import { useCallback, useEffect, useState } from "react";

import { api } from "./api.js";

export function useCrud(recurso) {
  const [lista, setLista] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  const recargar = useCallback(async () => {
    try {
      setLista(await api(`/${recurso}/show`));
      setError("");
    } catch (e) {
      setError(e.message);
    } finally {
      setCargando(false);
    }
  }, [recurso]);

  useEffect(() => {
    recargar();
  }, [recargar]);

  async function guardar(datos, id) {
    if (id) await api(`/${recurso}/update/${id}`, { method: "PUT", body: datos });
    else await api(`/${recurso}/create`, { method: "POST", body: datos });
    await recargar();
  }

  async function eliminar(id) {
    await api(`/${recurso}/delete/${id}`, { method: "DELETE" });
    await recargar();
  }

  return { lista, cargando, error, setError, guardar, eliminar };
}
