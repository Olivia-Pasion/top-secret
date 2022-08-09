const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
//const authorize = require('../middleware/authorize');
const User = require('../models/User');
const UserService = require('../services/UserService');

module.exports = Router()
  .post('/', async (req, res, next) => {
    try{
      const user = await UserService.create(req.body);
      res.json(user);
    } catch (e) {
      next (e);
    }
  })
  .post('/sessions', async (req, res, next) => {
    try {
      const token = await UserService.signIn(req.body);
      res
        .cookie(process.env.COOKIE_NAME, token, {
          httpOnly: true,
        })
        .json({ message: 'Signed in successfully' });
    } catch (e) {
      next(e);
    }
  })
  .get('/protected', authenticate, async (req, res) => {
    res.json({ message: 'hello world' });
  });





