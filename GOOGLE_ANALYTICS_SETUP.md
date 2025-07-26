# Google Analytics Setup Guide

## Configuración Google Analytics 4 para ContainerConnect

### 1. Crear cuenta de Google Analytics

1. Ve a [Google Analytics](https://analytics.google.com/)
2. Crea una nueva cuenta o usa una existente
3. Configura una nueva propiedad para "ContainerConnect"
4. Selecciona "Web" como plataforma
5. Introduce la URL del sitio web

### 2. Obtener Measurement ID

1. En la propiedad creada, ve a **Admin** > **Data Streams**
2. Haz clic en tu stream web
3. Copia el **Measurement ID** (formato: G-XXXXXXXXXX)

### 3. Configurar variables de entorno

1. Edita el archivo `.env` en la raíz del proyecto
2. Reemplaza `G-XXXXXXXXXX` con tu Measurement ID real:

```bash
GA_MEASUREMENT_ID=G-TU_MEASUREMENT_ID_REAL
```

### 4. Eventos implementados

El sistema rastrea automáticamente:

#### Eventos básicos:
- **page_view**: Visualizaciones de página
- **form_submit**: Envíos exitosos del formulario
- **form_error**: Errores en el formulario
- **click**: Interacciones del usuario

#### Eventos de conversión:
- **generate_lead**: Registro exitoso (valor: €25)
- **user_interaction**: Clics e interacciones

#### Eventos personalizados:
- **registration_form_submit_attempt**: Intento de envío
- **priority_access_registration**: Registro completado

### 5. Configuración de objetivos

En Google Analytics, configura estos objetivos:

1. **Registro completado**:
   - Tipo: Evento
   - Categoría: conversion
   - Acción: generate_lead

2. **Engagement del formulario**:
   - Tipo: Evento  
   - Categoría: engagement
   - Acción: form_submit

### 6. Verificar implementación

1. Instala la extensión [Google Analytics Debugger](https://chrome.google.com/webstore/detail/google-analytics-debugger/jnkmfdileelhofjcijamephohjechhna)
2. Ve a tu sitio web
3. Abre las herramientas de desarrollador
4. Verifica que se envían eventos a GA4

### 7. Configuración avanzada (opcional)

#### Enhanced Ecommerce:
Para trackear el valor de los leads:

```javascript
gtag('event', 'purchase', {
  transaction_id: 'lead_' + Date.now(),
  value: 25.0,
  currency: 'EUR',
  items: [{
    item_id: 'priority_access',
    item_name: 'Priority Access Registration',
    category: 'lead_generation',
    quantity: 1,
    price: 25.0
  }]
});
```

#### Audiences personalizadas:
- Usuarios que completaron registro
- Usuarios por tipo de cliente
- Usuarios por ubicación geográfica

### 8. Integración con Google Ads (opcional)

1. Vincula tu cuenta de Google Analytics con Google Ads
2. Importa conversiones desde GA4 a Google Ads
3. Usa el evento `generate_lead` como conversión

### 9. Verificación final

Después de configurar:

1. Ejecuta `npm run dev`
2. Ve a la página de registro  
3. Completa el formulario
4. Verifica en GA4 que se registran los eventos

### 10. Monitoreo continuo

Métricas clave a monitorear:

- **Conversion Rate**: % de visitantes que se registran
- **Form Completion Rate**: % de usuarios que completan el formulario
- **Traffic Sources**: De dónde vienen los registros
- **User Journey**: Flujo de navegación hasta el registro

---

**⚠️ Importante**: Recuerda reemplazar `G-XXXXXXXXXX` con tu Measurement ID real antes de desplegar a producción.