// const {Router} = require ('express');
// const getAllDogsTemperaments = require ('../handlers/dogsTemperamentsHandlers');

// const temperaments = Router();

// //creo una ruta para obtener TODOS los temperamentos de los perritos
// temperaments.get('/', getAllDogsTemperaments);

// module.exports = temperaments; 

const { Router } = require('express');
const { getAllDogsTemperaments } = require('../handlers/TemperamentsHandlers');

const temperaments = Router();

// Cambia la ruta para obtener TODOS los temperamentos de los perritos
temperaments.get('/', getAllDogsTemperaments);

module.exports = temperaments;
