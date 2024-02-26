const axios = require ('axios');
require('dotenv').config();
const {API, APIKEY} = process.env;
const {Dogs} = require ('../db');
const {cleanInfoApi} = require('../utils/index');
const {Op} = require ('sequelize');
const UUID = require("../utils/UUID")


const createDogDB = async (name, image, height, weight, life_span, temperament) => {
    let formattedTemperament = '';
    if (Array.isArray(temperament) || typeof temperament === 'object') {
        formattedTemperament = temperament.join(', '); 
    } else if (typeof temperament === 'string') {
        formattedTemperament = temperament;
    }
    return await Dogs.create({ id: UUID(), name, image, height, weight, life_span, temperament: formattedTemperament });
}

const getDogByName = async (name) => {
  const infoApi = await axios.get(`${API}?api_key=${APIKEY}`);
  const dogsApi = cleanInfoApi(infoApi);
  const dogFiltered = dogsApi.filter((dog) => dog.name.toLowerCase().includes(name.toLowerCase()));
  const dogsDB = await Dogs.findAll({ where: { name: {[Op.iLike]: `%${name}%`} } });

  return [ ...dogsDB,  ...dogFiltered, ];
}

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
        // console.log(allDogs);

        for (const dog of allDogs) {
            if ((await dog.id.toString()) === id.toString()) {
                dogData = dog;
                break;
            }
        }
    } else {
        dogData = await Dogs.findByPk(id);
    }

    return dogData;
};

module.exports = {createDogDB, getDogById, getDogByName, getAllDogs  }