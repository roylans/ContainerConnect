import { useState } from 'react';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    clientType: '',
    workZone: '',
    frequency: '',
    acceptMarketing: false
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const clientTypes = [
    { value: 'empresa-constructora', label: 'Empresa constructora' },
    { value: 'empresa-reformas', label: 'Empresa de reformas' },
    { value: 'particular', label: 'Particular con obra' },
    { value: 'empresa-demolicion', label: 'Empresa de demolición' },
    { value: 'otro', label: 'Otro' }
  ];

  const workZones = [
    { value: 'sevilla-capital', label: 'Sevilla capital' },
    { value: 'dos-hermanas', label: 'Dos Hermanas' },
    { value: 'alcala-guadaira', label: 'Alcalá de Guadaíra' },
    { value: 'mairena-aljarafe', label: 'Mairena del Aljarafe' },
    { value: 'utrera', label: 'Utrera' },
    { value: 'otra-zona', label: 'Otra zona metropolitana' }
  ];

  const frequencies = [
    { value: 'ocasional', label: 'Ocasional (1-2 veces/año)' },
    { value: 'regular', label: 'Regular (mensual)' },
    { value: 'frecuente', label: 'Frecuente (semanal)' }
  ];

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'El email es requerido';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email no válido';
    }
    
    if (!formData.clientType) {
      newErrors.clientType = 'Selecciona el tipo de cliente';
    }
    
    if (!formData.workZone) {
      newErrors.workZone = 'Selecciona la zona de trabajo';
    }
    
    if (!formData.frequency) {
      newErrors.frequency = 'Selecciona la frecuencia estimada';
    }
    
    if (!formData.acceptMarketing) {
      newErrors.acceptMarketing = 'Debes aceptar recibir información';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Track conversion event
      if (typeof gtag !== 'undefined') {
        gtag('event', 'conversion', {
          'send_to': 'AW-CONVERSION_ID/CONVERSION_LABEL',
          'value': 25.0,
          'currency': 'EUR'
        });
        
        gtag('event', 'generate_lead', {
          'currency': 'EUR',
          'value': 25.0
        });
      }
      
      // Simulate API call (replace with actual endpoint)
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Here you would typically send to your backend/Airtable/Google Sheets
      console.log('Form submitted:', formData);
      
      setIsSubmitted(true);
      
      // Increment counter
      const counter = document.getElementById('registrationCounter');
      if (counter) {
        const current = parseInt(counter.textContent) || 47;
        counter.textContent = (current + 1).toString();
      }
      
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Hubo un error al enviar el formulario. Por favor, inténtalo de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  if (isSubmitted) {
    return (
      <section id="registro" className="section registration-success">
        <div className="container">
          <div className="success-content">
            <div className="success-icon">✅</div>
            <h2>¡Registro completado!</h2>
            <p>Te has registrado correctamente. Te avisaremos tan pronto como estemos listos para lanzar en Sevilla.</p>
            <div className="success-benefits">
              <h3>Qué esperar a continuación:</h3>
              <ul>
                <li>📧 Email de confirmación en los próximos minutos</li>
                <li>📈 Updates semanales sobre nuestro progreso</li>
                <li>🎯 Acceso prioritario cuando lancemos</li>
                <li>💰 Ofertas especiales para early adopters</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="registro" className="section registration-section">
      <div className="container">
        <div className="form-wrapper">
          <div className="form-header">
            <div className="form-badge">
              🚀 ACCESO VIP
            </div>
            <h2>Acceso Prioritario GRATIS</h2>
            <p>Solo para los primeros 200 registrados - Quedan pocas plazas</p>
            <div className="form-progress">
              <div className="progress-bar">
                <div className="progress-fill" style={{width: '73%'}}></div>
              </div>
              <span className="progress-text">146/200 plazas ocupadas</span>
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="registration-form">
            <div className="form-group">
              <label htmlFor="email">
                <span className="label-icon">📧</span>
                Email *
              </label>
              <div className="input-wrapper">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="tu@email.com"
                  className={errors.email ? 'error' : ''}
                />
                <div className="input-icon">✉️</div>
              </div>
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="clientType">
                <span className="label-icon">🏗️</span>
                Tipo de cliente *
              </label>
              <div className="select-wrapper">
                <select
                  id="clientType"
                  name="clientType"
                  value={formData.clientType}
                  onChange={handleChange}
                  className={errors.clientType ? 'error' : ''}
                >
                  <option value="">Selecciona una opción</option>
                  {clientTypes.map(type => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
                <div className="select-arrow">▼</div>
              </div>
              {errors.clientType && <span className="error-message">{errors.clientType}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="workZone">
                <span className="label-icon">📍</span>
                Zona principal de trabajo *
              </label>
              <div className="select-wrapper">
                <select
                  id="workZone"
                  name="workZone"
                  value={formData.workZone}
                  onChange={handleChange}
                  className={errors.workZone ? 'error' : ''}
                >
                  <option value="">Selecciona una zona</option>
                  {workZones.map(zone => (
                    <option key={zone.value} value={zone.value}>
                      {zone.label}
                    </option>
                  ))}
                </select>
                <div className="select-arrow">▼</div>
              </div>
              {errors.workZone && <span className="error-message">{errors.workZone}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="frequency">
                <span className="label-icon">🔄</span>
                Frecuencia estimada *
              </label>
              <div className="select-wrapper">
                <select
                  id="frequency"
                  name="frequency"
                  value={formData.frequency}
                  onChange={handleChange}
                  className={errors.frequency ? 'error' : ''}
                >
                  <option value="">Selecciona frecuencia</option>
                  {frequencies.map(freq => (
                    <option key={freq.value} value={freq.value}>
                      {freq.label}
                    </option>
                  ))}
                </select>
                <div className="select-arrow">▼</div>
              </div>
              {errors.frequency && <span className="error-message">{errors.frequency}</span>}
            </div>

            <div className="form-group checkbox-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="acceptMarketing"
                  checked={formData.acceptMarketing}
                  onChange={handleChange}
                />
                <span className="custom-checkbox">
                  <span className="checkmark">✓</span>
                </span>
                <span className="checkbox-text">
                  <span className="checkbox-icon">🔔</span>
                  Acepto recibir información sobre el lanzamiento *
                </span>
              </label>
              {errors.acceptMarketing && <span className="error-message">{errors.acceptMarketing}</span>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`btn btn-primary btn-submit ${isSubmitting ? 'loading' : ''}`}
            >
              <span className="btn-icon">🚀</span>
              {isSubmitting ? (
                <>
                  <span className="loading-spinner"></span>
                  Registrando...
                </>
              ) : (
                'Obtener Acceso Prioritario GRATIS'
              )}
            </button>
            
            <p className="form-disclaimer">
              Sin spam. Solo te avisaremos cuando esté listo.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default RegistrationForm;