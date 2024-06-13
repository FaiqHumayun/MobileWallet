const { verify } = require('jsonwebtoken');
require('dotenv').config();

exports.authenticateUser = (req, res, next) => {
  const authorization = req.headers.authorization;

  if (!authorization) throw new Error('You need to login to proceed.');

  const token = authorization.split(' ')[1];

  verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403);
    req.userId = decoded.userId;
    next();
  });
};