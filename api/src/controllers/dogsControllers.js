const axios = require ('axios');
require('dotenv').config();
const {API, APIKEY} = process.env;
const {Dogs} = require ('../db');
const {cleanInfoApi} = require('../utils/index');
const {Op} = require ('sequelize');

//CONTROLLER para crear un NUEVO PERRO
const createDogDB = async (name, image, height, weight, life_span) =>{
    return await Dog.create({name, image, height, weight, life_span})
}

//CONTROLLER para buscar un perro mediante su id
// const getDogById = async (id, source) => {
// const dogData = source === 'api' ? (await axios.get (`${API}/${id}?api_key=${APIKEY}`)).data : await Dogs.findByPk(id)
// return dogData;
// }
const getDogById = async (id, source) => {
  let dogData;

  if (source === 'api') {
    dogData = (await axios.get(`${API}/${id}?api_key=${APIKEY}`)).data;
  } else {
    dogData = await Dogs.findByPk(id);
  }

  return dogData;
};


//CONTROLLER para buscar un perro mediante su name
const getDogByName = async (name) => {
  const infoApi = await axios.get(`${API}?api_key=${APIKEY}`);
  const dogsApi = cleanInfoApi(infoApi);
  const dogFiltered = dogsApi.filter((dog) => dog.name.toLowerCase().includes(name.toLowerCase()));
   const dogsDB = await Dogs.findAll({ where: { name: {[Op.iLike]: `%${name}%`} } });

  return [ ...dogsDB,  ...dogFiltered, ];
}

//CONTROLLER para buscar todos los perros
// const getAllDogs = async () => {
//    const dogsDB = await Dog.findAll();
//     const infoAPI = await axios.get(`${API}?api_key=${APIKEY}`);
//     const dogsAPI = cleanInfoApi(infoAPI)
//     return [...dogsDB, ...dogsAPI];
// }
const getAllDogs = async () => {
  const [dogsDB, infoAPI] = await Promise.all([
    Dogs.findAll(),
    axios.get(`${API}?api_key=${APIKEY}`)
  ]);

  const dogsAPI = cleanInfoApi(infoAPI);
  return [...dogsDB, ...dogsAPI];
}


module.exports = {createDogDB, getDogById, getDogByName, getAllDogs  }