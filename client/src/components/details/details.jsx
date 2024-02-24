import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './details.styles.css';
import imagenFondodetail from '../../Imagenes/seamless-dog-pattern-with-paw-prints-cat-foots-texture-pattern-with-doggy-pawprints-dog-texture-hand-drawn-illustration-in-doodle-style-on-white-background-vector.jpg';

function Detail() {
  const [imagen, setImagen] = useState('');
  const [dogInfo, setDogInfo] = useState(null);
  const [error, setError] = useState(null);

  const { id } = useParams();
  console.log('id:', id);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseImages = await axios.get(`https://api.thedogapi.com/v1/images/search?breed_id=${id}`);

        if (responseImages.data.length > 0) {
          const imageUrl = responseImages.data[0]?.url || responseImages.data[0]?.image?.url || '';
          setImagen(imageUrl);
        } else {
          setError('No se encontraron imágenes para este perro.');
        }

        const responseInfo = await axios.get(`https://api.thedogapi.com/v1/breeds/${id}`);

        if (responseInfo.data) {
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
      {imagen && !error ? (
        <img src={imagen} alt="Perro" />
      ) : (
        error ? <p>Error de imagen: {error}</p> : null
      )}
      {dogInfo && (
        <>
          <h2>{dogInfo.name}</h2>
          <p className="dog-info">Weight: {dogInfo.weight?.metric} kg</p>
          <p className="dog-info">Height: {dogInfo.height?.metric} cm</p>
          <p className="dog-info">Life Span: {dogInfo.life_span} years</p>
          <p className="dog-info">Temperament: {dogInfo.temperament}</p>
        </>
        
      )}
      
    </div>
    <img src={imagenFondodetail} alt="Christmas Dog" className="fullscreen-image" />
    </div>
  );
}

export default Detail;