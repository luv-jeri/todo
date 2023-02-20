const express = require('express');

const { find, add, update, remove } = require('../controllers/todo.controller');
const { authenticate } = require('../controllers/authorization.controller');

const router = express.Router();

router.use(authenticate);

router.route('/').get(find).post(add);
router.route('/:id').patch(update).delete(remove);

// router.route('/lookup').get(lookup);

module.exports = router;
