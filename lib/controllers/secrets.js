const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
const Secret = require('../models/Secret');

module.exports = Router()
  .get('/', authenticate, async (req, res, next) => {
    try {
      const secrets = await Secret.getAll();
      res.json(secrets);
    } catch (e) {
      next (e);
    }
  })
  .post('/', authenticate, async (req, res, next) => {
    try {
      const secret = await Secret.insert(req.body);
      res.json(secret); 
    } catch (e) {
      next (e);
    }
  });


