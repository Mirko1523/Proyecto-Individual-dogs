import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDogs, orderBy, filterBy } from '../../redux/actions/index';
import './filter.styles.css';

const Filter = () => {
  const dispatch = useDispatch();
  const allDogs = useSelector(state => state.allDogs);
  const [selectedTemperament, setSelectedTemperament] = useState('');
  const [selectedOrigin, setSelectedOrigin] = useState('');
  const [sortOption, setSortOption] = useState('');

  useEffect(() => {
    dispatch(getDogs());
  }, []);

  const temperaments = [...new Set(
    allDogs.reduce((acc, dog) => (dog.temperament ? [...acc, ...dog.temperament.split(',').map(item => item.trim())] : acc), [])
  )];

  const handleTemperamentChange = (event) => {
    setSelectedTemperament(event.target.value);
    dispatch(filterBy(event.target.value));
  };

  const handleOriginChange = (event) => {
    const selectedOrigin = event.target.value;
    setSelectedOrigin(selectedOrigin);
    dispatch(filterBy(selectedOrigin));
  };

  const handleSortChange = (event) => {
    const selectedSortOption = event.target.value;
    setSortOption(selectedSortOption);
    dispatch(orderBy(selectedSortOption));
  };

  return (
    <div className="filter-container">
      <label className="filter-label">
        Filtrar por Temperamento:
        <select className="filter-select" value={selectedTemperament} onChange={handleTemperamentChange}>
          <option value="">Todos</option>
          {temperaments.map((temperament, index) => (
            <option key={index} value={temperament}>
              {temperament}
            </option>
          ))}
        </select>
      </label>

      <label className="filter-label">
        Filtrar por Origen:
        <select className="filter-select" value={selectedOrigin} onChange={handleOriginChange}>
          <option value="">Todos</option>
          <option value="API">API</option>
          <option value="BASE_DE_DATOS">BASE DE DATOS</option>
        </select>
      </label>

      <label className="filter-label">
        Ordenar por:
        <select className="filter-select" value={sortOption} onChange={handleSortChange}>
          <option value="">Todos</option>
          <option value="alphabeticalAsc">A-Z</option>
          <option value="alphabeticalDesc">Z-A</option>
        </select>
      </label>
      <label className="filter-label">
        Peso:
        <select className="filter-select" value={sortOption} onChange={handleSortChange}>
          <option value="">Todos</option>
          <option value="weightAsc">ASC</option>
          <option value="weightDesc">DESC</option>
        </select>
      </label>
    </div>
  );
};

export default Filter;