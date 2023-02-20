const { model } = require('mongoose');
const { todoSchema } = require('../schemas');

todoSchema.index({ descriptions: 'text' });
todoSchema.index({ title: 'text' });

const TodoModel = model('todo', todoSchema);

module.exports = TodoModel;
