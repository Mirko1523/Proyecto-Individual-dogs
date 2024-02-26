import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './details.styles.css';
import imagenFondodetail from '../../Imagenes/seamless-dog-pattern-with-paw-prints-cat-foots-texture-pattern-with-doggy-pawprints-dog-texture-hand-drawn-illustration-in-doodle-style-on-white-background-vector.jpg';

function Detail() {
  const [dogInfo, setDogInfo] = useState(null);
  const [error, setError] = useState(null);

  const { id } = useParams();
  console.log('id:', id);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Utilizando tu propia API para obtener la información del perro
        const responseInfo = await axios.get(`http://localhost:3001/dogs/${id}?source=API`);

        if (responseInfo.data) {
          console.log(responseInfo.data);
          setDogInfo(responseInfo.data);
        } else {
          setError('No se encontró información para este perro.');
        }
      } catch (error) {
        setError('Error al obtener la información del perro: ' + error.message);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div className='page-container'>
      <div className='card-container'>
        <Link to="/home">
          <button className="back-button">Volver al Inicio</button>
        </Link>
        {dogInfo && (
          <>
            <img src={dogInfo.image} alt="Perro" />
            <h2>{dogInfo.name}</h2>
            <p className="dog-info">Weight: {dogInfo.weight} kg</p>
            <p className="dog-info">Height: {dogInfo.height} cm</p>
            <p className="dog-info">Life Span: {dogInfo.life_span} years</p>
            <p className="dog-info">Temperament: {dogInfo.temperament}</p>
          </>
        )}
        {error && <p>Error: {error}</p>}
      </div>
      <img src={imagenFondodetail} alt="Christmas Dog" className="fullscreen-image" />
    </div>
  );
}

export default Detail;
