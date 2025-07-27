import { useState, useEffect } from 'react';

const SocialProof = () => {
  const [totalRegistrations, setTotalRegistrations] = useState(0);
  const [displayCount, setDisplayCount] = useState(0);
  const [recentSignups, setRecentSignups] = useState([
    { name: "Construcciones Alturas S.L.", location: "Madrid", time: "hace 2 horas" },
    { name: "Reformas Gonzalez Gonzalez", location: "Barcelona", time: "hace 4 horas" },
    { name: "Particular", location: "Sevilla", time: "hace 6 horas" },
  ]);

  // Fetch total registration count from API
  useEffect(() => {
    const fetchRegistrationCount = async () => {
      try {
        const response = await fetch('/api/stats');
        if (response.ok) {
          const data = await response.json();
          const total = (data.totalRegistrations || 0) + 100;
          setTotalRegistrations(total);
        }
      } catch (error) {
        console.error('Error fetching registration count:', error);
        setTotalRegistrations(100); // fallback
      }
    };

    fetchRegistrationCount();
  }, []);

  // Animate counter from 0 to total when totalRegistrations changes
  useEffect(() => {
    if (totalRegistrations > 0) {
      setDisplayCount(0);
      
      // Add initial delay to see the 0 first
      setTimeout(() => {
        const duration = 3000; // 3 seconds animation
        const fps = 30; // 30 frames per second for smooth animation
        const totalFrames = (duration / 1000) * fps;
        const increment = totalRegistrations / totalFrames;
        
        let frame = 0;
        const timer = setInterval(() => {
          frame++;
          const nextValue = Math.floor(increment * frame);
          setDisplayCount(Math.min(nextValue, totalRegistrations));
          
          if (frame >= totalFrames || nextValue >= totalRegistrations) {
            setDisplayCount(totalRegistrations);
            clearInterval(timer);
          }
        }, 1000 / fps); // ~33ms per frame

        return () => clearInterval(timer);
      }, 500); // Wait 500ms before starting animation
    }
  }, [totalRegistrations]);

  return (
    <section className="section social-proof">
      <div className="container">
        <div className="social-proof-content">
          <div className="stats-section">
            <div className="main-stat">
              <div className="stat-number">27</div>
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