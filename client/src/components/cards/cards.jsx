import React from 'react';
import Card from '../card/card';
 import './cards.styles.css';

 function Cards({ allDogs }) {
 
  return (
    <div className='cards-list'>
      {allDogs.map((dog) => (
        <Card key={dog.id} dog={dog} temperament={dog.temperament} />
      ))}
    </div>
  );
}



export default Cards;

