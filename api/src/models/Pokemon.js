const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "pokemon",
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING(1500),
        allowNull: false,
      },
      life: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      attack: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      defense: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      speed: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      height: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      weight: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      // typeId: {
      //   type: DataTypes.INTEGER,
      //   allowNull: false
      // }
    },
    { timestamps: false }
  );
};
