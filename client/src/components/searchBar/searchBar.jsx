import React, { useState } from 'react';
import { connect } from 'react-redux';
import { getDogs, getByDogsName } from '../../redux/actions/index'
 import './searchbar.styles.css'

//se declara un componente(searchbar) que recibe un parametro(getDogs)
function SearchBar({ getDogs }) {
  //utilizo el hook useState(gestiona el estado del componente)
  const [input, setInput] = useState({
    //almacenara la entrada del usuario
    buscar: ''
  });

  const handleInputChange = function (e) {
    setInput({
      [e.target.name]: e.target.value
    });
  };

  const handleOnClick = async () => {
    await getDogs(input.buscar);
    console.log("Nuevo estado después de la búsqueda:", input.buscar);
    setInput({
      buscar: ''
    });
  };

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
    </div>
  );
}

export default connect(null, { getDogs, getByDogsName })(SearchBar);
