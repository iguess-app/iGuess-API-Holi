'use strict'

const mongoose = require('mongoose')

const optionsSchemas = require('../optionsSchemas/optionsSchemas')

const Schema = mongoose.Schema

const logoSchema = new Schema({
  mini: {
    type: String,
    default: ''
  },
  small: {
    type: String,
    default: ''
  },
  normal: {
    type: String,
    default: ''
  }
}, optionsSchemas._idAndVersionKeyDisable)

module.exports = logoSchema