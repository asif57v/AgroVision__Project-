import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import axios from "axios";
import "./MarketTrends.css";

const socket = io("http://localhost:5005");

const MarketTrends = () => {
  const [cropData, setCropData] = useState([]);
  const [selectedCrop, setSelectedCrop] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");

  // Fetch initial data from backend
  useEffect(() => {
    const fetchCrops = async () => {
      try {
        const res = await axios.get("http://localhost:5005/api/live-crops");
        setCropData(res.data);
      } catch (err) {
        console.error("Error fetching crops:", err);
      }
    };
    fetchCrops();
  }, []);

  // Listen for live updates via Socket.IO
  useEffect(() => {
    socket.on("priceUpdate", (data) => {
      console.log("Live data:", data); // check console to debug
      setCropData(data);
    });
    return () => socket.off("priceUpdate");
  }, []);

  // Filtered data
  const filteredData = cropData.filter(
    (item) =>
      (selectedCrop ? item.crop === selectedCrop : true) &&
      (selectedLocation ? item.location === selectedLocation : true)
  );

  const uniqueCrops = [...new Set(cropData.map((item) => item.crop))];
  const uniqueLocations = [...new Set(cropData.map((item) => item.location))];

  return (
    <div className="market-container">
      <h1>Market Trends</h1>
      <p>Live Crop Prices (Real-Time)</p>

      <div className="select-wrapper">
        <select value={selectedCrop} onChange={(e) => setSelectedCrop(e.target.value)}>
          <option value="">All Crops</option>
          {uniqueCrops.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>

        <select value={selectedLocation} onChange={(e) => setSelectedLocation(e.target.value)}>
          <option value="">All Locations</option>
          {uniqueLocations.map((l) => <option key={l} value={l}>{l}</option>)}
        </select>
      </div>

      <table className="market-table">
        <thead>
          <tr>
            <th>Crop</th>
            <th>Location</th>
            <th>Price (₹)</th>
            <th>Min Price (₹)</th>
            <th>Max Price (₹)</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item, i) => (
            <tr key={i}>
              <td>{item.crop}</td>
              <td>{item.location}</td>
              <td>{item.price}</td>
              <td>{item.minPrice}</td>
              <td>{item.maxPrice}</td>
              <td>{item.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MarketTrends;
