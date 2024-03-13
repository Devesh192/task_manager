import './App.css';
import './index.css';
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Register from './components/register';
import { BrowserRouter as Router } from 'react-router-dom';
import Home from './components/home';
import Login from './components/login';
function App() {
  return (
    <div >
      <Router>
        <Routes>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/" element={<Login />}></Route>
        </Routes>
      </Router>

    </div>
  );
}

export default App;
