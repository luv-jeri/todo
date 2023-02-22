const catcher = require('../lib/utils/catcher');
const _Error = require('../lib/utils/_error');
const { Todo } = require('../database/models');
const filter_object = require('../lib/functions/filter_object');
const Features = require('../lib/handlers/features.handler');

module.exports.find = catcher(async (req, res, next) => {
  console.log(req.user);
  let todos = new Features(Todo.find(), {
    ...req.query,
    user: req.user.id,
  });

  todos = todos.sort().paginate().select().filter();

  todos = await todos.query;

  res.status(200).json({
    status: 'success',
    data: todos,
  });
});

module.exports.add = catcher(async (req, res, next) => {
  const to_add = filter_object(req.body, 'title', 'description');

  const new_todo = await Todo.create({
    ...to_add,
    user: req.user.id,
  });

  res.json({
    status: 'success',
    data: new_todo,
    message: 'Todo added successfully',
  });
});

module.exports.update = catcher(async (req, res, next) => {
  const { id } = req.params;

  const { title, description, completed } = req.body;

  console.log(req.body);

  let todo = await Todo.findById(id);

  if (!todo) {
    return next(new _Error(`Todo with id ${id} not found`, 404));
  }

  if (todo.user.toString() !== req.user.id) {
    return next(new _Error(`You are not authorized to update this todo`, 401));
  }

  title && (todo.title = title);
  description && (todo.description = description);
  // check if completed is boolean
  if (completed !== undefined) {
    todo.completed = completed;
  }

  await todo.save();

  res.json({
    status: 'success',
    data: todo,
    message: 'Todo updated successfully',
  });
});

module.exports.remove = catcher(async (req, res, next) => {
  const { id } = req.params;

  const todo = await Todo.findById(id);

  if (!todo) {
    return next(new _Error(`Todo with id ${id} not found`, 404));
  }

  if (todo.user.toString() !== req.user.id) {
    return next(new _Error(`You are not authorized to delete this todo`, 401));
  }

  await todo.remove();

  res.json({
    status: 'success',
    message: 'Todo deleted successfully',
  });
});

module.exports.lookup = catcher(async (req, res, next) => {
  const { search, type, age, fee, limit } = req.query;

  const aggregate = [
    {
      $search: {
        index: 'main',
        text: {
          query: search,
          path: {
            wildcard: '*',
          },
        },
      },
    },
  ];

  if (type) {
    aggregate.push({ $match: { type } });
  }

  if (age) {
    aggregate.push({ $match: { age: { $lte: parseInt(age) } } });
  }

  if (fee) {
    aggregate.push({ $match: { fee: { $lte: parseInt(fee) } } });
  }

  const pets = await Todo.aggregate(aggregate);

  res.json({
    status: 'success',
    data: {
      pets,
    },
    message: 'Pets created successfully',
  });
});
