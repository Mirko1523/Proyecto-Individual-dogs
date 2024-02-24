const { Router } = require('express');
//importo rutas.
const dogsRoutes = require('./dogsRoutes')
const temperaments = require ('./TemperamentsRoutes')
const dogsTemperaments = require('../handlers/dogsTemperaments')


const router = Router();
//creo las rutas
router.use (dogsTemperaments)
router.use ('/dogs', dogsRoutes)
router.use ('/temperaments', temperaments)



module.exports = router;
