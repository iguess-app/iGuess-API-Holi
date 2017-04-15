'use Strict';

module.exports = () => {
  const makeObject = (queryResult) => queryResult.toObject()

  const makeJSON = (queryResult) => queryResult.toJSON()

  return {
    makeObject,
    makeJSON
  }
}