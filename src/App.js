import React from 'react';
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import Homepage from './component/Homepage/HomePage/Homepage';
import Adminpage from './component/AdminPage/AdminPage/Adminpage';
//import AdminDashboard from './component/AdminPage/AdminDasboard/AdminDashboard';
import Login from './component/AdminPage/Login/Login';
import Navbar from './component/Navbar/Navbar';
import ReservationPage from './component/ReservationForm/ReservationPage/ReservationPage';
import './App.css';
import ProtectedRoute from './component/AdminPage/Login/ProtectedRoute';

function App() {
  const location = useLocation();
  const hideNavbarPaths = ['/Sucasaadminloginpage', '/Sucasaadminpage'];

  return (
    <div>

      {!hideNavbarPaths.includes(location.pathname) && <Navbar />}

      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="Reservation" element={<ReservationPage />} />
        <Route path="/Sucasaadminloginpage" element={<Login />} />
        <Route 
          path="/Sucasaadminpage"
          element={
            <ProtectedRoute>
              <Adminpage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/Sucasaadminloginpage" />} />
      </Routes>
    </div>
  );
}

export default App;
