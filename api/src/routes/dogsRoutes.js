const { Router } = require ('express')
const {getDogsHandler, getDogsDetail, createDogDB } = require ('../handlers/dogsHandlers');

const dogsRouter = Router();

dogsRouter.post ('/', createDogDB ) 
dogsRouter.get ('/', getDogsHandler) 
dogsRouter.get ('/:id', getDogsDetail) 


module.exports = dogsRouter;