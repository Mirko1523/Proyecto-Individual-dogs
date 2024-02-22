import React, { useState } from 'react';
import { connect } from 'react-redux';
import { getByDogsName } from '../../redux/actions/index';
import './searchbar.styles.css';

function SearchBar({ getByDogsName, allDogs }) {
  const [input, setInput] = useState({
    buscar: '',
   
  });

  const [searchResults, setSearchResults] = useState([]);

  const handleInputChange = function (e) {
    setInput({
      [e.target.name]: e.target.value
    });
  };

  const handleOnClick = async () => {
    try {
      console.log("Input antes de la búsqueda:", input);
      const result = await getByDogsName(input.buscar);

      // Verifica si result está definido antes de acceder a result.payload
      if (result && result.payload) {
        console.log("Nuevo estado después de la búsqueda:", result.payload);

        // Actualiza el estado de los resultados de la búsqueda
        setSearchResults(result.payload);
      }
      console.log("Input después de la búsqueda:", input);
      setInput({
        buscar: ''
      });
    } catch (error) {
      console.error('Error during search:', error.message);
    }
  };
  console.log("Renderizando component con input y searchResults:", input, searchResults);

  return (
    <div className="searchbar-div">
      <input
        className="bar-btn"
        name="buscar"
        placeholder="buscá tu perrito..."
        onChange={handleInputChange}
        value={input.buscar}
        autoComplete="off"
      ></input>
      <button className="btn" onClick={handleOnClick}>
              Buscar
      </button>

      {/* Mostrar resultados de la búsqueda */}
      {input.buscar && searchResults.length > 0 && (
        <div>
          Resultados de la búsqueda:
          <ul>
            {searchResults.map((dog) => (
              <li key={dog.id}>{dog.name}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Mostrar todos los perros si no hay búsqueda activa */}
      {!input.buscar && searchResults.length === 0 && allDogs && (
        <div>
          Todos los perros:
          <ul>
            {/* Itera sobre todos los perros */}
            {allDogs.map((dog) => (
              <li key={dog.id}>{dog.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default connect(null, { getByDogsName })(SearchBar);

