// TODO: swap to ESM eventually, jest doesn't support ESM yet
//import express, {Router} from "express";
//import swaggerUi from 'swagger-ui-express'
//import openapiDoc from '../../docs/schemas/openapi.json'
const express = require('express')
const router = express.Router()
const swaggerUi = require('swagger-ui-express')
const openapiDoc = require('../../docs/schemas/openapi.json')

//export const router = Router()

router.use('/', swaggerUi.serve)
router.get('/', swaggerUi.setup(openapiDoc));

module.exports = router;