const axios = require ('axios');
require('dotenv').config();
const {API, APIKEY} = process.env;
const {Dogs} = require ('../db');
const {cleanInfoApi} = require('../utils/index');
const {Op} = require ('sequelize');
const UUID = require("../utils/UUID")

//CONTROLLER para crear un NUEVO PERRO
const createDogDB = async (name, image, height, weight, life_span, temperament) => {

    let formattedTemperament = '';

    if (Array.isArray(temperament) || typeof temperament === 'object') {
    
        formattedTemperament = temperament.join(', '); 
    } else if (typeof temperament === 'string') {
        formattedTemperament = temperament;
    }

    return await Dogs.create({ id: UUID(), name, image, height, weight, life_span, temperament: formattedTemperament });
}

//CONTROLLER para buscar un perro mediante su name
const getDogByName = async (name) => {
  const infoApi = await axios.get(`${API}?api_key=${APIKEY}`);
  const dogsApi = cleanInfoApi(infoApi);
  const dogFiltered = dogsApi.filter((dog) => dog.name.toLowerCase().includes(name.toLowerCase()));
  const dogsDB = await Dogs.findAll({ where: { name: {[Op.iLike]: `%${name}%`} } });

  return [ ...dogsDB,  ...dogFiltered, ];
}

//CONTROLLER para buscar todos los perros

const getAllDogs = async () => {
  const [dogsDB, infoAPI] = await Promise.all([
    Dogs.findAll(),
    axios.get(`${API}?api_key=${APIKEY}`)
  ]);
  
  
  const dogsAPI = cleanInfoApi(infoAPI);
  return [...dogsDB, ...dogsAPI];
}


const getDogById = async (id, source) => {
    let dogData;
  
    if (source === 'api') {
        const allDogs = await getAllDogs();
        console.log(allDogs);
        dogData = await allDogs.find(async (dog) => (await dog.id.toString()) === id.toString());
    } else {
        dogData = await Dogs.findByPk(id);
    }
  
    return dogData;
  };


module.exports = {createDogDB, getDogById, getDogByName, getAllDogs  }