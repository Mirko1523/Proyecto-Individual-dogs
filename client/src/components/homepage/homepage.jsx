import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDogs } from '../../redux/actions/index';
import SearchBar from '../searchBar/searchBar';
import Nav from '../navBar/navBar';
import Cards from '../cards/cards';
import imagenFondoHome from '../../Imagenes/Christmas-dog-candy-glare_3840x2160.jpg';
import './homepage.styles.css'; 
import Pagination from '../pagination/pagination';
import Filter from '../filter/filter';
function Homepage() {
  const dispatch = useDispatch();
  const dogs = useSelector((state) => state.allDogs);
  const [currentPage, setCurrentPage] = useState(1);
  const cardPerPage = 8; 

  useEffect(() => {
    dispatch(getDogs());
  }, [dispatch]);

  const temperaments = dogs.map((dog) => dog.temperament).flat();
  console.log('temperaments: ', temperaments);

  const indexOfLastCard = currentPage * cardPerPage;
  const indexOfFirstCard = indexOfLastCard - cardPerPage;
  const currentCards = dogs.slice(indexOfFirstCard, indexOfLastCard);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="homepages-container">
    
      <div className="content"> 
      <Nav />
        <SearchBar />
      
         <Filter/> 
        <Pagination
          cardPerPage={cardPerPage}
          totalCards={dogs.length}
          paginate={paginate}
          currentPage={currentPage}
        />
        <Cards allDogs={currentCards} />
      </div>
      <img src={imagenFondoHome} alt="Christmas Dog" className="fullscreen-images" />
    </div>
  );
}

export default Homepage;






