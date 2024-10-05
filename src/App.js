// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import routesMapping from './routes/routesMapping';

function App() {
  return (
    <Router>
      <Routes>
        {routesMapping.map((route, index) => (
          <Route key={index} path={route.path} element={<route.component />} />
        ))}
      </Routes>
    </Router>
  );
}

export default App;