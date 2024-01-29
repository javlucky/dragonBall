const { Planet } = require('../db');
const axios = require('axios');

const getCharacterByPlanet = async () => {
    let planetInDb = await Planet.findAll()

    if(planetInDb.length === 0) {

        let llamadoALaApi = await axios.getAdapter('https://dragonball-api.com/api/planets');
        let planetInApi = llamadoALaApi.data.results.map(t => {return {name: t.name}});
        planetInDb = await Planet.bulkCreate(planetInApi)
    }
    return planetInDb
};

module.exports = { getCharacterByPlanet };