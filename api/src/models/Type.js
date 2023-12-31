const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('type', {
    id:{
        primaryKey: true,
        type: DataTypes.INTEGER ,
        autoIncrement: true,
        allowNull:false
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false
    },
    // pokemonId: {
    //   type: DataTypes.INTEGER,
    //   // allowNull: false
    // }
  },{timestamps: false})
}