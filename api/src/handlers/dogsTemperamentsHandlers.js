// const axios = require('axios')
// require('dotenv').config();
// const { API, APIKEY } = process.env;

// //el req y el res manejan la logica para obtener la info de los temperamentos
// const getAllDogsTemperaments = async (req, res) => {
//     try {
//         let response = await axios(`${API}?api_key=${APIKEY}`);
// //se utiliza map para transformar la respuesta de la API
//         let info = response.data.map(dog => ({
            
//             temperament: dog.temperament 
  
//         }))
  
// //luego de que la info se extrae la info de la respuesta de la API arriba se envia la info como respuesta
// //JSON
//         res.json(info)
// //y acá se pone esto por si hay un error ya que para eso funciona el catch
//     } catch (error) {
//         res.json(error.message)
//     }
// }

// module.exports = getAllDogsTemperaments;

const axios = require('axios');
require('dotenv').config();
const { API, APIKEY } = process.env;

// Handler que obtiene los temperamentos
const getAllDogsTemperaments = async (req, res) => {
    try {
        let response = await axios(`${API}?api_key=${APIKEY}`);
        let info = response.data.map(dog => ({
            temperament: dog.temperament
        }));

        // Aplica la lógica de temperamentos directamente
        const arrayTemperament = info.map(e => e.temperament);
        const joinTemperament = arrayTemperament.join(", ").split(", ");
        const notRepetTemp = joinTemperament
            .sort()
            .filter((item, pos, self) => self.indexOf(item) === pos);
        notRepetTemp[0] === "" && notRepetTemp.shift();

        const tempApi = notRepetTemp.map((e, i) => ({
            id: i + 1,
            temperament: e
        }));

        res.json(tempApi);

    } catch (error) {
        res.json(error.message);
    }
}

module.exports = {
    getAllDogsTemperaments
};
