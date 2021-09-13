var jwt = require('jsonwebtoken');

module.exports = function(name) {
  const token = jwt.sign(
    {
      name: name
    },
    'secret',
    {
      expiresIn: '9000000s'
    }
  );
  return token;
};
