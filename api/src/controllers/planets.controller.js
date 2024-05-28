const { Planet } = require('../db');
const axios = require('axios');

const getCharacterByPlanet = async (name) => {
    console.log('Buscando en la base de datos el planeta con nombre:', name);
    let planetInDb = await Planet.findAll({ where: { name } });

    if (planetInDb.length === 0) {
        console.log('No se encontró en la base de datos. Solicitando a la API externa.');
        try {
            const response = await axios.get('https://dragonball-api.com/api/planets');
            const planetInApi = response.data.items.find(planet => planet.name === name);
            
            if (!planetInApi) {
                throw new Error(`El planeta "${name}" no fue encontrado en la API.`);
            }

            console.log('Datos obtenidos de la API externa:', planetInApi);
            await Planet.create({
                name: planetInApi.name,
                isDestroyed: planetInApi.isDestroyed,
                description: planetInApi.description,
                // Si la imagen está disponible en la respuesta de la API, puedes agregarla aquí
            });

            planetInDb = await Planet.findAll({ where: { name } });
        } catch (error) {
            console.error('Error al obtener el planeta de la API externa:', error);
            throw new Error('Error al obtener el planeta de la API externa.');
        }
    }

    return planetInDb;
};

module.exports = { getCharacterByPlanet };