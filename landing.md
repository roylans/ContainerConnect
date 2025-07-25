# Prompt para Claude Code - Actualizar Landing de Sevilla a España Completa

## Contexto
Tengo una landing page de validación para un marketplace de contenedores de obras que está configurada para Sevilla. Necesito actualizarla para cubrir España completa manteniendo la misma funcionalidad y diseño, pero adaptando todo el contenido geográfico y escalando el potencial de mercado.

## Cambios Específicos Requeridos

### **1. Modificaciones en Headlines y Messaging**

**CAMBIAR DE:**
```
"Encuentra Contenedores de Obras en Sevilla - Próximamente"
"Sé el primero en acceder a nuestra plataforma que conecta tu obra con los mejores proveedores locales"
```

**CAMBIAR A:**
```
"Encuentra Contenedores de Obras en España - Próximamente"
"Sé el primero en acceder a nuestra plataforma que conecta tu obra con los mejores proveedores de toda España"
```

### **2. Actualizar Propuesta de Valor**

**CAMBIAR DE:**
```
"Estamos finalizando acuerdos con los mejores proveedores 
de contenedores de Sevilla para ofrecerte:"
```

**CAMBIAR A:**
```
"Estamos finalizando acuerdos con los mejores proveedores 
de contenedores de toda España para ofrecerte:"
```

**Y añadir:**
```
✓ Cobertura nacional - Desde Madrid a Barcelona, de Valencia a Bilbao
✓ Mayor variedad de proveedores en tu zona
✓ Mejor precio garantizado - Red nacional de comparación
✓ Disponibilidad en tiempo real en toda España
✓ Entrega rápida - Proveedores locales en cada ciudad
✓ Sin intermediarios molestos - Contacto directo especializado por zona
```

### **3. Formulario de Pre-registro Actualizado**

**Modificar el dropdown "Zona principal de trabajo" por:**
```html
<select name="ciudad" required>
  <option value="">Selecciona tu ciudad/provincia</option>
  <optgroup label="Principales ciudades">
    <option value="madrid">Madrid (capital y comunidad)</option>
    <option value="barcelona">Barcelona (área metropolitana)</option>
    <option value="valencia">Valencia (área metropolitana)</option>
    <option value="sevilla">Sevilla (área metropolitana)</option>
    <option value="bilbao">Bilbao (área metropolitana)</option>
    <option value="zaragoza">Zaragoza</option>
    <option value="malaga">Málaga</option>
    <option value="murcia">Murcia</option>
    <option value="palmas">Las Palmas</option>
    <option value="palma">Palma de Mallorca</option>
  </optgroup>
  <optgroup label="Otras provincias">
    <option value="alicante">Alicante</option>
    <option value="cordoba">Córdoba</option>
    <option value="valladolid">Valladolid</option>
    <option value="gijon">Gijón</option>
    <option value="hospitalet">L'Hospitalet</option>
    <option value="coruña">A Coruña</option>
    <option value="vitoria">Vitoria</option>
    <option value="granada">Granada</option>
    <option value="elche">Elche</option>
    <option value="oviedo">Oviedo</option>
    <option value="santander">Santander</option>
    <option value="pamplona">Pamplona</option>
    <option value="almeria">Almería</option>
    <option value="castellon">Castellón</option>
    <option value="logroño">Logroño</option>
    <option value="cadiz">Cádiz</option>
    <option value="huelva">Huelva</option>
    <option value="leon">León</option>
    <option value="salamanca">Salamanca</option>
    <option value="tarragona">Tarragona</option>
    <option value="otra">Otra ciudad/provincia</option>
  </optgroup>
</select>
```

### **4. Contador Social Proof**

**CAMBIAR DE:**
```
"125 empresas ya registradas en Sevilla"
```

**CAMBIAR A:**
```
"[número dinámico] empresas ya registradas en toda España"
```

Y empezar el contador en 247 (número más creíble para nacional).

### **5. Mapa Visual o Sección de Cobertura**

**Añadir nueva sección después del formulario:**
```html
<section class="coverage-section">
  <h3>Cobertura Nacional</h3>
  <div class="cities-grid">
    <div class="city-item">
      <span class="city-name">Madrid</span>
      <span class="city-status">✓ Activo</span>
    </div>
    <div class="city-item">
      <span class="city-name">Barcelona</span>
      <span class="city-status">✓ Activo</span>
    </div>
    <div class="city-item">
      <span class="city-name">Valencia</span>
      <span class="city-status">🔄 Próximamente</span>
    </div>
    <div class="city-item">
      <span class="city-name">Sevilla</span>
      <span class="city-status">🔄 Próximamente</span>
    </div>
    <div class="city-item">
      <span class="city-name">Bilbao</span>
      <span class="city-status">🔄 Próximamente</span>
    </div>
    <div class="city-item">
      <span class="city-name">+45 ciudades más</span>
      <span class="city-status">📅 En desarrollo</span>
    </div>
  </div>
</section>
```

### **6. Simulador de Precios Actualizado**

**CAMBIAR DE:**
```
"Precios estimados para contenedores en Sevilla"
```

**CAMBIAR A:**
```
"Precios estimados para contenedores en España"
```

