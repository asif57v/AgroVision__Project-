import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Farmerpag.css';

const Farmer = () => {
  const [cropData, setCropData] = useState({ name: '', quantity: '', price: '' });
  const [crops, setCrops] = useState([]);

  useEffect(() => {
    fetchCrops();
  }, []);

  const fetchCrops = async () => {
    try {
      const res = await axios.get('http://localhost:5005/api/crops');
      setCrops(res.data);
    } catch (err) {
      alert("Failed to fetch crops");
    }
  };

  const handleChange = (e) => {
    setCropData({ ...cropData, [e.target.name]: e.target.value });
  };

  // const handleSubmit = async () => {
  //   if (!cropData.name || !cropData.quantity || !cropData.price) {
  //     alert('Please fill all fields');
  //     return;
  //   }

  //   try {
  //     await axios.post('http://localhost:5000/api/crops', cropData);
  //     alert('Crop added successfully!');
  //     setCropData({ name: '', quantity: '', price: '' });
  //     fetchCrops();
  //   } catch (err) {
  //     alert('Error adding crop');
  //   }
  // };



  const handleSubmit = async () => {
  if (!cropData.name || !cropData.quantity || !cropData.unit || !cropData.price) {
    alert('Please fill all fields');
    return;
  }

  const finalData = {
    ...cropData,
    quantity: `${cropData.quantity} ${cropData.unit}`  // Combine quantity + unit
  };

  try {
    await axios.post('http://localhost:5005/api/crops', finalData);
    alert('Crop added successfully!');
    setCropData({ name: '', quantity: '', unit: 'kg', price: '' });
    fetchCrops();
  } catch (err) {
    alert('Error adding crop');
  }
};




  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5005/api/crops/${id}`);
      fetchCrops();
    } catch (err) {
      alert('Error deleting crop');
    }
  };

  // JSX Styles
  const styles = {
    container: {
      maxWidth: '100%',
      Width:'100%',
      minWidth:'100%',
      // Width :'150vh',
      // top:'45px',
    position: 'relative',
      margin: 'auto',
      padding: '30px',
      fontFamily: 'Segoe UI, sans-serif',
      backgroundColor: '#f7fdf9',
    },
    form: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '12px',
      marginBottom: '30px',
      alignItems: 'center',
    },
    input: {
      padding: '10px',
      fontSize: '14px',
      flex: 1,
      minWidth: '150px',
      border: '1px solid #ccc',
      borderRadius: '6px',
    },
    button: {
      padding: '10px 18px',
      backgroundColor: '#28a745',
      color: 'white',
      fontWeight: 'bold',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
    },
    // cropList: {
    //   display: 'flex',
    //   flexWrap: 'wrap',
    //   gap: '16px',
    //   justifyContent: 'flex-start',
    // }


    cropList: {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '16px',
  justifyContent: 'flex-start',
  maxHeight: '520px', // enable vertical scroll after 6 items
  overflowY: 'auto',
  border: '1px solid #ccc',
  padding: '12px',
  borderRadius: '8px',
}
    ,
    cropCard: {
      background: '#ffffff',
      border: '1px solid #ddd',
      borderRadius: '12px',
      width: '221px',
      height: '248px',
      padding: '15px',
      boxShadow: '0 0 8px rgba(0, 128, 0, 0.1)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
    cropTitle: {
      color: '#1e7e34',
      fontSize: '18px',
      margin: '0 0 10px',
    },
    cropText: {
      margin: '5px 0',
      color: '#333',
      fontSize: '14px',
    },
    deleteButton: {
      marginTop: '10px',
      padding: '8px',
      backgroundColor: '#dc3545',
      color: 'white',
      fontWeight: 'bold',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
    }
  }


  return (

    
    <div className='COnt' style={styles.container}>



<div style={{
  padding: '30px',
  backgroundColor: '#e6f2ea',
  textAlign: 'center',
  fontFamily: 'Segoe UI, sans-serif',
  lineHeight: '1.6',
}}>
  <h1 style={{ color: '#2e8b57', marginBottom: '10px' }}>Welcome to the Crop Selling Page</h1>
  <p style={{ fontSize: '16px', color: '#333' }}>
    Here you can add your fresh produce and reach buyers directly. Simply fill in the crop name, quantity, and price.
    <br />
    Make sure your details are accurate and updated regularly to ensure smooth transactions.
  </p>
</div>



<h2 style={{color:"green",display:"flex",alignItems:"center",justifyContent:"center"}}>Add your Crops for sell</h2>
      <h2 style={{color:"black"}}>Add Crop</h2>

      <div style={styles.form}>
        <input
          type="text"
          name="name"
          placeholder="Crop Name"
          value={cropData.name}
          onChange={handleChange}
          style={styles.input}
        />
        {/* <input
          type="text"
          name="quantity"
          placeholder="Quantity"
          value={cropData.quantity}
          onChange={handleChange}
          style={styles.input}
          
        /> */}

        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
  <input
    type="text"
    name="quantity"
    placeholder="Quantity"
    value={cropData.quantity}
    onChange={handleChange}
    style={{ ...styles.input, flex: '1' }}
  />

  <select
    name="unit"
    value={cropData.unit}
    onChange={handleChange}
    style={{ ...styles.input, flex: '1' }}
  >
    <option value="kg">kg</option>
    <option value="gm">gm</option>
    <option value="ton">ton</option>
    <option value="quintal">quintal</option>
  </select>
</div>



        <input
          type="number"
          name="price"
          placeholder="Price in rupees per KG"
          value={cropData.price}
          onChange={handleChange}
          style={styles.input}
        />
        <button onClick={handleSubmit} style={styles.button}>Add Crop</button>
      </div>
{/* 
      <h3>Crop List</h3>
      <div style={styles.cropList}>
        {crops.map(crop => (
          <div key={crop._id} style={styles.cropCard}>
            <h4 style={styles.cropTitle}>{crop.name}</h4>
            <p style={styles.cropText}>Quantity: {crop.quantity}</p>
            <p style={styles.cropText}>Price: ₹{crop.price}</p>
            <button style={styles.deleteButton} onClick={() => handleDelete(crop._id)}>
              Delete
            </button>
          </div>
        ))}

        
      </div> */}

      <h3>Crop List</h3>
<div style={styles.cropList}>
  {crops.map(crop => (
    <div key={crop._id} style={styles.cropCard}>
      <h4 style={styles.cropTitle}>{crop.name}</h4>
      <p style={styles.cropText}>Quantity: {crop.quantity}</p>
      <p style={styles.cropText}>Price: ₹{crop.price}</p>
      <button style={styles.deleteButton} onClick={() => handleDelete(crop._id)}>
        Delete
      </button>
    </div>
  ))}
</div>
    </div>
  );
};

export default Farmer;
