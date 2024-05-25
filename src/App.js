import React from 'react';
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import Homepage from './component/Homepage/HomePage/Homepage';
import RForm1 from './component/ReservationForm/RForm1/RForm1';
import Adminpage from './component/AdminPage/AdminPage/Adminpage';
import AdminDashboard from './component/AdminPage/AdminDasboard/AdminDashboard';
import Login from './component/AdminPage/Login/Login';
import Navbar from './component/Navbar/Navbar';
import './App.css';

function App() {
  const location = useLocation();

  // Paths where the Navbar should be hidden
  const hideNavbarPaths = ['/Sucasaadminloginpage', '/Sucasaadminpage'];

  return (
    <div>

      {!hideNavbarPaths.includes(location.pathname) && <Navbar />}

      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="ReservationFormOne" element={<RForm1 />} />
        <Route path="/Sucasaadminloginpage" element={<Login />} />
        <Route path="/Sucasaadminpage" element={<Adminpage />} />
        <Route path="*" element={<Navigate to="/Sucasaadminloginpage" />} />
      </Routes>
    </div>
  );
}

export default App;
