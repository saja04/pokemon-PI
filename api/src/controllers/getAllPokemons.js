const axios = require("axios");
const { Pokemon, Type, pokemon_type } = require("../db");

const getAllPokemons = async (req, res) => {
  const { origin } = req.query;
  try {
    let response = await axios(
      `https://pokeapi.co/api/v2/pokemon/?limit=100000`
    );
    // if(limit && page){
    //     response = await axios(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`);
    // }

    const data = response.data.results;

    let pokemonsArr = [];
    const allPokemonsApi = await Promise.all(
      data.map(async (pokemon) => {
        const findedData = await axios(pokemon.url);
        if (findedData) {
          const id = findedData.data.id;
          const name = findedData.data.species.name;
          const image = findedData.data.sprites.front_default;
          const life = findedData.data.stats[0].base_stat;
          const attack = findedData.data.stats[1].base_stat;
          const defense = findedData.data.stats[2].base_stat;
          let speed = "none";
          await findedData.data.stats.forEach((element) => {
            if (element.stat.name === "speed") {
              speed = element.base_stat;
            } else return;
          });
          let height = "none";
          if (findedData.data.height) {
            height = findedData.data.height;
          }
          let weight = "none";
          if (findedData.data.weight) {
            weight = findedData.data.weight;
          }
          let types = [];
          await findedData.data.types.forEach((type) => {
            types.push(type.type.name);
          });

          const singlePokemon = {
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
          };
          // console.log(singlePokemon);
          // pokemonsArr.push(singlePokemon)
          return singlePokemon;
        }
      })
    );

    const db = await Pokemon.findAll();

    const dbWithOrigin = await Promise.all(
      db.map(async (pokemon) => {
        let types = [];
        const typeInt = await pokemon_type.findAll();
        const insertTypes = typeInt.forEach((element) => {
          if (element.dataValues.pokemonId === pokemon.dataValues.id) {
            types.push(element.dataValues.typeId);
          }
        });
        let pokemonTypes = await Promise.all(
          types.map(async (element) => {
            const type = await Type.findByPk(element);
            return type.name;
          })
        );
        return {
          id: pokemon.dataValues.id,
          name: pokemon.dataValues.name,
          image: pokemon.dataValues.image,
          life: pokemon.dataValues.life,
          attack: pokemon.dataValues.attack,
          defense: pokemon.dataValues.defense,
          speed: pokemon.dataValues.speed,
          height: pokemon.dataValues.height,
          weight: pokemon.dataValues.weight,
          types: pokemonTypes,
          origin: "db",
        };
      })
    );
    if (origin === "api") {
      return res.status(200).json(allPokemonsApi);
    } else if (origin === "db") {
      res.status(201).json(await dbWithOrigin);
    } else {
      return res.status(203).json(dbWithOrigin.concat(allPokemonsApi));
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = getAllPokemons;
