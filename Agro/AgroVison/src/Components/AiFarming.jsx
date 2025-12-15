import React, { useState } from 'react';
import './ai.css'; // Link your provided CSS file

const AIFarming = () => {
  const [season, setSeason] = useState('summer');
  const [soil, setSoil] = useState('black');
  const [result, setResult] = useState({ crop: '', fertilizer: '' });

  const suggestAI = () => {
    let crop = '';
    let fertilizer = '';

    if (soil === 'black' && season === 'summer') {
      crop = 'Cotton';
      fertilizer = 'Urea + DAP';
    } else if (soil === 'loamy' && season === 'rainy') {
      crop = 'Rice';
      fertilizer = 'NPK + Compost';
    } else if (soil === 'sandy') {
      crop = 'Groundnut';
      fertilizer = 'Phosphate Rich Organic Manure';
    } else if (soil === 'red') {
      crop = 'Millets';
      fertilizer = 'Ammonium Sulphate';
    } else {
      crop = 'Wheat';
      fertilizer = 'NPK (20:20:0)';
    }

    setResult({ crop, fertilizer });
  };

  return (
    <div>
      <header>
        <div className="logo">🌾 AgroVision - AI Farming</div>
        <nav>
          {/* Add navigation links if needed */}
        </nav>
      </header>

      <div className="ai-section">
        <h2 className='h22'>🧠 Smart Crop & Fertilizer Suggestions</h2>

        <label htmlFor="season">Select Season:</label>
        <select
          id="season"
          value={season}
          onChange={(e) => setSeason(e.target.value)}
        >
          <option value="summer">Summer</option>
          <option value="rainy">Rainy</option>
          <option value="winter">Winter</option>
        </select>

        <label htmlFor="soil">Soil Type:</label>
        <select
          id="soil"
          value={soil}
          onChange={(e) => setSoil(e.target.value)}
        >
          <option value="black">Black</option>
          <option value="loamy">Loamy</option>
          <option value="sandy">Sandy</option>
          <option value="red">Red</option>
        </select>

        <button onClick={suggestAI}>Suggest</button>

        {result.crop && (
          <div className="result">
            <h3>🌱 Recommended Crop: <strong>{result.crop}</strong></h3>
            <p>💡 Suggested Fertilizer: <strong>{result.fertilizer}</strong></p>
          </div>
        )}
      </div>

      <section className="ai-methods">
        <h2 style={{ textAlign: 'center', marginTop: '50px' }}>🌐 AI Farming Techniques</h2>
        <div className="method-list">
          {[
            {
              title: "Precision Agriculture",
              desc: "Uses AI to monitor soil, crop health, and environmental data for optimal farm decisions.",
              // img: "https://i.imgur.com/JheA4i2.jpg",
              link: "https://en.wikipedia.org/wiki/Precision_agriculture"
            },
            {
              title: "Drone Surveillance",
              desc: "Drones use AI to scan fields, detect issues early, and reduce manual field inspections.",
              // img: "https://i.imgur.com/zP4m37I.jpg",
              link: "https://agriculture.gov.in/drones-agriculture"
            },
            {
              title: "AI Crop Prediction",
              desc: "Forecast yield based on weather, soil, and seed data using machine learning algorithms.",
              // img: "https://i.imgur.com/D07hG0R.jpg",
              link: "https://www.mdpi.com/2077-0472/13/4/837"
            },
            {
              title: "Disease Detection",
              desc: "AI detects diseases from leaf images and alerts farmers to take preventive actions early.",
              // img: "https://i.imgur.com/3XnsZoK.jpg",
              link: "https://plantix.net/en/"
            },
            {
              title: "Autonomous Machinery",
              desc: "Smart machines perform sowing, watering, and harvesting without human intervention.",
              // img: "https://i.imgur.com/LZByAcd.jpg",
              link: "https://www.deere.com/en/autonomous-technology/"
            },
            {
              title: "Smart Irrigation",
              desc: "Uses IoT and AI to automate irrigation based on real-time soil moisture and weather data.",
              // img: "https://i.imgur.com/IU7FCwU.jpg",
              link: "https://www.fao.org/3/ca8682en/ca8682en.pdf"
            },
          ].map((item, index) => (
            <div className="method-card" key={index}>
              <img src={item.img} alt={item.title} />
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
              <a href={item.link} target="_blank" rel="noopener noreferrer" className="learn-more-btn">
                Learn More
              </a>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AIFarming;
