import React, { useState, useEffect } from 'react';

interface FormData {
  email: string;
  name: string;
  phone: string;
  company: string;
  clientType: string;
  workZone: string;
  frequency: string;
  acceptMarketing: boolean;
}

interface FormErrors {
  [key: string]: string;
}

const RegistrationForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    name: '',
    phone: '',
    company: '',
    clientType: '',
    workZone: '',
    frequency: '',
    acceptMarketing: false
  });
  
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [registrationCount, setRegistrationCount] = useState<number>(147);
  const totalSlots = 200;

  const clientTypes = [
    { value: 'empresa-constructora', label: 'Empresa constructora' },
    { value: 'empresa-reformas', label: 'Empresa de reformas' },
    { value: 'particular', label: 'Particular con obra' },
    { value: 'empresa-demolicion', label: 'Empresa de demolición' },
    { value: 'otro', label: 'Otro' }
  ];

  const workZones = [
    // Principales ciudades
    { value: 'madrid', label: 'Madrid (capital y comunidad)', group: 'Principales ciudades' },
    { value: 'barcelona', label: 'Barcelona (área metropolitana)', group: 'Principales ciudades' },
    { value: 'valencia', label: 'Valencia (área metropolitana)', group: 'Principales ciudades' },
    { value: 'sevilla', label: 'Sevilla (área metropolitana)', group: 'Principales ciudades' },
    { value: 'bilbao', label: 'Bilbao (área metropolitana)', group: 'Principales ciudades' },
    { value: 'zaragoza', label: 'Zaragoza', group: 'Principales ciudades' },
    { value: 'malaga', label: 'Málaga', group: 'Principales ciudades' },
    { value: 'murcia', label: 'Murcia', group: 'Principales ciudades' },
    { value: 'palmas', label: 'Las Palmas', group: 'Principales ciudades' },
    { value: 'palma', label: 'Palma de Mallorca', group: 'Principales ciudades' },
    // Otras provincias
    { value: 'alicante', label: 'Alicante', group: 'Otras provincias' },
    { value: 'cordoba', label: 'Córdoba', group: 'Otras provincias' },
    { value: 'valladolid', label: 'Valladolid', group: 'Otras provincias' },
    { value: 'gijon', label: 'Gijón', group: 'Otras provincias' },
    { value: 'hospitalet', label: 'L\'Hospitalet', group: 'Otras provincias' },
    { value: 'coruña', label: 'A Coruña', group: 'Otras provincias' },
    { value: 'vitoria', label: 'Vitoria', group: 'Otras provincias' },
    { value: 'granada', label: 'Granada', group: 'Otras provincias' },
    { value: 'elche', label: 'Elche', group: 'Otras provincias' },
    { value: 'oviedo', label: 'Oviedo', group: 'Otras provincias' },
    { value: 'santander', label: 'Santander', group: 'Otras provincias' },
    { value: 'pamplona', label: 'Pamplona', group: 'Otras provincias' },
    { value: 'almeria', label: 'Almería', group: 'Otras provincias' },
    { value: 'castellon', label: 'Castellón', group: 'Otras provincias' },
    { value: 'logroño', label: 'Logroño', group: 'Otras provincias' },
    { value: 'cadiz', label: 'Cádiz', group: 'Otras provincias' },
    { value: 'huelva', label: 'Huelva', group: 'Otras provincias' },
    { value: 'leon', label: 'León', group: 'Otras provincias' },
    { value: 'salamanca', label: 'Salamanca', group: 'Otras provincias' },
    { value: 'tarragona', label: 'Tarragona', group: 'Otras provincias' },
    { value: 'otra', label: 'Otra ciudad/provincia', group: 'Otras provincias' }
  ];

  const frequencies = [
    { value: 'ocasional', label: 'Ocasional (1-2 veces/año)' },
    { value: 'regular', label: 'Regular (mensual)' },
    { value: 'frecuente', label: 'Frecuente (semanal)' }
  ];

  // Fetch current registration count
  useEffect(() => {
    const fetchRegistrationCount = async () => {
      try {
        const response = await fetch('/api/stats');
        if (response.ok) {
          const data = await response.json();
          setRegistrationCount(data.totalRegistrations || 147);
        }
      } catch (error) {
        console.error('Error fetching registration count:', error);
      }
    };

    fetchRegistrationCount();
  }, []);

  const validateForm = () => {
    const newErrors: FormErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'El email es requerido';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email no válido';
    }
    
    if (!formData.name) {
      newErrors.name = 'El nombre es requerido';
    }
    
    if (!formData.clientType) {
      newErrors.clientType = 'Selecciona el tipo de cliente';
    }
    
    if (!formData.workZone) {
      newErrors.workZone = 'Selecciona tu ciudad/provincia';
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Track conversion event
      if (typeof (window as any).gtag !== 'undefined') {
        (window as any).gtag('event', 'conversion', {
          'send_to': 'AW-CONVERSION_ID/CONVERSION_LABEL',
          'value': 25.0,
          'currency': 'EUR'
        });
        
        (window as any).gtag('event', 'generate_lead', {
          'currency': 'EUR',
          'value': 25.0
        });
      }
      
      // Send to our API
      const response = await fetch('/api/registrations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          name: formData.name,
          phone: formData.phone,
          company: formData.company,
          location: formData.workZone,
          container_type: formData.clientType,
          notes: `Frecuencia: ${formData.frequency}`
        })
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Error al registrar');
      }

      console.log('Registration successful:', result);
      
      // Redirect to success page
      window.location.href = '/registration-success';
      
    } catch (error: any) {
      console.error('Error submitting form:', error);
      if (error.message === 'Email already registered') {
        setErrors({ email: 'Este email ya está registrado' });
      } else {
        alert('Hubo un error al enviar el formulario. Por favor, inténtalo de nuevo.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
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


  return (
    <section id="registro" className="section registration-section">
      <div className="container">
        <div className="form-wrapper">
          <div className="form-header">
            <div className="form-badge">
              🚀 ACCESO VIP
            </div>
            <h2>Acceso Prioritario GRATIS</h2>
            <p>Solo para los primeros {totalSlots} registrados - Quedan {Math.max(0, totalSlots - registrationCount)} plazas</p>
            <div className="form-progress">
              <div className="progress-bar">
                <div className="progress-fill" style={{width: `${Math.min(100, (registrationCount / totalSlots) * 100)}%`}}></div>
              </div>
              <span className="progress-text">{registrationCount}/{totalSlots} plazas ocupadas</span>
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
              <label htmlFor="name">
                <span className="label-icon">👤</span>
                Nombre completo *
              </label>
              <div className="input-wrapper">
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Tu nombre completo"
                  className={errors.name ? 'error' : ''}
                />
                <div className="input-icon">👤</div>
              </div>
              {errors.name && <span className="error-message">{errors.name}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="phone">
                <span className="label-icon">📱</span>
                Teléfono (opcional)
              </label>
              <div className="input-wrapper">
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Ej: 600 123 456"
                />
                <div className="input-icon">📱</div>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="company">
                <span className="label-icon">🏢</span>
                Empresa (opcional)
              </label>
              <div className="input-wrapper">
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Nombre de tu empresa"
                />
                <div className="input-icon">🏢</div>
              </div>
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
                Ciudad/provincia principal *
              </label>
              <div className="select-wrapper">
                <select
                  id="workZone"
                  name="workZone"
                  value={formData.workZone}
                  onChange={handleChange}
                  className={errors.workZone ? 'error' : ''}
                >
                  <option value="">Selecciona tu ciudad/provincia</option>
                  {Object.entries(
                    workZones.reduce((groups, zone) => {
                      const group = zone.group;
                      if (!groups[group]) groups[group] = [];
                      groups[group].push(zone);
                      return groups;
                    }, {} as Record<string, typeof workZones>)
                  ).map(([groupName, zones]) => (
                    <optgroup key={groupName} label={groupName}>
                      {zones.map(zone => (
                        <option key={zone.value} value={zone.value}>
                          {zone.label}
                        </option>
                      ))}
                    </optgroup>
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
`Obtener Acceso Prioritario GRATIS (${Math.max(0, totalSlots - registrationCount)} plazas restantes)`
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