const R = require('ramda');

module.exports = (req, res, next) => {
  req.taxYear = null;

  if (R.has('x-run-date', req.headers)) {
    req.taxYear = req.headers['x-run-date'];
  }

  return next();
};
