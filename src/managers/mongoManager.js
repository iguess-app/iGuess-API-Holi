// mongoose.connect(`mongodb://${user}:pass@localhost:port/database`, {
const mongoose = require('mongoose');
const db = mongoose.createConnection();
db.open('localhost', 'iguess');

module.exports = () => db