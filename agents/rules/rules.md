# Reglas propuestas de calidad de codigo

## Objetivo
Definir un set de reglas que reduzca riesgos tecnicos y preserve patrones utiles ya presentes en Talent Pipeline Tracker.

## 1) Arquitectura
### Regla A1: Mantener una capa API unica
- Regla: toda llamada HTTP debe pasar por lib/api.ts (o su evolucion) y no hacerse directamente desde componentes.
- Riesgo mitigado: inconsistencias en headers, errores y cache.
- Patron util preservado: centralizacion de peticiones y contratos tipados.

### Regla A2: Tipado estricto para respuestas 204
- Regla: prohibido usar casteos inseguros como undefined as T; usar tipos explicitos (por ejemplo void o union controlada).
- Riesgo mitigado: errores silenciosos en runtime y deuda de tipos.
- Patron util preservado: seguridad de tipos en toda la capa de datos.

### Regla A3: Fuente unica para estados y etapas
- Regla: status y stage deben definirse en un modulo compartido y reutilizarse en formularios, filtros y detalle.
- Riesgo mitigado: divergencia de valores y bugs de sincronizacion.
- Patron util preservado: modelo de dominio consistente.

## 2) Naming
### Regla N1: Naming de dominio explicito
- Regla: usar nombres orientados al negocio (CandidateRecord, CandidatePayload, CandidateStatus, CandidateStage).
- Riesgo mitigado: ambiguedad semantica y curva de aprendizaje alta.
- Patron util preservado: legibilidad del modelo de datos.

### Regla N2: Convenciones unificadas de naming
- Regla: documentar y aplicar convenciones para tipos, funciones y constantes (por ejemplo, tipos en PascalCase, funciones en camelCase, constantes de dominio en MAYUSCULAS cuando aplique).
- Riesgo mitigado: heterogeneidad y friccion al colaborar.
- Patron util preservado: consistencia del codigo.

## 3) Testing
### Regla T1: Cobertura minima por capa
- Regla: cada cambio debe incluir pruebas al menos en una de estas capas: API, logica de formulario o flujo critico.
- Riesgo mitigado: regresiones no detectadas.
- Patron util preservado: desacople actual que facilita pruebas.

### Regla T2: No depender solo de mocks
- Regla: mantener mocks para desarrollo, pero ejecutar pruebas periodicas contra API real en CI.
- Riesgo mitigado: falsa sensacion de estabilidad por diferencias de contrato.
- Patron util preservado: velocidad de desarrollo local.

### Regla T3: Casos borde obligatorios en formularios
- Regla: probar inputs vacios, valores invalidos y conversiones numericas (evitar NaN).
- Riesgo mitigado: errores de validacion y fallos de UX.
- Patron util preservado: validacion actual en cliente.

## 4) Documentacion
### Regla D1: Documentar decisiones tecnicas (ADR)
- Regla: toda decision relevante de arquitectura o integracion debe registrarse en un ADR breve.
- Riesgo mitigado: perdida de contexto y decisiones repetidas.
- Patron util preservado: cultura documental del repo.

### Regla D2: Mantener runbooks operativos
- Regla: documentar arranque local, variables de entorno, troubleshooting y flujo de release.
- Riesgo mitigado: bloqueos operativos y onboarding lento.
- Patron util preservado: README de app ya existente.

## 5) DX (Developer Experience)
### Regla X1: Manejo estandar de errores
- Regla: usar mensajes de error clasificados por tipo/status y evitar catch genericos sin contexto.
- Riesgo mitigado: diagnostico lento.
- Patron util preservado: estados de error ya implementados en UI.

### Regla X2: Estados de carga y feedback obligatorios
- Regla: toda vista asincrona debe tener loading, error y empty state.
- Riesgo mitigado: pantallas ambiguas y mala experiencia de usuario.
- Patron util preservado: patrones actuales de loading/error.

### Regla X3: Accesibilidad minima en componentes de estado
- Regla: spinners, alertas y mensajes deben incluir atributos accesibles (por ejemplo role y aria-live).
- Riesgo mitigado: barreras de accesibilidad.
- Patron util preservado: buenas practicas ya aplicadas en LoadingSpinner.

## Criterio de adopcion
- Prioridad alta: A2, A3, T1, X1.
- Prioridad media: T2, T3, D1, D2.
- Prioridad base: N1, N2, X2, X3.

## Checklist rapido para PR
- [ ] No se introducen llamadas fetch fuera de la capa API.
- [ ] No hay casteos inseguros de tipos en respuestas HTTP.
- [ ] Status/stage reutilizan una sola fuente de verdad.
- [ ] El cambio incluye pruebas o justificacion tecnica explicita.
- [ ] Se actualiza documentacion si cambia arquitectura, contrato o flujo.
- [ ] La UI contempla loading, error y empty state.
