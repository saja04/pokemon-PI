const axios = require("axios");
const { Pokemon, Type, pokemon_type } = require("../db");

const getPokemonsById = async (req, res) => {
  const { id } = req.params;
  try {
    if (!isNaN(id)) {
      const response = await axios(
        "https://pokeapi.co/api/v2/pokemon/" + id + "/"
      );
      const data = response.data;
      if (data) {
        const id = data.id;
        const name = data.species.name;
        const image = data.sprites.front_default;
        const life = data.stats[0].base_stat;
        const attack = data.stats[1].base_stat;
        const defense = data.stats[2].base_stat;
        let speed = "none";
        await data.stats.forEach((element) => {
          if (element.stat.name === "speed") {
            speed = element.base_stat;
          } else return;
        });
        let height = "none";
        if (data.height) {
          height = data.height;
        }
        let weight = "none";
        if (data.weight) {
          weight = data.weight;
        }
        let types = [];
        await data.types.forEach((type) => {
          console.log(type);
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
    } else if (isNaN(id)) {
      const typeInt = await pokemon_type.findAll();
      let types = [];
      const insertTypes = typeInt.forEach((element) => {
        if (element.dataValues.pokemonId === id) {
          types.push(element.dataValues.typeId);
        }
      });
      let pokemonTypes = await Promise.all(
        types.map(async (element) => {
          const type = await Type.findByPk(element);
          return type.name;
        })
      );
      Pokemon.findOne({
        where: { id: id },
      })
        .then((pokemon) => {
          res.status(202).json({
            pokemon: {
              id: pokemon.id,
              name: pokemon.name,
              image: pokemon.image,
              life: pokemon.life,
              attack: pokemon.attack,
              defense: pokemon.defense,
              speed: pokemon.speed,
              height: pokemon.height,
              weight: pokemon.weight,
              types: pokemonTypes,
              origin: "db",
            },
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  } catch (error) {
    res.status(401).send(error.message);
  }
};

module.exports = getPokemonsById;
