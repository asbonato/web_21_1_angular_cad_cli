const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const usuarioSchema = mongoose.Schema({
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true}
})

usuarioSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Usuario", usuarioSchema);