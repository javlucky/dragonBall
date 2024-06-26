const { createCharacter, getCharacterById, getAllCharacters, deleteCharacter, searchCharacterByName, charactersByNameInApi } = require('../controllers/characters.controller');
const { Character, Planet } = require('../db');

const charactersHandlers = async (req, res) => {
    const { name } = req.query;
    try {
        const allCharacters = name ? await charactersByNameInApi(name) : await getAllCharacters();
        //console.log('allCharacters:', allCharacters);
        res.status(200).json(allCharacters);
    } catch (error) {
        // Detalles adicionales sobre el error para mejor diagnóstico
        if (error.response) {
            console.error('Error en la respuesta de la API:', error.response.data);
        } else if (error.request) {
            console.error('No se recibió respuesta del servidor:', error.request);
        } else {
            console.error('Error en la configuración de la solicitud:', error.message);
        }
        throw error;
        //res.status(400).json({ error: error.message});
    }
};

const characterHandler = async (req, res) => {
    const { id } = req.params;
    try {
        const results = await getCharacterById(id);
        res.status(200).json(results);
    } catch (error) {
        res.status(400).json({ error: "No existe un personaje para ese ID"});
    }
}; 

const createCharacterHandler = async (req, res) => {
    const { name, race, gender, ki, maxKi, description, affiliation, originPlanet, created } = req.body;

    try {
        const newCharacter = await createCharacter( name, race, gender, ki, maxKi, description, affiliation, originPlanet, created );
        res.status(200).json(newCharacter);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const updateCharacterHandler = async (req, res) => {
    const { name, ki, maxKi } = req.body;

    try {
        const modify = await Character.update({
            name: name,
            ki: ki,
            maxKi: maxKi,
        });
        res.status(200).json(modify);
    } catch (error) {
        res.status(400).json({ error: "Error al modificar" });
     }
};

const deleteCharacterHandler = async (req, res) => {
    const { id } = req.params;

    try {
        let deletePersonaje = await deleteCharacter(id);
        res.status(200).json(deletePersonaje);
    } catch (error) {
        res.status(400).json({ error: "Error al aleminar" });
    }
};

module.exports = {
    characterHandler, createCharacterHandler, updateCharacterHandler, deleteCharacterHandler, charactersHandlers
};