**Y actualizar el resultado:**
```
"Precio estimado: 65€-95€ por semana"
"*Precios varían por zona. Confirmaremos tarifas exactas de tu área al lanzar"
```

### **7. FAQ Section Actualizada**

**Modificar estas preguntas:**

**CAMBIAR:**
- "¿Qué zonas de Sevilla cubrirán?" 

**POR:**
- "¿Qué ciudades y provincias cubrirán?"
- **Respuesta:** "Empezaremos por las principales áreas metropolitanas (Madrid, Barcelona, Valencia, Sevilla, Bilbao) y expandiremos gradualmente a todas las provincias españolas según la demanda."

**AÑADIR nueva FAQ:**
- "¿Cómo funcionará en ciudades pequeñas?"
- **Respuesta:** "En ciudades menores trabajaremos con proveedores regionales que den servicio a varias localidades, garantizando cobertura y precios competitivos."

### **8. Timeline de Lanzamiento Actualizado**

**CAMBIAR DE:**
```
- ✅ Paso 1: Análisis de mercado Sevilla (Completado)
- 🔄 Paso 2: Acuerdos con proveedores (En progreso)
- ⏳ Paso 3: Desarrollo plataforma (Próximamente)
- 📅 Paso 4: Lanzamiento oficial (Estimado: 4-6 semanas)
```

**CAMBIAR A:**
```
- ✅ Paso 1: Análisis de mercado España (Completado)
- 🔄 Paso 2: Acuerdos proveedores principales ciudades (En progreso)
- ⏳ Paso 3: Desarrollo plataforma nacional (Próximamente)  
- 📅 Paso 4: Lanzamiento Madrid/Barcelona (Estimado: 4-6 semanas)
- 📅 Paso 5: Expansión nacional gradual (2-6 meses)
```

### **9. SEO y Meta Tags**

**ACTUALIZAR:**
```html
<title>Alquiler Contenedores de Obra España - Próximamente | ContainerEspaña</title>

<meta name="description" content="Plataforma para alquilar contenedores de obra en toda España. Mejor precio garantizado, cobertura nacional. Regístrate gratis para acceso prioritario.">

<meta name="keywords" content="contenedores obrea españa, alquiler contenedores españa, obras españa, contenedores madrid, contenedores barcelona">
```

### **10. Footer Actualizado**

**CAMBIAR:**
```
"Un proyecto para digitalizar el sector de contenedores en Sevilla"
```

**POR:**
```
"Un proyecto para digitalizar el sector de contenedores en España"
```

### **11. Email de Confirmación**

**Actualizar el template del email automático:**

**CAMBIAR:**
```
Asunto: "¡Reservado! Te avisaremos cuando lancemos en Sevilla"
```

**POR:**
```
Asunto: "¡Reservado! Te avisaremos cuando lancemos en tu ciudad"
```

**Y en el contenido:**
```
"Hemos registrado tu interés para [CIUDAD_SELECCIONADA]. 
Te avisaremos en cuanto estemos operativos en tu zona.

📍 Tu ciudad: [CIUDAD_SELECCIONADA]
⏰ Lanzamiento estimado: [FECHA_POR_CIUDAD]
🎯 Acceso prioritario garantizado"
```

### **12. Beneficios Específicos Actualizar**

**En la sección de beneficios, CAMBIAR:**

**Columna 3: "Servicio Local"**
```
- Icono: Ubicación/camión
- "Proveedores verificados en toda España"  
- "Red nacional con proveedores locales en cada ciudad"
```

### **13. Ajustes de JavaScript**

**Actualizar el tracking de conversiones:**
```javascript
// Event tracking actualizado
function trackRegistration() {
  gtag('event', 'conversion', {
    'send_to': 'AW-CONVERSION_ID/CONVERSION_LABEL',
    'value': 35.0, // Valor mayor por alcance nacional
    'currency': 'EUR',
    'custom_parameters': {
      'ciudad': document.querySelector('[name="ciudad"]').value,
      'tipo_cliente': document.querySelector('[name="tipo_cliente"]').value
    }
  });
}
```

### **14. Mantener Sin Cambios**

- Diseño y estructura visual
- Formulario principal (solo cambiar dropdown ciudad)
- Colores y tipografía
- Funcionalidad de validación
- Integración con Airtable/base de datos
- Sistema de incremento automático del contador

## Instrucciones de Implementación

1. **Conservar toda la funcionalidad existente**
2. **Mantener el diseño responsive**
3. **Actualizar solo el contenido especificado**
4. **Asegurar que todos los enlaces internos funcionen**
5. **Mantener la velocidad de carga**
6. **Preservar el tracking analytics**

## Resultado Esperado

Una landing page idéntica en funcionalidad y diseño, pero adaptada para España completa, que:
- Atraiga usuarios de toda España
- Segmente correctamente por ciudades
- Mantenga la misma tasa de conversión
- Escalea el potencial de mercado 15x
- Prepare el terreno para lanzamiento nacional

## Archivos a Modificar

- `index.html` (cambios principales)
- `styles.css` (si hay cambios en la sección coverage)
- `script.js` (actualizaciones de tracking)
- Email templates (si están en archivos separados)

Realiza todos estos cambios manteniendo la calidad del código existente y asegurando compatibilidad cross-browser.