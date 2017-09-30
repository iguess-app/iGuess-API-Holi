'use strict'

const Joi = require('joi')
const Config = require('iguess-api-coincidents').Config

const fixtureSchema = require('../fixture/fixtureSchema')

const ID_SIZE = Config.mongo.idStringSize

const getAllChampionshipSchemaResponse = Joi.array().items(
  Joi.object({
    _id: Joi.object().required(),
    league: Joi.string().length(ID_SIZE).required(),
    season: Joi.string().required(),
    championship: Joi.string().required(),
    championshipActive: Joi.bool().required(),
    fixturesNames: Joi.array().items(fixtureSchema).required()
  }).unknown())

module.exports = getAllChampionshipSchemaResponse