import { useState, useEffect } from 'react';

const SocialProof = () => {
  const [registrations, setRegistrations] = useState(125);
  const [recentSignups, setRecentSignups] = useState([
    { name: "Construcciones Sevilla S.L.", location: "Sevilla Capital", time: "hace 2 horas" },
    { name: "Reformas García", location: "Dos Hermanas", time: "hace 4 horas" },
    { name: "Particular", location: "Alcalá de Guadaíra", time: "hace 6 horas" },
  ]);

  const zones = [
    { name: "Sevilla Capital", count: 45, x: "50%", y: "40%" },
    { name: "Dos Hermanas", count: 28, x: "45%", y: "65%" },
    { name: "Alcalá de Guadaíra", count: 22, x: "70%", y: "45%" },
    { name: "Mairena del Aljarafe", count: 18, x: "30%", y: "35%" },
    { name: "Utrera", count: 12, x: "60%", y: "80%" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setRegistrations(prev => prev + Math.floor(Math.random() * 2) + 1);
    }, 30000); // Increment every 30 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="section social-proof">
      <div className="container">
        <div className="social-proof-content">
          <div className="stats-section">
            <div className="main-stat">
              <div className="stat-number">{registrations}</div>
              <div className="stat-label">empresas ya registradas</div>
            </div>
            
            <div className="company-types">
              <div className="company-type">
                <div className="icon">🏗️</div>
                <span>Constructoras</span>
              </div>
              <div className="company-type">
                <div className="icon">🔨</div>
                <span>Reformas</span>
              </div>
              <div className="company-type">
                <div className="icon">🏠</div>
                <span>Particulares</span>
              </div>
            </div>
          </div>

          <div className="map-section">
            <h3>Registros por zona en Sevilla</h3>
            <div className="map-container">
              <div className="sevilla-map">
                {zones.map((zone, index) => (
                  <div
                    key={index}
                    className="zone-pin"
                    style={{
                      left: zone.x,
                      top: zone.y
                    }}
                  >
                    <div className="pin-marker">📍</div>
                    <div className="pin-tooltip">
                      <strong>{zone.name}</strong>
                      <br />
                      {zone.count} registros
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="recent-activity">
            <h3>Registros recientes</h3>
            <div className="activity-list">
              {recentSignups.map((signup, index) => (
                <div key={index} className="activity-item">
                  <div className="activity-info">
                    <strong>{signup.name}</strong>
                    <span className="location">{signup.location}</span>
                  </div>
                  <span className="time">{signup.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProof;