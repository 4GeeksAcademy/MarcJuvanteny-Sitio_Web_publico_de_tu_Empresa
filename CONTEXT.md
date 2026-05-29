
## Contexto de la Aplicación: Talent Pipeline Tracker

Talent Pipeline Tracker es una aplicación web desarrollada con Next.js orientada a la gestión de procesos de selección de talento. Permite a los equipos de recursos humanos y reclutadores visualizar, crear, editar y hacer seguimiento de candidaturas a través de diferentes etapas del pipeline de selección (postulación, revisión, entrevista, oferta, contratación y rechazo).

La aplicación se conecta a una API externa para obtener y actualizar la información de los candidatos. En modo desarrollo, si la API no está disponible, utiliza datos simulados (mock) para garantizar la continuidad del desarrollo de la interfaz. En producción, siempre opera contra la API real.

Entre las funcionalidades principales se incluyen:
- Listado y búsqueda de candidatos.
- Visualización de detalles y notas de cada candidato.
- Creación y edición de registros de candidatos.
- Gestión de estados y etapas del proceso de selección.

## Principales Funcionalidades de la Aplicación

1. Gestión de candidatos de extremo a extremo
- Alta de nuevos candidatos con datos clave: nombre, contacto, posición, perfil profesional y enlaces relevantes.
- Edición de la información de candidatos ya existentes.
- Consulta de historial y datos actualizados por registro.

2. Pipeline de reclutamiento por etapas
- Seguimiento del candidato durante todo el proceso: applied, review, interview, offer, hired y rejected.
- Cambio de estado y etapa para reflejar el avance real del proceso de selección.

3. Vista de listado con foco operativo
- Listado centralizado para visualizar el conjunto de candidaturas.
- Búsqueda y navegación rápida para localizar perfiles de forma eficiente.

4. Vista de detalle del candidato
- Acceso a información completa del candidato en una pantalla dedicada.
- Visualización de notas asociadas al proceso para mantener contexto entre reclutadores.

5. Integración con API externa y resiliencia en desarrollo
- Consumo de API REST para operaciones de lectura y actualización de candidatos.
- Fallback automático a datos mock cuando la API no está disponible en entorno de desarrollo.

6. Base preparada para evolución
- Arquitectura modular con páginas y componentes reutilizables.
- Estructura lista para incorporar validaciones avanzadas, autenticación, métricas y automatizaciones de hiring.

Esta herramienta está pensada para optimizar el flujo de trabajo de reclutamiento, centralizando la información y facilitando la colaboración entre los miembros del equipo.

---

## Stack Tecnológico

- **Framework principal:** Next.js (v16, App Router)
- **Lenguaje:** TypeScript
- **Frontend:** React 19, CSS Modules, PostCSS, TailwindCSS
- **Backend:** API REST externa (mock en desarrollo, real en producción)
- **Gestión de dependencias:** npm (monorepo)
- **Linting y calidad:** ESLint, configuración específica para Next.js y TypeScript
- **Testing:** (puede ser ampliado según necesidades)
- **Documentación:** Markdown

---

Este contexto y stack pueden ampliarse o adaptarse según los requisitos de la empresa o el reto asignado.
