const axios = require("axios");
const { Pokemon, Type } = require("../db");

const getTypes = async (req, res) => {
  try {
    const response = await axios("https://pokeapi.co/api/v2/type");
    const data = response.data.results;

    let types = [];

    let search = data.forEach(async (element) => {
      for (let key in element) {
        if (key === "name") {
          let typeInDb = await Type.findOrCreate({
            where: { name: element[key] },
          });
          if (typeInDb === Boolean) return;
        } else {
          return;
        }
      }
    });

    const storing = () => {
      let id = 1;
      data.map((type) => {
        types.push({ id: id, name: type.name });
        id = id + 1;
      });
    };
    storing();
    res.json(types);
  } catch (error) {
    res.send(error.message);
  }
};

module.exports = getTypes;
