const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
//const authorize = require('../middleware/authorize');
//const UserService = require('../services/UserService');
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
  .post('/secrets', authenticate, async (req, res, next) => {
    try {
      const secret = await Secret.create(req.body);
      console.log(secret);
      res.json(secret); 
    } catch (e) {
      next (e);
    }
  });


