import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SellPage = ({ farmerId }) => {
  const [form, setForm] = useState({
    name: '',
    quantity: '',
    price: '',
    location: '',
    image: null,
  });

  const [crops, setCrops] = useState([]);
  const [preview, setPreview] = useState('');
  const [message, setMessage] = useState('');

  // Fetch existing crops
  const fetchCrops = async () => {
    try {
      const res = await axios.get(`http://localhost:5003/crop/${farmerId}`);
      setCrops(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCrops();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setForm({ ...form, image: file });

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.quantity || !form.price || !form.location) {
      setMessage("Please fill all fields");
      return;
    }

    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('quantity', form.quantity);
    formData.append('price', form.price);
    formData.append('location', form.location);
    formData.append('farmerId', farmerId);
    if (form.image) {
      formData.append('image', form.image);
    }

    try {
      await axios.post('http://localhost:5003/crop/add', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setMessage('Crop added successfully');
      setForm({ name: '', quantity: '', price: '', location: '', image: null });
      setPreview('');
      fetchCrops();
    } catch (err) {
      console.error(err);
      setMessage('Error adding crop');
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      <h2>🌾 Sell Your Crop</h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: '30px' }}>
        <input
          type="text"
          placeholder="Crop Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        /><br />
        <input
          type="number"
          placeholder="Quantity (kg)"
          value={form.quantity}
          onChange={(e) => setForm({ ...form, quantity: e.target.value })}
          required
        /><br />
        <input
          type="number"
          placeholder="Price (₹/kg)"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          required
        /><br />
        <input
          type="text"
          placeholder="Location"
          value={form.location}
          onChange={(e) => setForm({ ...form, location: e.target.value })}
          required
        /><br />
        <input type="file" accept="image/*" onChange={handleImageChange} /><br />
        {preview && <img src={preview} alt="Crop" style={{ width: '100px', marginTop: '10px' }} />}<br />
        <button type="submit">Add Crop</button>
      </form>

      {message && <p><strong>{message}</strong></p>}

      <h3>🧺 Your Listed Crops</h3>
      <ul>
        {crops.map((crop) => (
          <li key={crop._id}>
            <strong>{crop.name}</strong> - {crop.quantity}kg @ ₹{crop.price}/kg - {crop.location}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SellPage;
