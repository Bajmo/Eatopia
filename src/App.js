
import './App.css';
import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './screens/Login';
import Welcome from './screens/Welcome';
import Homepage from './screens/Homepage';
import Preferences from './screens/Preferences';
import Restaurantdetails from './screens/Restaurantdetails';
import Register from './screens/Register';
import AuthContext from './auth/AuthContext';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/welcome' element={<Welcome />} />
          <Route path='/' element={<Homepage />} />
          <Route path='/preferences' element={<Preferences />} />
          <Route path='/details/:id' element={<Restaurantdetails />} />
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
