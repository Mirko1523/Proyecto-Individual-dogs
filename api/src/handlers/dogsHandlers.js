require("dotenv").config();
const {API, APIKEY} = process.env;
const axios = require ("axios");

const dogHandlers = async (req, res, next) => {
    try{
        const dogsApi = await axios.get(`${API}?api_key=${APIKEY}`);
        const resDogs = dogsApi.data.map(element => ({
            id: element.id, 
            name: element.name,
            image: element.image,
            weight: element.weight.metric,
            height: element.height.metric,
            temperament: element.temperament,
        }));
    req.dataApi = resDogs;
    next();
     } catch (error){
        console.log(error);
     }
};
module.exports = dogHandlers;

