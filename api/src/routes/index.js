const { Router } = require("express");
const getAllPokemons = require("../controllers/getAllPokemons");
const getPokemonById = require("../controllers/getPokemonById");
const getPokemonsByName = require("../controllers/getPokemonsByName");
const getTypes = require("../controllers/getTypes");
const postPokemon = require("../controllers/postPokemon");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get("/pokemon/", getAllPokemons);
router.get("/pokemon/:id", getPokemonById);
router.get("/pokemoname/", getPokemonsByName);
router.get("/types/", getTypes);
router.post("/pokemon/", postPokemon);

module.exports = router;
