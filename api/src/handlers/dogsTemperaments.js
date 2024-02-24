const { API, APIKEY } = process.env
const axios = require("axios")
const {Dogs, Temperaments} = require("../db")

const dogsTemperaments = async (req,res, next) => {
        let response = await axios(`${API}?api_key=${APIKEY}`);
        let info = response.data.map(dog => ({
            temperament: dog.temperament
        }));


        const arrayTemperament = info.map(e => e.temperament);
        const joinTemperament = arrayTemperament.join(", ").split(", ");
        const notRepetTemp = joinTemperament
            .sort()
            .filter((item, pos, self) => self.indexOf(item) === pos);
        notRepetTemp[0] === "" && notRepetTemp.shift();

        const tempApi = notRepetTemp.map((e, i) => ({
            id: i + 1,
            name: e
        }));
        const dogsFromDB = await Dogs.findAll({
			include: [{ model: Temperaments }]
		});
        req.notRepetTemp = notRepetTemp
        req.tempApi = tempApi
        next()
    }
module.exports = dogsTemperaments
