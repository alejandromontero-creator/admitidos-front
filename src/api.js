const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000/api";

function leerToken() {
  try {
    return JSON.parse(localStorage.getItem("sesion"))?.token ?? null;
  } catch {
    return null;
  }
}

export async function api(ruta, { method = "GET", body } = {}) {
  const token = leerToken();
  const headers = { "Content-Type": "application/json" };
  if (token) headers.Authorization = `Bearer ${token}`;

  let res;
  try {
    res = await fetch(`${API_URL}${ruta}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined
    });
  } catch {
    throw new Error("No se pudo conectar con la API. ¿Está encendida?");
  }

  const json = await res.json().catch(() => ({}));

  if (res.status === 401 && token) {
    localStorage.removeItem("sesion");
    window.location.href = "/login";
  }
  if (!res.ok) throw new Error(json.message ?? "Ocurrió un error");
  return json.data;
}
