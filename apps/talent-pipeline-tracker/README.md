## Talent Pipeline Tracker

Aplicacion Next.js (App Router) para gestionar candidaturas conectadas a una API externa.

## Getting Started

1. Crea un archivo `.env.local` en esta carpeta con la URL de tu API:

```bash
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001
```

2. Levanta el proyecto:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

3. Abre [http://localhost:3000](http://localhost:3000).

## Nota sobre desarrollo

Si la API no esta disponible en desarrollo, el listado y detalle usan datos mock para que puedas continuar construyendo la interfaz. En produccion siempre se usa la API real.

## Scripts

- `npm run dev`: modo desarrollo
- `npm run build`: build de produccion
- `npm start`: correr build
- `npm run lint`: validar codigo
