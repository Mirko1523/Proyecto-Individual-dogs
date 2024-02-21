// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { getDogs, setSortOrder } from '../../redux/actions/index';
// import './filter.styles.css';  // Importa tu archivo CSS para los estilos

// const Filter = () => {
//   const dispatch = useDispatch();
//   const allDogs = useSelector(state => state.allDogs);
//   const [selectedTemperament, setSelectedTemperament] = useState('');
//   const [selectedOrigin, setSelectedOrigin] = useState('');
//   const [sortOption, setSortOption] = useState('');

//   useEffect(() => {
//     dispatch(getDogs());
//   }, [dispatch]);

//   const temperaments = [...new Set(
//     allDogs.reduce((acc, dog) => (dog.temperament ? [...acc, ...dog.temperament.split(',').map(item => item.trim())] : acc), [])
//   )];

//   const origins = [...new Set(
//     allDogs.reduce((acc, dog) => (dog.origin ? [...acc, ...dog.origin.split(',').map(item => item.trim())] : acc), [])
//   )];

//   const handleTemperamentChange = (event) => {
//     setSelectedTemperament(event.target.value);
//   };

//   const handleOriginChange = (event) => {
//     setSelectedOrigin(event.target.value);
//   };

//   const handleSortChange = (event) => {
//     const selectedSortOption = event.target.value;
//     setSortOption(selectedSortOption);
//     dispatch(setSortOrder(selectedSortOption));
//   };

//   return (
//     <div className="filter-container">
//       <label className="filter-label">
//         Filtrar por Temperamento:
//         <select className="filter-select" value={selectedTemperament} onChange={handleTemperamentChange}>
//           <option value="">Todos</option>
//           {temperaments.map((temperament, index) => (
//             <option key={index} value={temperament}>
//               {temperament}
//             </option>
//           ))}
//         </select>
//       </label>

//       <label className="filter-label">
//         Filtrar por Origen:
//         <select className="filter-select" value={selectedOrigin} onChange={handleOriginChange}>
//           <option value="">Todos</option>
//           {origins.map((origin, index) => (
//             <option key={index} value={origin}>
//               {origin}
//             </option>
//           ))}
//         </select>
//       </label>

//       <label className="filter-label">
//         Ordenar por:
//         <select className="filter-select" value={sortOption} onChange={handleSortChange}>
//           <option value="alphabeticalAsc">A-Z</option>
//           <option value="alphabeticalDesc">Z-A</option>
//           <option value="weightAsc">Peso Asc</option>
//           <option value="weightDesc">Peso Desc</option>
//         </select>
//       </label>
//     </div>
//   );
// };

// export default Filter;


import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDogs, setSortOrder } from '../../redux/actions/index';
import './filter.styles.css';

const Filter = () => {
  const dispatch = useDispatch();
  const allDogs = useSelector(state => state.allDogs);
  const [selectedTemperament, setSelectedTemperament] = useState('');
  const [selectedOrigin, setSelectedOrigin] = useState('');
  const [sortOption, setSortOption] = useState('');

  useEffect(() => {
    dispatch(getDogs());
  }, [dispatch]);

  const temperaments = [...new Set(
    allDogs.reduce((acc, dog) => (dog.temperament ? [...acc, ...dog.temperament.split(',').map(item => item.trim())] : acc), [])
  )];

  const handleTemperamentChange = (event) => {
    setSelectedTemperament(event.target.value);
  };

  const handleOriginChange = (event) => {
    const selectedOrigin = event.target.value;
    setSelectedOrigin(selectedOrigin);

    if (selectedOrigin === 'API' || selectedOrigin === 'BASE_DE_DATOS') {
      console.log(`Filtrar por origen: ${selectedOrigin}`);
   
    }
  };

  const handleSortChange = (event) => {
    const selectedSortOption = event.target.value;
    setSortOption(selectedSortOption);
    dispatch(setSortOrder(selectedSortOption));
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
        <option value="alphabeticalAsc">Todos</option>
          <option value="alphabeticalAsc">A-Z</option>
          <option value="alphabeticalDesc">Z-A</option>
        </select>
      </label>
      <label className="filter-label">
        Peso:
        <select className="filter-select" value={sortOption} onChange={handleSortChange}>
          <option value="weight">Todos</option>
          <option value="weight">ASC</option>
          <option value="weight">DES</option>
        </select>
      </label>
    </div>
  );
};

export default Filter;
