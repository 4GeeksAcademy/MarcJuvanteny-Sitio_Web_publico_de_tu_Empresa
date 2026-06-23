# Estandares propuestos de calidad

## Proposito
Definir reglas operativas para el equipo con tres elementos obligatorios por regla: nombre, alcance y razon.

## Reglas

### Regla A1 - Capa API unica
- Nombre: Capa API unica
- Alcance: todas las llamadas HTTP de la aplicacion (componentes, hooks, servicios y acciones).
- Razon: centralizar requests reduce inconsistencias en headers, errores y cache, y preserva el patron de mantenibilidad actual.

### Regla A2 - Tipado estricto en respuestas HTTP
- Nombre: Tipado estricto en respuestas HTTP
- Alcance: funciones de la capa API y tipos de retorno de operaciones CRUD.
- Razon: evitar casteos inseguros (ejemplo: undefined as T) reduce fallos silenciosos y mantiene la seguridad de tipos.

### Regla A3 - Fuente unica para estados y etapas
- Nombre: Fuente unica de estados
- Alcance: formularios, filtros, detalle de candidato y cualquier regla de negocio asociada a status/stage.
- Razon: elimina duplicidad de constantes, evita divergencias semanticas y conserva coherencia funcional.

### Regla N1 - Naming de dominio explicito
- Nombre: Naming de dominio explicito
- Alcance: tipos, interfaces, DTOs, entidades y funciones de negocio.
- Razon: nombres claros orientados al dominio mejoran legibilidad, onboarding y comunicacion tecnica.

### Regla N2 - Convenciones unificadas de nombres
- Nombre: Convenciones de naming unificadas
- Alcance: todo el repositorio (codigo app, utilidades y documentacion tecnica).
- Razon: consistencia de nombres reduce friccion de colaboracion y facilita busqueda/refactor.

### Regla T1 - Cobertura minima por cambio
- Nombre: Cobertura minima por cambio
- Alcance: todo pull request que modifique logica de negocio, formularios o integraciones.
- Razon: cada cambio con pruebas minimas disminuye riesgo de regresion.

### Regla T2 - Mocks con validacion real en CI
- Nombre: Mocks con validacion real
- Alcance: pruebas de integracion y pipeline de CI.
- Razon: usar mocks acelera desarrollo local, pero validar contra API real evita falsos positivos.

### Regla T3 - Casos borde obligatorios
- Nombre: Casos borde obligatorios
- Alcance: formularios e inputs (vacios, invalidos, limites, conversion numerica).
- Razon: cubrir edge cases previene errores de validacion y mejora estabilidad en produccion.

### Regla D1 - ADR para decisiones relevantes
- Nombre: ADR obligatorios para decisiones tecnicas
- Alcance: cambios de arquitectura, contratos de API, decisiones de datos y decisiones de seguridad.
- Razon: registrar decisiones preserva contexto y evita re-discutir lo mismo en iteraciones futuras.

### Regla D2 - Runbooks operativos actualizados
- Nombre: Runbooks operativos
- Alcance: arranque local, variables de entorno, troubleshooting y release.
- Razon: reduce bloqueos operativos y acelera onboarding del equipo.

### Regla X1 - Manejo estandar de errores
- Nombre: Estandar de errores
- Alcance: capa API y componentes de UI con asincronia.
- Razon: errores clasificados por tipo/status mejoran diagnostico y reducen tiempo de resolucion.

### Regla X2 - Estados de UI obligatorios
- Nombre: Estados de UI obligatorios
- Alcance: toda vista asincrona.
- Razon: exigir loading, error y empty state evita interfaces ambiguas y mejora experiencia.

### Regla X3 - Accesibilidad minima en feedback
- Nombre: Accesibilidad minima en feedback
- Alcance: spinners, alertas, mensajes de exito/error y componentes de estado.
- Razon: incluir atributos accesibles (role, aria-live) reduce barreras y preserva usabilidad universal.

## Politica de adopcion
- Alta prioridad: A2, A3, T1, X1.
- Prioridad media: T2, T3, D1, D2.
- Prioridad base: N1, N2, X2, X3.

## Checklist rapido para PR
- [ ] El cambio respeta una capa API unica.
- [ ] No hay casteos inseguros en retornos HTTP.
- [ ] Status/stage salen de una fuente unica.
- [ ] El PR incluye pruebas o justificacion tecnica.
- [ ] Se actualiza documentacion si cambia arquitectura o contrato.
- [ ] La UI incluye loading, error y empty state cuando aplica.
