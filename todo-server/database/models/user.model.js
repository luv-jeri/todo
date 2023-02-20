const { model } = require('mongoose');
const { userSchema } = require('../schemas');
const bcrypt = require('bcryptjs');

userSchema.index({ email: 1 }, { unique: true });

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 12);
    this.confirmPassword = undefined;
  }
  next();
});

userSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const UserModel = model('user', userSchema);

module.exports = UserModel;
