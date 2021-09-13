const jwt = require('jsonwebtoken');
module.exports = function(req, res, next) {
  if (req.headers['authorization']) {
    let token = req.headers['authorization'].split(' ')[1];
    let decoded = jwt.decode(token);
    if (
      token &&
      decoded.exp !== undefined &&
      decoded.exp <= Date.now() / 1000
    ) {
      return res.json({
        success: false,
        token: false,
        error: 'invalid token, please login'
      });
    } else if (decoded.exp == undefined) {
      res.json({
        success: false,
        token: false,
        error: 'illegal token'
      });
    } else {
      next();
    }
  } else {
    return res.json({
      success: false,
      token: false,
      error: 'didnt provide token'
    });
  }
};
