import { useState, useEffect } from 'react';

const SocialProof = () => {
  const [registrations, setRegistrations] = useState(147);
  const [recentSignups, setRecentSignups] = useState([
    { name: "Construcciones Madrid S.L.", location: "Madrid", time: "hace 2 horas" },
    { name: "Reformas García", location: "Barcelona", time: "hace 4 horas" },
    { name: "Particular", location: "Sevilla  ", time: "hace 6 horas" },
  ]);


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
              <div className="stat-number">20</div>
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