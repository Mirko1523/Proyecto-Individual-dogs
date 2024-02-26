import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { postDog, getDogsTemperaments } from '../../redux/actions/index';
import './agregarperritos.styles.css';


function validate(input) {
  let errors = {};
  if (!input.name.trim()) {
    errors.name = 'Write a name, please';
  } else if (parseInt(input.name)) {
    errors.name = 'Name is invalid, please use at least one letter at the beginning';
  }
  if (!input.image) {
    errors.image = 'Upload an image, please';
  }
  if (!input.temperament.length) {
    errors.temperament = 'Select one or more temperaments, please';
  }
  if (input.heightMin < 0 || input.heightMin > 100) {
    errors.heightMin = 'Require field, please write a valid number between 1 and 100';
  }
  if (input.heightMax < 1 || input.heightMax > 100) {
    errors.heightMax = 'Require field, please write a valid number between 1 and 100';
  }
  if (input.heightMax < input.heightMin) {
    errors.heightMin = 'The minimum value cannot be greater than the maximum value';
  }

  if (input.weightMin < 0 || input.weightMin > 100) {
    errors.weightMin = 'Require field, please write a valid number between 1 and 100';
  }
  if (input.weightMax < 1 || input.weightMax > 100) {
    errors.weightMax = 'Require field, please write a valid number between 1 and 100';
  }
  if (input.weightMax < input.weightMin) {
    errors.weightMin = 'The minimum value cannot be greater than the maximum value';
  }
  if (input.lmin < 0 || input.lmin > 19) {
    errors.lmin = 'Require field, please write a valid number between 1 and 19';
  }
  if (input.lmax < 0 || input.lmax > 19) {
    errors.lmax = 'Require field, please write a valid number between 1 and 19';
  }
  if (input.lmax < 10 && input.lmax < input.lmin) {
    errors.lmin = 'The minimum value cannot be greater than the maximum value';
  }
  return errors;
}

export default function DogCreate() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const temperaments = useSelector((state) => state.temperaments);

  const [errors, setErrors] = useState({});
  const [input, setInput] = useState({
    name: '',
    image: '',
    heightMin: '',
    heightMax: '',
    weightMin: '',
    weightMax: '',
    lmin: '',
    lmax: '',
    temperament: [],
    origin: 'database',
  });

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(validate({
      ...input,
      [e.target.name]: e.target.value,
    }));
  }

  function handleSelectTemperament(e) {
    const selectedTemperament = e.target.value;

    // Verifica si el temperamento seleccionado aún no está en la matriz
    if (!input.temperament.includes(selectedTemperament)) {
      setInput({
        ...input,
        temperament: [...input.temperament, selectedTemperament],
      });
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
    if (
      !Object.keys(errors).length &&
      input.name &&
      input.image &&
      input.heightMin &&
      input.heightMax &&
      input.weightMin &&
      input.weightMax &&
      input.lmin &&
      input.lmax &&
      input.temperament.length
    ) {
       const dogWithOrigin = {
        ...input,
        origin: 'database', // Agregamos la propiedad 'origin' para distinguir el origen
        height: `${input.heightMin} - ${input.heightMax}`,
        weight: `${input.weightMin} - ${input.weightMax}`,
        life_span: `${input.lmin} - ${input.lmax} years`,
        
      };
      console.log('Dog with Origin:', dogWithOrigin);
       dispatch(postDog(dogWithOrigin));

      alert('Dog created successfully');
      setInput({
        name: '',
        image: '',
        heightMin: '',
        heightMax: '',
        weightMin: '',
        weightMax: '',
        lmin: '',
        lmax: '',
        temperament: [],
        origin: 'database',
      });
    } else {
      alert('Dog not created...');
      return;
    }
    navigate('/home');
  }

  function handleDelete(el) {
    setInput({
      ...input,
      temperament: input.temperament.filter((temp) => temp !== el),
    });
  }

  useEffect(() => {
    dispatch(getDogsTemperaments());
  }, [dispatch]);

  return (
    
    <div className="fondo_2">
 
      <div className="container">
        <Link as={Link} to="/home">
          <button className="homeBtn customHomeBtn">HOME</button>
        </Link>
        <h1 className="customTitle">Dog Create</h1>
        <form onSubmit={(e) => handleSubmit(e)} >
          <div>
            <input
              className="input"
              placeholder="Dog Name"
              type="text"
              value={input.name}
              name="name"
              onChange={(e) => handleChange(e)}
            />
            {errors.name && <p className="error">{errors.name}</p>}
          </div>
          <div>
            <input
              className="input"
              placeholder="Image"
              type="text"
              value={input.image}
              name="image"
              alt="not found"
              onChange={(e) => handleChange(e)}
            />
            {errors.image && <p className="error">{errors.image}</p>}
          </div>
          <div>
            <input
              className="input"
              placeholder="Min height"
              type="number"
              value={input.heightMin}
              name="heightMin"
              onChange={(e) => handleChange(e)}
            />
            {errors.heightMin && <p className="error">{errors.heightMin}</p>}
          </div>
          <div>
            <input
              className="input"
              placeholder="Max height"
              type="number"
              value={input.heightMax}
              name="heightMax"
              onChange={(e) => handleChange(e)}
            />
            {errors.heightMax && <p className="error">{errors.heightMax}</p>}
          </div>
          <div>
            <input
              className="input"
              placeholder="Min weight"
              type="number"
              value={input.weightMin}
              name="weightMin"
              onChange={(e) => handleChange(e)}
            />
            {errors.weightMin && <p className="error">{errors.weightMin}</p>}
          </div>
          <div>
            <input
              className="input"
              placeholder="Max weight"
              type="number"
              value={input.weightMax}
              name="weightMax"
              onChange={(e) => handleChange(e)}
            />
            {errors.weightMax && <p className="error">{errors.weightMax}</p>}
          </div>
          <div>
            <input
              className="input"
              placeholder="Min life years"
              type="number"
              value={input.lmin}
              name="lmin"
              onChange={(e) => handleChange(e)}
            />
            {errors.lmin && <p className="error">{errors.lmin}</p>}
          </div>
          <div>
            <input
              className="input"
              placeholder="Max life years"
              type="number"
              value={input.lmax}
              name="lmax"
              onChange={(e) => handleChange(e)}
            />
            {errors.lmax && <p className="error">{errors.lmax}</p>}
          </div>
          <label> Temperaments </label>
          <div className="temperaments-container">
         
       <select
  multiple
  onChange={(e) => handleSelectTemperament(e)}
  value={input.temperament}
>
  {temperaments.map((temperamento) => (
    <option key={temperamento.id} value={temperamento.name}>
      {temperamento.name}
    </option>
  ))}
</select>

          </div>
          
          <div>
            <button className="create" type="submit">
              CREATE
            </button>
          </div>
        </form>
        {input.temperament.map((el) => (
          <ul className="input_temperament" key={el}>
            <li>
              <p>{el}</p>
              <button className="x" onClick={() => handleDelete(el)}>
                X
              </button>
            </li>
          </ul>
          
        ))}
      
      </div>
    </div>
  );
}
