const jwt = require('jsonwebtoken');

function generateToken(userId) {
  const payload = { userId };
  const secretKey = '' //secret
  const options = { expiresIn: '1h' };
  return jwt.sign(payload, secretKey, options);
}

function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token de autenticação não fornecido' });
  }

  jwt.verify(token, 'sua_chave_secreta', (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Token de autenticação inválido' });
    }

    req.user = user;
    next();
  });
}

module.exports = generateToken;
