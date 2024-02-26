const { DataTypes, UUIDV } = require('sequelize');

const Dogs = (sequelize) => {
  // defino el modelo
  sequelize.define('Dogs', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    
    },
    //  reference_image: { // Cambié el nombre de "image" a "reference_image"
    //   type: DataTypes.STRING,
    //   allowNull: true,
    // },
    height: {
      type: DataTypes.STRING,
      allowNull: true
    },
    weight: {
      type: DataTypes.STRING,
      allowNull: true
    },
    life_span: {
      type: DataTypes.STRING,
      allowNull: true
    },
    temperament: {
      type: DataTypes.STRING, 
      allowNull: true
    },
    created: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  },{
    timestamps: false
  });
};

module.exports = Dogs;