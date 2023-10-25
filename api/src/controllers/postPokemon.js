const axios = require('axios')
const {Pokemon, Type, pokemon_type} = require('../db')

const postPokemon = async(req, res) => {
    
    try {
        const {name, image, life, attack, defense, speed, height, weight, typeId} = req.body;

        if(!name, !image, !life, !attack, !defense, !speed, !height, !weight, !typeId){
            return res.status(401).send('Please complete all the camps to proceed')
        }

        const typeInt = typeId.replace(/\s/g, "").split(',').map((numStr) => parseInt(numStr))
        const newPokemon = await Pokemon.create({name, image, life, attack, defense, speed, height, weight})
        await newPokemon.setTypes(typeInt)
        let pokemonTypes = await Promise.all(
            typeInt.map(async (element) => {
                const type = await Type.findByPk(element);
                return type.name;
            })
        )
        
        
        
        res.json({msg:'pokemon created correctly!', pokemon: newPokemon, types: pokemonTypes})
    } catch (error) {
        res.send(error.message)
    }


}
module.exports = postPokemon