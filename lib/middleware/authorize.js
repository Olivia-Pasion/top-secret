module.exports = async (req, res, next) => {
  try {
    if (!req.user || req.user.email != 'current user')
      throw new Error('You do not have access to view these secrets');
    
    next();
  } catch (err) {
    err.status = 403;
    next(err);
  }
};





