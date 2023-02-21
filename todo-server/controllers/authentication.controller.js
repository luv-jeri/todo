const { User } = require('../database/models');
const _Error = require('../lib/utils/_error');
const catcher = require('../lib/utils/catcher');
const signToken = require('../lib/functions/sign_token');

module.exports.sign_up = catcher(async (req, res, next) => {
  const { name, email, password, confirmPassword , photo} = req.body;

  const user = await User.create({
    name,
    email,
    password,
    confirmPassword,
    photo,
  });

  const token = signToken({
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  });

  res.cookie('authorization', token, {
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
  });

  res.status(200).json({
    status: 'success',
    message: 'User created successfully',
    token,
  });
});

module.exports.sign_in = catcher(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new _Error('Please provide email and password', 400));
  }

  const user = await User.findOne({
    email,
  }).select('+password');

  if (!user) {
    return next(new _Error('Wrong Password / Mail try again', 401));
  }

  const isCorrect = await user.correctPassword(password, user.password);

  if (!isCorrect) {
    return next(new _Error('Wrong Password / Mail try again', 401));
  }

  const token = signToken({
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  });

  res.cookie('authorization', token, {
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
  });

  res.status(200).json({
    status: 'success',
    message: 'User logged in successfully',
    token,
  });
});
