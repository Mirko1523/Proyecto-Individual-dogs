const {axios} = require ('axios');
require('dotenv').config();
const {URL} = process.env;
const {Dog} = require ('../db');
const {cleanInfoApi} = require('../utils/index');
const {Op} = require ('sequelize');

//CONTROLLER para crear un NUEVO PERRO
const CreateDogDB = async (name, image, height, height, weight, life_span) =>{
    return await Dog.create({name, image, height, weight, life_span})
}

//CONTROLLER para buscar un perro mediante su id
const getDogById = async (id, source) => {
const dogData = source === 'api' ? (await axios.get (`${URL}/${id}`)).data : await Dog.findByPk(id)
return dogData;
}

//CONTROLLER para buscar un perro mediante su name
const getDogByName = async () => {
  const infoApi = await axios.get(URL);
  const dogsApi = cleanInfoApi(infoApi);
  const dogFiltered = dogsApi.filter((dog) => dog.name.toLowerCase().includes(name.toLowerCase()));
  const dogsDB = await Dog.findAll({ where: { name: {[Op.iLike]: `%${name}%`} } });

  return [...dogFiltered, ...dogsDB];
}

//CONTROLLER para buscar todos los perros
const getAllDogs = async () => {
    const dogsDB = await Dog.findAll();
    const infoAPI = await axios.get(URL);
    const dogsAPI = cleanInfoApi(infoAPI)
    return [...dogsDB, ...dogsAPI];
}


module.exports = {CreateDogDB, getDogById, getDogByName, getAllDogs  }