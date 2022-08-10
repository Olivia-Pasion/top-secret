const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
//const authorize = require('../middleware/authorize');
const Secret = require('../models/Secret');

module.exports = Router()
  .get('/', authenticate, async (req, res, next) => {
    try {
      const secrets = await Secret.getAll();
      res.json(secrets);
    } catch (e) {
      next (e);
    }
  });


