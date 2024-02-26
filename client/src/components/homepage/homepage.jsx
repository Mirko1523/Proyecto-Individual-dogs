import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getDogs,
  getByDogsName,
  filterByOrigin,
  getDogsTemperaments,
  filterByTemperament,
  orderByName,
  orderByWeight,
} from '../../redux/actions/index';
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
  const filteredDogs = useSelector((state) => state.filteredDogs);
  const [currentPage, setCurrentPage] = useState(1);
  const cardPerPage = 8;
  const temperaments = useSelector((state) => state.temperaments);

  useEffect(() => {
    dispatch(getDogs());
    dispatch(getDogsTemperaments());
  }, [dispatch]);

  useEffect(() => {
}, [filteredDogs, allDogs]);

  const handleTemperamentChange = (event) => {
    const selectedValue = event.target.value;
    dispatch(filterByTemperament(selectedValue));
  };

  const handleOriginChange = (event) => {
    const selectedValue = event.target.value;
    dispatch(filterByOrigin(selectedValue));
  };

  const handleSortChange = (event) => {
    const selectedValue = event.target.value;
    dispatch(orderByName(selectedValue));
  };

  const handleWeightChange = (event) => {
    const selectedValue = event.target.value;
     console.log('Selected Weight Option:', selectedValue);
    dispatch(orderByWeight(selectedValue));
  };

  const indexOfLastCard = currentPage * cardPerPage;
  const indexOfFirstCard = indexOfLastCard - cardPerPage;
  const currentCards = filteredDogs.slice(indexOfFirstCard, indexOfLastCard);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearchName = (name) => {
    setCurrentPage(1);
    dispatch(getByDogsName(name));
  };

  return (
    <div className="homepages-container">
      <div className="content">
        <Nav />
        <SearchBar onSearch={handleSearchName} />
        <Filter
          handleTemperamentChange={handleTemperamentChange}
          handleOriginChange={handleOriginChange}
          handleSortChange={handleSortChange}
          handleWeightChange={handleWeightChange}
          temperaments={temperaments}
        />
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
