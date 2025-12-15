import React, { useState } from 'react';
import './style.css';
import { Link } from 'react-router-dom';
import Contact from './Contact';
const Dashboard = () => {
  const [weatherInfo, setWeatherInfo] = useState('Detecting your location...');

  const getWeather = () => {
    const apiKey = "YOUR_API_KEY"; // Replace with your OpenWeatherMap API key

    setWeatherInfo("Detecting your location...");

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    } else {
      setWeatherInfo("Geolocation is not supported by your browser.");
    }

    function success(position) {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
        .then(res => res.json())
        .then(data => {
          const weather = data.weather[0].description;
          const temp = data.main.temp;
          const city = data.name;

          setWeatherInfo(`📍 ${city} | 🌡 ${temp}°C | 🌥 ${weather}`);
        })
        .catch(() => {
          setWeatherInfo("Failed to fetch weather data.");
        });
    }

    function error() {
      setWeatherInfo("Unable to access your location.");
    }
  };

  return (
    <>
      {/* Header */}
      {/* <header>
        <div className="logo">🌾 AgroVision</div>
        <nav>
          <Link to={'./LoginSignup'} >Login as Farmer</Link>
          <Link to={'./VendorSignup'}>Login as Vendor</Link>
          <Link>Contact</Link>
            {/* <span style={{ cursor: "pointer" }} onClick={scrollToContact}>Contact</span> */}
        {/* </nav> */}
      {/* // </header>  */}

      {/* Main Content */}
      <main className="container" style={{width:"800px"}}>
        <h1>Empowering Farmers, Connecting Buyers</h1>
        <p>
          Get real-time weather updates, list your crops, and explore smart farming technologies.
        </p>
        <div className="buttons">
          <Link to={'./AiFarm'} className="btn green">AI Farming</Link>
          <Link to={'/Chat'} className="btn blue">Farmers Vendors Chat</Link>
          <Link to={'/MarketTrends'} className="btn blue">Market Trends</Link>
          <Link to={'/Weather'} className="btn blue">Check Weather</Link>

          <section style={{ marginTop: '50px', color: '#0e0e0e' }}>
          Connect With Us...
          </section>
        </div>
      </main>


     
{/* Third Full-Screen Section */}
<section className="third-image-section">
  <div className="overlay-content">
    {/* <h2>Join the Green Revolution</h2>
    <p>Let’s build a smarter, sustainable future for agriculture together.</p> */}
  </div>
</section>

{/* Feature Card Section */}
<div className="feature-section">
  <Link to={'/VendorSignup'} className="feature-box">
    <img src="https://img.icons8.com/color/96/vegetarian-food.png" alt="Buy Agri Produce" />
    <h3>Buy Agri Produce</h3>
    <p>Now Farmers can sell their produce directly to end consumers. There are no more mediators.</p>
  </Link>
  <Link  to={'./LoginSignup'} className="feature-box">
    <img src="https://img.icons8.com/color/96/market-square.png" alt="Sell Agri Produce" />
    <h3>Sell Agri Produce</h3>
    <p>Sell your agriculture products without any mediator.</p>
  </Link>
  <div className="feature-box">
    <img src="https://img.icons8.com/color/96/pos-terminal.png" alt="Anywhere, Anytime" />
    <h3>Anywhere, Anytime</h3>
    <p>India's no.1 marketplace to buy and sell agriculture produce from anywhere.</p>
  </div>
</div>



{/* Fourth Full-Screen Section */}
{/* Fourth Full-Screen Section */}
<section className="fourth-image-section">
  <div className="about-container">
    
    {/* 🔁 Replace image-stack with 2 small colored boxes */}
    <div className="box-stack">
      <div className="small-box red-box">
        
        
  <img src="https://img.icons8.com/color/96/farm.png" alt="AgroVision Thought" />
  <h3>Powering Indian Agriculture</h3>
  <p>Bridging tech and tradition to empower every farmer.</p>




      </div>
      <div className="small-box grey-box">
       
  <img src="https://img.icons8.com/color/96/tractor.png" alt="AgroTech Empowerment" />
  <h3>AgriTech for Growth</h3>
  <p>Modern tools for smarter, sustainable farming.</p>


      </div>
    </div>

    {/* ✅ Keep existing text */}
    <div className="text-content">
      <small>🌿 ABOUT</small>
      <h2>Welcome to <span className="highlight">AgroVision</span></h2>
      <h4>Buy and Sell Your Agricultural Produce Online – Where Farmers Meet Buyers Directly</h4>
      <p>
        AgroVision is a free platform that empowers farmers to sell their produce directly to buyers—eliminating
        middlemen and ensuring better profits. India is home to one of the largest agricultural markets in the world,
        and there’s a growing need for a unified digital space that connects farmers across regions.
        By enabling farmers to list and sell their products locally or wherever they get the best price,
        AgroVision helps them maximize their earnings.
      </p>
    </div>
  </div>
</section>


<section className="contact-section">
<Contact/>
</section>
      {/* Footer */}
      <footer>
        <p>&copy; 2025 AgroVision. All rights reserved.</p>
        <p>Smart Agriculture | AI Farming | Crop Marketplace</p>
        <p>Review for app</p>
      </footer>
    </>
  );
};

export default Dashboard;
