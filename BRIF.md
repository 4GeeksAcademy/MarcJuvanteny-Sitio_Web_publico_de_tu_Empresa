Nombre de la empresa: TrackFlow

Sector: Mensajeria y envio de paquetes


# Requisitos de la Landing Page (index.html)
Estructura base: Crear index.html con HTML5 semántico.

-Ejecución: Proyecto ejecutable localmente con comando npx (compatible con Codespaces).

-Header: Implementar <header> con logo/nombre de empresa y navegación.

-Hero: Sección principal con propuesta de valor.

-Secciones Extra: Al menos dos secciones adicionales (servicios, estadísticas, por qué elegirnos, etc.).

-Footer: Implementar <footer> con información de contacto.

-CTA: Botón o enlace claro que dirija al formulario de aplicación.

-Estilos: Uso estricto de Tailwind CSS (clases utilitarias).

-Responsividad: Diseño Mobile-first con breakpoints (sm:, md:, lg:) para móvil, tablet y escritorio.

-Semántica y Accesibilidad:

-Uso de etiquetas <section>, <article>, <nav>, etc.

-Atributos alt descriptivos en todas las imágenes.

-Atributos ARIA (aria-label, role) donde sea necesario.

-Marcado Schema.org (Organization o LocalBusiness).

📝 Formulario de Aplicación (application.html)
-Estructura: Crear application.html con un formulario bien estructurado.

-Campos del contexto: Incluir todos los campos especificados en tu CONTEXT.md.

-Tipos de Input: Usar tipos específicos (email, tel, date, number, etc.).

-Accesibilidad: Etiquetas <label> correctamente vinculadas con for.

-Agrupación: Uso de <fieldset> y <legend> para campos relacionados.

-Validación HTML: Atributo required en campos obligatorios.

-Diseño: Responsive y estilizado con Tailwind (espaciados, tamaños y estados de foco).

-Acciones: Botón de envío y botón secundario para limpiar el formulario.

⚙️ Validación y Lógica (validation.js)
-Archivo de control: Crear validation.js para gestionar la lógica.

-Validación en tiempo real: Validar mientras el usuario escribe o al perder el foco (blur).

-Mensajes de error: Específicos para cada tipo de validación, claros y visibles.

-Prevención: Evitar el envío del formulario si hay errores activos.

-Éxito: Mostrar un mensaje de éxito al validar correctamente (simular envío).

✅ Criterios de Evaluación Final
Código Limpio: Uso de etiquetas semánticas en lugar de <div> genéricos.

Jerarquía: Estructura de documento lógica y jerárquica.

Rendimiento: Puntuación mínima de 80 en PageSpeed Insights.

Accesibilidad Pro: * Navegación lógica por teclado.

Contraste de colores adecuado.

Mensajes de error anunciados correctamente.

# — TRACKFLOW
══════════════════════════════════════════

## [IDENTIDAD DE MARCA]
Nombre: TrackFlow
Sector: Transporte y logística — gestión de flotas y última milla
Misión: Conectar personas y negocios con soluciones de transporte ágiles, confiables y con trato humano.
Posicionamiento: Empresa moderna con personalidad propia. Eficiente y tecnológica, pero nunca fría ni anónima.
Diferencial: Cercanía sin perder profesionalidad.

Pilares de marca:
- Velocidad — Rapidez real, medible. No como promesa vacía.
- Cercanía — Trato humano en cada interacción.
- Modernidad — Tecnología usable, no aparente.
- Personalidad — Voz propia, reconocible entre la competencia.
- Seriedad — Confiable y profesional sin ser aburrido.

Público objetivo:
Pymes y empresas medianas. Responsables de operaciones y directores de compras que valoran tecnología + trato directo.

## [SISTEMA VISUAL]
Paleta cromática:
- Primario:      #003049  "Navy Nocturno"    → autoridad, solidez, seriedad
- Secundario:    #e8640c  "Naranja Tráfico"  → velocidad, acción, cercanía
- Complementario:#D1E8F0  "Cielo Ártico"     → modernidad, respiro, limpieza

Tipografía:
- Display/titulares: Space Grotesk Bold 700 — tracking -0.03em
- Cuerpo/UI:        DM Sans Light 300 + Regular 400 — line-height 1.6-1.7

Estilo visual:
- Flat design. Sin gradientes decorativos. Sin sombras superfluas.
- Fotografía documental y real. Sin stock genérico.

Elementos permitidos: líneas de trayecto, nodos de ruta, formas geométricas, datos en tiempo real, mapas esquemáticos.
Elementos prohibidos: gradientes decorativos, stock genérico, fuentes serif, más de 3 colores primarios.


# Estructura de la Landing Principal - Empresa de Envíos

## 1. Cabecera (Hero Section)
### **Tus envíos no viajan, vuelan con seguridad.**
No solo movemos paquetes, movemos confianza.

> **[Botón: Calcula tu presupuesto ahora]**

---

## 2. Nuestros Servicios
### **Soluciones a tu medida, no importa el destino.**

* **Envío Express:** *Cuando el "mañana" es tarde.* La máxima prioridad para tus documentos o paquetes urgentes.
* **Envío Internacional:** *Sin fronteras, sin complicaciones.* Conectamos tu mundo con una logística simplificada.
* **Logística para Empresas:** *Tu socio estratégico de crecimiento.* Soluciones de distribución masiva para que tú solo te preocupes de vender.

---

## 3. La Empresa en Cifras
### **Nuestra trayectoria se mide en resultados.**

* **+1.2M de paquetes entregados:** Miles de historias que llegaron a su destino con éxito este año.
* **50,000 Clientes activos:** Personas y empresas que confían en nosotros para su día a día.
* **145 Países conectados:** Una red global que elimina las distancias en los 5 continentes.
* **99.8% de puntualidad:** Porque sabemos que en logística, el tiempo es el activo más valioso.

---

## 4. ¿Por qué elegirnos?
* **Precio Económico:** Tarifas competitivas y transparentes, sin sorpresas ni letras pequeñas al final del trayecto.
* **Calidad y Fiabilidad:** Tratamos cada paquete como si fuera nuestro, garantizando su integridad desde la recogida hasta la entrega.
* **Posibilidad de Opción Premium:** Para quienes buscan lo máximo: prioridad absoluta, entrega en mano y seguimiento especializado minuto a minuto.

---

## 5. Experiencia de Usuario- en galeria.
### **Nuestros clientes hablan por nosotros**

> "Increíble la rapidez. Pensé que mi envío internacional tardaría semanas, pero llegó en tres días y en perfecto estado. ¡Repetiré seguro!"
> — **Marta S.**, Emprendedora.

> "La opción premium vale cada céntimo. El seguimiento en tiempo real me dio la tranquilidad que necesitaba para enviar documentos críticos de mi negocio."
> — **Jorge L.**, Consultor Independiente.

> "Lo que más valoro es la claridad en los precios. Es difícil encontrar una empresa de transporte que sea tan honesta con sus tarifas desde el primer momento."
> — **Elena R.**, Cliente particular.
