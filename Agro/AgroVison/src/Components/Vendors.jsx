import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Vendors.css';
import { useNavigate } from 'react-router-dom';

const Vendors = () => {
  const [crops, setCrops] = useState([]);
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCrops();
  }, []);

  const fetchCrops = async () => {
    try {
      const response = await axios.get('http://localhost:5005/api/crops');
      setCrops(response.data);
    } catch (error) {
      console.error("Error fetching crops:", error);
    }
  };

  const handleAddToCart = (crop) => {
    setCart((prevCart) => [...prevCart, crop]);
    localStorage.setItem("cartItems", JSON.stringify([...cart, crop])); // Save to localStorage
    alert(`${crop.name} added to cart`);
  };

  const goToCart = () => {
    navigate('/cart');
  };

  const styles = {
    container: {
      maxWidth: '100%',
      margin: 'auto',
      padding: '30px',
      fontFamily: 'Segoe UI, sans-serif',
      backgroundColor: '#f7fdf9',
    }
  };

  return (
    <div className="vendors-container">
      <div style={styles.container}>
        <div style={{
          padding: '30px',
          backgroundColor: '#e6f2ea',
          textAlign: 'center',
          fontFamily: 'Segoe UI, sans-serif',
          lineHeight: '1.6',
        }}>
          <h1 style={{ color: '#2e8b57', marginBottom: '10px' }}>Welcome to the Crop Buying Page</h1>
          <p style={{ fontSize: '16px', color: '#333' }}>
            Here you can Buy fresh produce crops directly from farmers.
            Click 'Add to Cart' to select items for purchase.
          </p>
          <button onClick={goToCart} style={{ marginTop: '10px', padding: '10px 20px', backgroundColor: '#2e8b57', color: '#fff', border: 'none', borderRadius: '5px' }}>
            Go to Cart ({cart.length})
          </button>
        </div>
      </div>

      <h2 style={{ paddingLeft: '30px' }}>Available Crops from Farmers</h2>
      <div className="crops-grid">
        {crops.map((crop, index) => (
          <div key={index} className="crop-card">
            <h3>{crop.name}</h3>
            <p><strong>Quantity:</strong> {crop.quantity}</p>
            <p><strong>Price:</strong> ₹{crop.price}</p>
            <button onClick={() => handleAddToCart(crop)} className="add-to-cart-btn">
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Vendors;
