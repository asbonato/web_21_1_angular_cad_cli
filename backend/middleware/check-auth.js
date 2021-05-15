const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  //split quebra a string em 2 usando espaço como separador
  //ou seja, gera um vetor em que a primeira posição contém
  //a palavra Bearer e a segunda contém o token desejado
  try {
    const token = req.headers.authorization.split(" ")[1];
    const tokenDecodificado = jwt.verify(token, "minhasenha");
    //as propriedades que acessamos de tokenDecodificado são aquelas que codificamos ao
    //chamar o método sign, no endpoint de login
    req.dadosUsuario = {
      email: tokenDecodificado.email,
      idUsuario: tokenDecodificado.id
    }
    //jwt.verify(token, "minhasenha");
    next()
  }
  //se não existir o header authorization, tratamos o erro
  catch(err){
    res.status(401).json({
      mensagem: "Autenticação falhou"
    })
  }
}
