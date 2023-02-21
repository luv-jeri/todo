const { User } = require('../database/models');
const _Error = require('../lib/utils/_error');
const catcher = require('../lib/utils/catcher');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');

module.exports.authenticate = catcher(async (req, res, next) => {
  let { authorization } = req.headers;

  console.log('Authorization - Header', authorization);

  if (!authorization) {
    authorization = req.cookies.authorization;
  }

  console.log('Authorization - Cookie', authorization);

  let token;

  if (authorization.startsWith('Bearer')) {
    token = authorization.split(' ')[1];
  }

  token = authorization;

  if (!token) {
    return next(new _Error('Please login to continue', 400));
  }

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  if (!decoded) {
    return next(new _Error('You are logged out.', 401));
  }

  const user = await User.findById(decoded.id, '-password -__v -createdAt -updatedAt');

  if (!user) {
    return next(new _Error('User does not exist.', 400));
  }

  req.user = user;

  next();
});

module.exports.who_am_i = catcher(async (req, res, next) => {
  const { user } = req;

  res.status(200).json({
    status: 'success',
    message: `You are ${user.name}`,
    data: user,
  });
});
