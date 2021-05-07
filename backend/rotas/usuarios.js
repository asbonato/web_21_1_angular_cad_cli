const bcrypt = require ('bcrypt');
const express = require('express');
const router = express.Router();
const Usuario = require ('../models/usuario');

router.post('/signup', (req, res, next) => {

  bcrypt.hash(req.body.password, 10)
  .then( hash => {
    
    const usuario = new Usuario ({
      email: req.body.email,
      password: hash
    })
    usuario.save()
    .then((result) => {
      res.status(201).json({
        mensagem: "Ok",
        resultado: result
      })
    })
  })
  .catch((erro) => {
    console.log(erro);
    res.status(500).json({
      mensagem: "Tente novamente mais tarde"
    })
  })

});

module.exports = router;
