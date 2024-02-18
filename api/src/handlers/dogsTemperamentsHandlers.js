const axios = require('axios')
require('dotenv').config();
const { API, APIKEY } = process.env;

//el req y el res manejan la logica para obtener la info de los temperamentos
const getAllDogsTemperaments = async (req, res) => {
    try {
        let response = await axios(`${API}?api_key=${APIKEY}`);
//se utiliza map para transformar la respuesta de la API
        let info = response.data.map(dog => ({
            
            temperament: dog.temperament
        }))
//luego de que la info se extrae la info de la respuesta de la API arriba se envia la info como respuesta
//JSON
        res.json(info)
//y acá se pone esto por si hay un error ya que para eso funciona el catch
    } catch (error) {
        res.json(error.message)
    }
}

module.exports = getAllDogsTemperaments;