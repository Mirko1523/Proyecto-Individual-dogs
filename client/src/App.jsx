import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store/index'
import Landing from './components/landingpage/landing';
import Homepage from './components/homepage/homepage';
import Agregarperritos from './components/agregarPerritos/agregarperritos';
import './App.css';
import DetailPage from './components/details/details';

function App() {
  return (
    <Provider store={store}>
    <Router>
    <div>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Homepage />} />
        <Route path="/agregar" element={<Agregarperritos />} />
        <Route path="/detail/:id" element={<DetailPage />} />
      </Routes>
    </div>
    </Router>
    </Provider>
  );
}

export default App;
