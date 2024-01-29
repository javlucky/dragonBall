const Router = require('express');
const router = Router();
const planetHandler = require('../handlers/planets.handler');

router.get('/', planetHandler);

module.exports = router;