const { getCharacterByPlanet } = require('../controllers/planets.controller');

const planetHandler = async (req, res) => {
    const { name } = req.query;
    console.log('Nombre del planeta recibido:', name);  // Log para ver el parámetro recibido
    try {
        if (!name) {
            throw new Error('El parámetro "name" es obligatorio');
        }
        const planet = await getCharacterByPlanet(name);
        console.log('Planeta encontrado:', planet);  // Log para ver el resultado
        res.status(200).json(planet);
    } catch (error) {
        console.error('Error al traer los planetas:', error);  // Log para ver el error
        res.status(400).json({ error: "Error al traer los planetas"});
    }
};

module.exports = planetHandler;