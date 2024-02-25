 require('dotenv').config();
const { createDogDB, getDogById, getDogByName, getAllDogs } = require('../controllers/dogsControllers');
// const axios = require("axios");
// const {API, APIKEY} = process.env;

const createDogDBHandler = async (req, res, next) => {
    try {
        const { name, image, height, weight, life_span, temperament } = req.body;
        console.log('Datos recibidos:', name, image, height, weight, life_span, temperament);
        // Llama directamente a la función para crear un nuevo perro en la base de datos
        const newDog = await createDogDB(name, image, height, weight, life_span, temperament);

        const response = {
            id: newDog.id,
            name: newDog.name,
            image: newDog.image,
            height: newDog.height,
            weight: newDog.weight,
            life_span: newDog.life_span,
            temperament: newDog.temperament,
        };

        res.status(201).json(response);
    } catch (error) {
        console.error('Error al crear el perro:', error);
        next(error); // Pasa el error al siguiente middleware o controlador
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

