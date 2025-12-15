import React, { useEffect, useState } from 'react';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("cartItems");
    if (stored) {
      setCartItems(JSON.parse(stored));
    }
  }, []);

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + Number(item.price || 0), 0);
  };

  const styles = {
    container: {
        
      padding: '30px',
      fontFamily: 'Segoe UI, sans-serif',
      backgroundImage: 'url(https://images.unsplash.com/photo-1606761568499-4a4c1e00a2cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80)',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      minHeight: '100vh',
      minWidth:'96%',
      backdropFilter: 'blur(4px)',
      backgroundColor: 'rgba(247, 253, 249, 0.85)',
    },
    title: {
      color: '#2e8b57',
      fontSize: '32px',
      fontWeight: '600',
      marginBottom: '20px',
    },
    emptyText: {
      fontSize: '18px',
      color: '#555',
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '25px',
    },
    card: {
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      border: '1px solid #d0e0d8',
      borderRadius: '10px',
      padding: '20px',
      boxShadow: '0 2px 6px rgba(0, 128, 0, 0.1)',
      transition: 'transform 0.2s ease',
    },
    cardTitle: {
      fontSize: '22px',
      color: '#2e8b57',
      marginTop: 0,
    },
    cardText: {
      fontSize: '16px',
      color: '#333',
      margin: '8px 0',
    },
    total: {
      marginTop: '30px',
      fontSize: '20px',
      fontWeight: 'bold',
      color: '#2e8b57',
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>🛒 Your Cart</h2>

      {cartItems.length === 0 ? (
        <p style={styles.emptyText}>No items in cart.</p>
      ) : (
        <>
          <div style={styles.grid}>
            {cartItems.map((item, idx) => (
              <div key={idx} style={styles.card}>
                <h4 style={styles.cardTitle}>{item.name}</h4>
                <p style={styles.cardText}><strong>Qty:</strong> {item.quantity}</p>
                <p style={styles.cardText}><strong>Price:</strong> ₹{item.price}</p>
              </div>
            ))}
          </div>
          <p style={styles.total}>Total Price: ₹{calculateTotal()}</p>
        </>
      )}
    </div>
  );
};

export default Cart;
