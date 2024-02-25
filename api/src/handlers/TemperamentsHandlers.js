require("dotenv").config();
const { Temperaments, } = require("../db");

const getAllDogsTemperaments = async (req, res) => {
    try {
			const { notRepetTemp,tempApi } = req;
      const countTempDB = await Temperaments.count();
			if (countTempDB === 0) {
				await tempApi.map(
					async e => {
						await Temperaments.create({ name: e.name })
					}
				);
			}
    	res.json(tempApi);
  } catch (error) {
    res.json(error.message);
  }
};

module.exports = {
  getAllDogsTemperaments,
};
