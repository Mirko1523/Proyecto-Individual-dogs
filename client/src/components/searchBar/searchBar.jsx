import { useState } from "react";
import './searchbar.styles.css'
const SearchBar = ({ onSearch }) => {
  const [name, setName] = useState('');

  const search = () => {
    const trimmedName = name.trim();

    if (trimmedName === '' || !/^[A-Za-z\s]+$/.test(trimmedName)) {
      alert('Por favor, ingrese un nombre de raza válido');
      return;
    }

    onSearch(trimmedName);
    setName('');
  };

  return (
    <div className="searchbar-div">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Buscar por nombre de raza"
        className="bar-btn"
      />
      <button onClick={search} className="btn">Buscar perrito</button>
    </div>
  );
}

export default SearchBar;
