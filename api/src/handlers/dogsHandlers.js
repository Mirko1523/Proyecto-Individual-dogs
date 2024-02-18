require('dotenv').config();
const { createDogDB, getDogById, getDogByName, getAllDogs } = require('../controllers/dogsControllers');


// Handler para crear un perro
const createDogDBHandler = async (req, res) => {
    const { name, image, height, weight, life_span } = req.body;
    try {
        const newDog = await createDogDB( name, image, height, weight, life_span );
        console.log('tu perro ha sido creado!')
        return res.status(201).json(newDog);
    } catch (error) {
        console.error('Error al crear el perro:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

// Handler para obtener los diferentes perros
const getDogsHandler = async (req, res) => {

    const {name} = req.query;

    try {
        if(name){
            const dogByName = await getDogByName(name);
            res.status(200).json(dogByName);
        } else {
            const response = await getAllDogs();
            res.status(200).json(response);
        }
    } catch (error) {
        console.error('Error al obtener datos de la API:', error);
    }
}

//Handler para obtener los detalles de los perros
const getDogsDetail = async (req, res) => {
    
    const { id } = req.params;
    
    const source = isNaN(id) ? 'bdd' : 'api';
    
    try {
        const response = await getDogById(id, source);
            return res.status(200).json(response)   
    } catch (error) {
        return res.status(400).json(console.log(error))
    }
}

module.exports = {
    getDogsHandler,
    getDogsDetail,
    createDogDB: createDogDBHandler
}





// require("dotenv").config();
// const {API, APIKEY} = process.env;
// const axios = require ("axios");

// const dogHandlers = async (req, res, next) => {
//     try{
//         const dogsApi = await axios.get(`${API}?api_key=${APIKEY}`);
//         const resDogs = dogsApi.data.map(element => ({
//             id: element.id, 
//             name: element.name,
//             image: element.image,
//             weight: element.weight.metric,
//             height: element.height.metric,
//             temperament: element.temperament,
//         }));
//     req.dataApi = resDogs;
//     next();
//      } catch (error){
//         console.log(error);
//      }
// };
// module.exports = dogHandlers;

