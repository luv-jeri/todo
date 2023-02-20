const { Schema } = require('mongoose');
const validator = require('validator');

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      minlength: [3, 'Name must be at least 3 characters'],
      maxlength: [20, 'Name must be at most 20 characters'],
    },
    photo: {
      type: String,
      validate: [validator.isURL, 'Please provide a valid URL'],
      default:
        'https://i0.wp.com/www.repol.copl.ulaval.ca/wp-content/uploads/2019/01/default-user-icon.jpg',
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, 'Please provide a valid email'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [3, 'Password must be at least 3 characters'],
      maxlength: [255, 'Password must be at most 255 characters'],
      select: false,
    },
    confirmPassword: {
      type: String,
      required: [true, 'Confirm Password is required'],
      minlength: [3, 'Confirm Password must be at least 3 characters'],
      maxlength: [255, 'Confirm Password must be at most 255 characters'],
      validate: {
        validator: function (value) {
          return this.password === value;
        },
        message: 'Password and Confirm Password must be the same',
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = userSchema;
