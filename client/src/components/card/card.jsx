import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './card.styles.css';

function Card({ dog }) {
  const { name, temperaments, weight, id } = dog;
  const dogId = id;
  console.log('temperaments in Card:', temperaments);
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    const fetchDogImage = async () => {
      try {
          const response = await axios.get(`https://api.thedogapi.com/v1/images/search?breed_id=${dogId}`);

        await new Promise(resolve => setTimeout(resolve, 500));

        const image = response.data[0]?.url || '';
        setImageUrl(image);
      } catch (error) {
        console.error('Error al obtener la imagen del perro:', error.message);
        setImageUrl('');
      }
    };

    fetchDogImage();
  }, [dogId]);

  return (
    <Link to={`/detail/${dogId}`} className="dog-card-link">
    <div className="dog-card">
        {imageUrl && <img src={imageUrl} alt={name} className='dog-card-img' />}
        <h2>Breed: {name ? name : 'No se encontró el nombre'}</h2>
         <p>Temperaments: {temperaments ? temperaments.join(', ') : 'No se encontraron temperamentos'}</p> 
        <p>Weight: {weight && weight.metric ? `${weight.metric} kg` : 'No hay peso disponible'}</p>
    </div>
      </Link>
  );
}

export default Card;
