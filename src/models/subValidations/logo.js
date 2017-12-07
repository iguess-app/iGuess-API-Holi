'use strict'

const mongoose = require('mongoose')

const Schema = mongoose.Schema

const logoSchema = new Schema({
  mini: {
    type: String,
    required: true
  },
  small: {
    type: String,
    required: true
  },
  normal: {
    type: String,
    required: true
  }
})

module.exports = logoSchema