const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le inyectamos la conexion a sequelize.
const Temperaments = (sequelize) => {
  // defino el modelo
  sequelize.define('Temperaments', {
    id: {
      type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },{
    timestamps: false
  });
};

module.exports = Temperaments;