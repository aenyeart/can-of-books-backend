const jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa');

const client = jwksClient({
  jwksUri: process.env.JWKS_URI,
});

function getKey(header, callback) {
  client.getSigningKey(header.kid, function(err, key) {
    const signingKey = key.publicKey || key.rsaPublicKey;
    callback(null, signingKey);
  });
}

function verifyUser(req, errorFirstOrUser) {
  try {
    const token = req.headers.authorization.split(' ')[1];
    console.log(token, "The token from verifyUser()");
    jwt.verify(token, getKey, {}, errorOrUser);
  } catch (error) {
    errorFirstOrUser('Not authorized')
  }
}

module.exports = verifyUser;