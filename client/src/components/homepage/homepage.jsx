import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDogs, orderBy, filterBy, getByDogsName } from '../../redux/actions/index';
import SearchBar from '../searchBar/searchBar';
import Nav from '../navBar/navBar';
import Cards from '../cards/cards';
import imagenFondoHome from '../../Imagenes/Christmas-dog-candy-glare_3840x2160.jpg';
import './homepage.styles.css'; 
import Pagination from '../pagination/pagination';
import Filter from '../filter/filter';

function Homepage() {
  const dispatch = useDispatch();
  const allDogs = useSelector((state) => state.allDogs);
  const [currentPage, setCurrentPage] = useState(1);
  const cardPerPage = 8; 

  useEffect(() => {
    dispatch(getDogs());
  }, [dispatch]);

  // const temperament = dogs.map((dog) => dog.temperament).flat();
  // console.log('temperaments: ', temperaments);

  const indexOfLastCard = currentPage * cardPerPage;
  const indexOfFirstCard = indexOfLastCard - cardPerPage;
  const currentCards = allDogs.slice(indexOfFirstCard, indexOfLastCard);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleOrderBy = (order) => {
    dispatch(orderBy(order));
  };

  const handleFilterBy = (filter) => {
    dispatch(filterBy(filter));
  };

  const handleSearchName = (name) => {
    console.log("Buscando perros con nombre:", name);
    setCurrentPage(0);
    dispatch(getByDogsName(name));
    console.log(allDogs)
    console.log("Estado actualizado:", allDogs);

  }


  return (
    <div className="homepages-container">
      <div className="content"> 
        <Nav />
        <SearchBar onSearch={handleSearchName} />
        <Filter handleOrderBy={handleOrderBy} handleFilterBy={handleFilterBy} />
        <Pagination
          cardPerPage={cardPerPage}
          totalCards={allDogs.length}
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

