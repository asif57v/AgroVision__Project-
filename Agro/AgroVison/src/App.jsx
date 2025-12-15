 
import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

import Loginsignup from './Components/Loginsignup';
import Dashboard from './Components/Dashboard';
import Weather from './Components/Weather';
import FarmerPage from './Components/Farmerpage';
import MarketTrends from './Components/MarketTrends';
import Chat from './Components/Chat';
import AIFarming from './Components/AiFarming';
import Vendors from './Components/Vendors';
import VendorLoginsignup from './Components/VendorsLogin';
import Contact from './Components/Contact';
import Navbar from './Components/Navbar';
// import Cart from './components/Cart';

// ✅ AppContent: Handles conditional navbar
function AppContent() {
  const location = useLocation();

  // ✅ Define paths where navbar should be hidden
  const hideNavbarPaths = ['/LoginSignup', '/VendorSignup'];
  const hideNavbar = hideNavbarPaths.includes(location.pathname);

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/LoginSignup" element={<Loginsignup />} />
        <Route path="/VendorSignup" element={<VendorLoginsignup />} />
        <Route path="/FarmerPage" element={<FarmerPage />} />
        <Route path="/weather" element={<Weather />} />
        <Route path="/MarketTrends" element={<MarketTrends />} />
        <Route path="/Chat" element={<Chat />} />
        <Route path="/AiFarm" element={<AIFarming />} />
        <Route path="/vendors" element={<Vendors />} />
        <Route path="/contact" element={<Contact />} />
        {/* <Route path="/cart" element={<Cart />} /> */}
      </Routes>
    </>
  );
}

// ✅ Main App component
function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
