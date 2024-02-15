const {Dogs, Temperaments, temperamentsDog} = require ("../db");

const dogsTemperamentsHandlers = async (req, res, next) => {
    try {
		const { count: countDogs, rows: rowsDogs } = await Dogs.findAndCountAll();
		const { count: countTemp, rows: rowsTemp } =
			await Temperaments.findAndCountAll();
		const rowsDogsTemp = await temperamentsDog.findAll();
		if (!(countTemp && countDogs)) {
			next();
		}
		req.dataBase = { rowsTemp, rowsDogs, rowsDogsTemp };
	} catch (error) {
		console.log(error);
	}
};

module.exports =  dogsTemperamentsHandlers;