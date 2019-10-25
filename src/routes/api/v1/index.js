const { Router } = require('express');
const setIncome = require('../../../middleware/set-income');
const setTaxYear = require('../../../middleware/set-tax-year');
const calculateNI = require('../../../middleware/calculate-ni');

module.exports = () => {
  const api = Router();

  api.post(
    '/national-insurance',
    setTaxYear,
    setIncome,
    calculateNI,
  );

  return api;
};
