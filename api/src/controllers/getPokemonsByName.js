const axios = require("axios");
const { Pokemon, Type, pokemon_type } = require("../db");

const getPokemonByName = async (req, res) => {
  const { name } = req.query;
  try {
    const response = await axios(
      "https://pokeapi.co/api/v2/pokemon/?limit=10000000"
    );
    const data = response.data.results;

    if (name.length >= 3) {
      //searching algorithm for api, db and dbtypes pokemons
      const firstFive = name.slice(0, 5);

      let finded = data.find(
        (item) =>
          item.name[0] +
            item.name[1] +
            item.name[2] +
            item.name[3] +
            item.name[4] ===
          firstFive
      );

      const db = await Pokemon.findAll();
      let findedDb = undefined;
      const searchDb = db.forEach((pokemon) => {
        if (
          pokemon.dataValues.name[0] +
            pokemon.dataValues.name[1] +
            pokemon.dataValues.name[2] +
            pokemon.dataValues.name[3] +
            pokemon.dataValues.name[4] ===
          firstFive
        ) {
          findedDb = pokemon.dataValues;
          return findedDb;
        }
      });
      const typeInt = await pokemon_type.findAll();
      let types = [];
      const insertTypes = typeInt.forEach((element) => {
        if (findedDb) {
          if (element.dataValues.pokemonId === findedDb.id) {
            types.push(element.dataValues.typeId);
          }
        }
      });
      let pokemonTypes = await Promise.all(
        types.map(async (element) => {
          const type = await Type.findByPk(element);
          return type.name;
        })
      );

      //responses
      if (finded && findedDb) {
        const findedPokemon = await axios(`${finded.url}`);
        const findedData = findedPokemon.data;
        if (findedData) {
          const id = findedData.id;
          const name = findedData.species.name;
          const image = findedData.sprites.front_default;
          const life = findedData.stats[0].base_stat;
          const attack = findedData.stats[1].base_stat;
          const defense = findedData.stats[2].base_stat;
          const speed = findedData.stats.forEach((element) => {
            if (element.stat.name === "speed") {
              return element.base_stat;
            } else return;
          });
          let height = "none";
          if (findedData.height) {
            height = data.height;
          }
          let weight = "none";
          if (findedData.weight) {
            weight = findedData.weight;
          }
          let types = [];
          await findedData.types.forEach((type) => {
            types.push(type.type.name);
          });
          
          res.status(203).json({
            pokemons: {
              origin: "api&db",
              pokemons: [
                {
                  id,
                  name,
                  image,
                  life,
                  attack,
                  defense,
                  speed,
                  height,
                  weight,
                  types,
                  origin: "api",
                },
                {
                  id: findedDb.id,
                  name: findedDb.name,
                  image: findedDb.image,
                  life: findedDb.life,
                  attack: findedDb.attack,
                  defense: findedDb.defense,
                  speed: findedDb.speed,
                  height: findedDb.height,
                  weight: findedDb.weight,
                  types: pokemonTypes,
                  origin: "db",
                },
              ],
            },
          });
        }
      } else if (!findedDb && finded) {
        const findedPokemon = await axios(`${finded.url}`);
        const findedData = findedPokemon.data;
        if (findedData) {
          const id = findedData.id;
          const name = findedData.species.name;
          const image = findedData.sprites.front_default;
          const life = findedData.stats[0].base_stat;
          const attack = findedData.stats[1].base_stat;
          const defense = findedData.stats[2].base_stat;
          let speed = "none";
          await findedData.stats.forEach((element) => {
            if (element.stat.name === "speed") {
              speed = element.base_stat;
            } else return;
          });
          let height = "none";
          if (findedData.height) {
            height = data.height;
          }
          let weight = "none";
          if (findedData.weight) {
            weight = findedData.weight;
          }
          let types = [];
          await findedData.types.forEach((type) => {
            types.push(type.type.name);
          });
          res.status(201).json({
            pokemon: {
              id,
              name,
              image,
              life,
              attack,
              defense,
              speed,
              height,
              weight,
              types,
              origin: "api",
            },
          });
        }
      } else if (findedDb && !finded) {
        res.status(202).json({
          pokemon: {
            id: findedDb.id,
            name: findedDb.name,
            image: findedDb.image,
            life: findedDb.life,
            attack: findedDb.attack,
            defense: findedDb.defense,
            speed: findedDb.speed,
            height: findedDb.height,
            weight: findedDb.weight,
            types: pokemonTypes,
            origin: "db",
          },
        });
      } else {
        throw new Error("pokemon not found");
      }

      // for(let i = 0; i > nameSplitted.length; i++){
      //     let finded = data.find((item) => item.name[0] + item.name[1] + item.name[2] + item.name[3] + item.name[4] === )
      // }
    } else {
      throw new Error("please enter at least 5 characters");
    }
  } catch (error) {
    res.send(error.message);
  }
};
module.exports = getPokemonByName;
