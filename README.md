# Rickipedia — Frontend (Rick and Morty API)

Frontend en React + TypeScript que consume el backend de Rickipedia:
login/registro con JWT, y listado + detalle de characters, locations y
episodes del universo de Rick and Morty, con búsqueda, paginación y
rutas protegidas.

## Stack

- React + TypeScript (Vite)
- React Router (rutas y rutas protegidas)
- Axios (cliente HTTP con interceptor de token)
- jwt-decode (validar expiración del JWT guardado en `localStorage`)

## Instalación

1. Instala dependencias:
```bash
npm install
```

Variables necesarias (ver `.env.example`):

| Variable | Descripción |
|---|---|
| `VITE_API_URL` | URL base del backend (ej. `http://localhost:3000/api`) |

3. Asegúrate de que el backend ya esté corriendo y con los datos cargados
   (`POST /api/seed`), o el login y los listados no van a tener nada que mostrar.

## Correr en desarrollo

```bash
npm run dev
```

Por defecto Vite lo levanta en `http://localhost:5173`.

## Pruebas
