const { getCharacterByPlanet } = require('../controllers/planets.controller');

const planetHandler = async (req, res) => {
    const { name } = req.body;
    try {
        const planet = await getCharacterByPlanet(name);
        res.status(200).json(planet);
    } catch (error) {
        res.status(400).json({ error: "Error al traer los planetas"});
    }
};

module.exports = planetHandler;