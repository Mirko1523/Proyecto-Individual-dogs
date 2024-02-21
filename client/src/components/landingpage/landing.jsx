import React from 'react';
import { Link } from 'react-router-dom';
import imagenfondo from '../../Imagenes/255282-werecat.png';
import './landing.css'
const Landing = () => {
  return (
    <div className="landing-page-container">
      <img src={imagenfondo} alt="foto" className="imagen-landing" />
      <div className="button-container">
        <Link to="/home">
          <button className="dogs-button">Click para perritos</button>
        </Link>
      </div>
    </div>
  );
}

export default Landing;