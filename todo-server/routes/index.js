const express = require('express');

const authentication = require('./authentication.routes');
const todo = require('./todo.routes');

const router = express.Router();

router.use('/auth', authentication);
router.use('/todo', todo);

module.exports = router;
