const axios = require('axios');
const {Pokemon, Type} = require('./src/db')


const saveApiData = async(req, res) => {
    try {
        const response = await axios('https://pokeapi.co/api/v2/type')
        const data = response.data.results;

        let search = data.forEach( async(element) => {
            for(let key in element){
                if(key === 'name'){
                    let typeInDb = await Type.findOrCreate({where: {name: element[key]}})
                    if(typeInDb === Boolean) return;
                } else {
                    return;
                }
            }
        })




    } catch (error) {
        console.log(error.message);
    }
};


module.exports = saveApiData;