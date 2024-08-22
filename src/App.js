import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './components/MainPage';
import Success from './components/Success';
import Cancel from './components/Cancel';
import { Theme } from './components/Theme';
import { useState } from 'react';

const App = () => {
  const [color, setColor] = useState('#020617');

  return (
    <div style={{ backgroundColor: color, minHeight: '100vh' }}>
      <Router>
        <Routes>
          <Route path="/" element={<MainPage color={color} />} />
          <Route path="/success" element={<Success />} />
          <Route path="/cancel" element={<Cancel />} />
          <Route path="/theme" element={<Theme setColor={setColor} />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
