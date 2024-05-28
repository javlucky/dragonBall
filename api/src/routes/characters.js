const Router = require('express');
const { charactersHandlers, characterHandler, createCharacterHandler, updateCharacterHandler, deleteCharacterHandler } = require('../handlers/characters.handler');
const validate = require('../middlewares/validaciones');
const router = Router();


router.get('/', charactersHandlers);
router.get('/:id', characterHandler);
router.post('/create', createCharacterHandler);
router.put('/modif', updateCharacterHandler);
router.delete('/:id', deleteCharacterHandler);

module.exports = router;