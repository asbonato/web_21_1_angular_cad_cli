require('dotenv').config();
const path = require('path');
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const clienteRoutes = require('./rotas/clientes');
const usuarioRoutes = require ('./rotas/usuarios');
app.use(cors());
app.use(express.json());
app.use('/imagens', express.static(path.join("backend/imagens")));


const Cliente = require('./models/cliente');
const { ConsoleReporter } = require('jasmine');
const user_db = process.env.MONGODB_USER;
const pass_db = process.env.MONGODB_PASSWORD;
const cluster_db = process.env.MONGODB_CLUSTER;
const name_db = process.env.MONGODB_DATABASE;

mongoose.connect(`mongodb+srv://${user_db}:${pass_db}@${cluster_db}.mongodb.net/${name_db}?retryWrites=true&w=majority`)
.then(() => {
  console.log("Conexão OK");
}).catch(() => {
  console.log("Conexão NOK");
})


app.use('/api/clientes', clienteRoutes);
app.use('/api/usuario', usuarioRoutes);

app.use('/api/clientes', (req, res, next) => {
  res.status(200).json({
    mensagem: "Tudo OK",
    clientes: clientes
  });
});

module.exports = app;
