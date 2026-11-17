# Admitidos - Frontend

Frontend en React (Vite) del sistema de admitidos. Consume la API del repositorio
[Admitidos-back](https://github.com/alejandromontero-creator/Admitidos-back).

## Roles

- **admin**: gestiona facultades, programas y estudiantes, y crea las cuentas de los estudiantes.
- **estudiante**: inicia sesión y consulta su perfil.

## Cómo correrlo

1. Tener la API corriendo (`npm run dev` en Admitidos-back).
2. Copiar `.env.example` a `.env` y ajustar `VITE_API_URL` si la API usa otra dirección.
3. Instalar y arrancar:

```
npm install
npm run dev
```

4. Abrir http://localhost:5173
