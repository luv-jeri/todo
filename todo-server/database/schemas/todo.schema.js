const { Schema } = require('mongoose');

const todoSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      minlength: [3, 'Title must be at least 3 characters'],
      maxlength: [70, 'Title must be at most 20 characters'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      minlength: [3, 'Description must be at least 3 characters'],
      maxlength: [255, 'Description must be at most 255 characters'],
    },
    completed: {
      type: Boolean,
      default: false,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = todoSchema;
