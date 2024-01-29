const { Router } = require('express');

const characters = require('./characters');
const planets = require('./planets');

const router = Router();

router.use('/characters', characters);
router.use('/planets', planets);

module.exports = router;