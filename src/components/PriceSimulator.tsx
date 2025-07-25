import { useState, useEffect } from 'react';

type ContainerSize = '3m3' | '5m3' | '7m3' | '10m3';
type RentalDuration = '1-semana' | '2-semanas' | '1-mes';

const PriceSimulator = () => {
  const [selectedSize, setSelectedSize] = useState<ContainerSize>('5m3');
  const [selectedDuration, setSelectedDuration] = useState<RentalDuration>('1-semana');
  const [registrationCount, setRegistrationCount] = useState<number>(100);
  const totalSlots = 200;

  const sizes = [
    { value: '3m3', label: '3m³', description: 'Ideal para pequeñas reformas' },
    { value: '5m3', label: '5m³', description: 'Perfecto para obras medianas' },
    { value: '7m3', label: '7m³', description: 'Para construcciones grandes' },
    { value: '10m3', label: '10m³', description: 'Proyectos industriales' }
  ];

  const durations = [
    { value: '1-semana', label: '1 semana' },
    { value: '2-semanas', label: '2 semanas' },
    { value: '1-mes', label: '1 mes' }
  ];

  const getPriceRange = () => {
    const basePrices: Record<ContainerSize, { min: number; max: number }> = {
      '3m3': { min: 45, max: 65 },
      '5m3': { min: 65, max: 85 },
      '7m3': { min: 85, max: 110 },
      '10m3': { min: 110, max: 140 }
    };

    const multipliers: Record<RentalDuration, number> = {
      '1-semana': 1,
      '2-semanas': 1.8,
      '1-mes': 3.2
    };

    const basePrice = basePrices[selectedSize];
    const multiplier = multipliers[selectedDuration];

    return {
      min: Math.round(basePrice.min * multiplier),
      max: Math.round(basePrice.max * multiplier)
    };
  };

  const priceRange = getPriceRange();

  // Fetch current registration count
  useEffect(() => {
    const fetchRegistrationCount = async () => {
      try {
        const response = await fetch('/api/stats');
        if (response.ok) {
          const data = await response.json();
          setRegistrationCount((data.totalRegistrations || 0) + 100);
        }
      } catch (error) {
        console.error('Error fetching registration count:', error);
      }
    };

    fetchRegistrationCount();
  }, []);

  return (
    <section className="section price-simulator">
      <div className="container">
        <div className="simulator-content">
          <h2 className="section-title">Simulador de Precios</h2>
          <h3 className="section-subtitle-large">Contenedores de Obras</h3>
          <p className="simulator-subtitle">
            Obtén una estimación de precios para contenedores de obras en España
          </p>

          <div className="simulator-form">
            <div className="form-section">
              <h3>Tamaño del contenedor de obras</h3>
              <div className="options-grid">
                {sizes.map(size => (
                  <label key={size.value} className="option-card">
                    <input
                      type="radio"
                      name="size"
                      value={size.value}
                      checked={selectedSize === size.value}
                      onChange={(e) => setSelectedSize(e.target.value as ContainerSize)}
                    />
                    <div className="option-content">
                      <div className="option-label">{size.label}</div>
                      <div className="option-description">{size.description}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div className="form-section">
              <h3>Duración del alquiler</h3>
              <div className="duration-options">
                {durations.map(duration => (
                  <label key={duration.value} className="duration-option">
                    <input
                      type="radio"
                      name="duration"
                      value={duration.value}
                      checked={selectedDuration === duration.value}
                      onChange={(e) => setSelectedDuration(e.target.value as RentalDuration)}
                    />
                    <span className="duration-label">{duration.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="price-result">
            <div className="price-display">
              <div className="price-range">
                <span className="price-amount">
                  {priceRange.min}€ - {priceRange.max}€
                </span>
                <span className="price-period">
                  por {durations.find(d => d.value === selectedDuration)?.label}
                </span>
              </div>
              <div className="price-disclaimer">
                * Precios varían por zona. Confirmaremos tarifas exactas de tu área al lanzar
              </div>
            </div>
            
            <div className="price-benefits">
              <div className="benefit">
                <span className="benefit-icon">💰</span>
                <span>Precio garantizado al reservar</span>
              </div>
              <div className="benefit">
                <span className="benefit-icon">🚚</span>
                <span>Incluye transporte y recogida</span>
              </div>
              <div className="benefit">
                <span className="benefit-icon">📞</span>
                <span>Soporte técnico incluido</span>
              </div>
            </div>
          </div>

          <div className="simulator-cta">
            <a href="#registro" className="btn btn-primary">
              Bloquear Este Precio GRATIS ({Math.max(0, totalSlots - registrationCount)} plazas restantes)
            </a>
            <p>Asegura tu precio preferencial registrándote ahora</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PriceSimulator;