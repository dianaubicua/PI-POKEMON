import './App.css';
import React from 'react';
import { Provider } from 'react-redux'
import { Routes, Route } from 'react-router-dom';
import Landing from './pages/landing';
import Home from './pages/home.js';
import Add from './pages/add.js';
import DetailID from './pages/detailID.js';
import store from './store/index'

function App() {

  return (
    <div className="App">
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/home" element={<Home />} />
          <Route path="/add" element={<Add />} />
          <Route path="/detail/:id" element={<DetailID />} />
        </Routes>
      </Provider>
    </div>
  );
}

export default App;
