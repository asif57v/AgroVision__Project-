import React, { useEffect, useState } from 'react';

const WeatherForecast = () => {
  const [location, setLocation] = useState('Detecting location...');
  const [weatherData, setWeatherData] = useState('Fetching weather data...');
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const apiKey = 'c4e05cc14e47fa35f2194b5aceea6a4b'; // Replace with your real API key

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(success, error);
    } else {
      setLocation('❌ Geolocation not supported.');
      setWeatherData('Weather not available.');
    }

    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const success = (position) => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    setLocation(`📍 Latitude: ${lat.toFixed(2)}, Longitude: ${lon.toFixed(2)}`);

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
    )
      .then((res) => res.json())
      .then((data) => {
        const weather = data.weather[0].description;
        const temp = data.main.temp;
        const city = data.name;

        setWeatherData(`🌆 ${city}: ${weather}, 🌡 ${temp}°C`);
      })
      .catch(() => {
        setWeatherData('❌ Failed to fetch weather data.');
      });
  };

  const error = () => {
    setLocation('❌ Could not get location.');
    setWeatherData('Weather not available.');
  };

  // Responsive inline styles based on screen width
  const isMobile = screenWidth <= 480;
  const isTablet = screenWidth > 480 && screenWidth <= 768;

  const styles = {
    body: {
      margin: 0,
      fontFamily: 'Arial, sans-serif',
      color: 'white',
      backgroundImage: 'url("https://wallpaperaccess.com/full/1540049.jpg")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundAttachment: 'fixed',
      minHeight: '100vh',
      padding: '0 10px',
    },
    
    header: {
      textAlign: 'center',
      paddingTop: '20px',
    },
    container: {
      fontSize: isMobile ? '16px' : isTablet ? '20px' : '28px',
      padding: isMobile ? '10px' : isTablet ? '15px' : '20px',
      margin: isMobile ? '30px auto' : '50px auto',
      maxWidth: '600px',
      borderRadius: '12px',
      textAlign: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
    },
    heading: {
      fontSize: isMobile ? '1.3rem' : isTablet ? '1.5rem' : '2rem',
    },
  };

  return (
    <div style={styles.body}>
      <header style={styles.header}>
        <h1 style={styles.heading}>🌦 Your Local Weather</h1>
      </header>

      <main style={styles.container}>
        <p>{location}</p>
        <p>{weatherData}</p>
      </main>
    </div>
  );
};

export default WeatherForecast;
