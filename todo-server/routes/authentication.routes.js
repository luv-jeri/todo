const express = require('express');
const { sign_in, sign_up } = require('../controllers/authentication.controller');
const { authenticate, who_am_i } = require('../controllers/authorization.controller');
const router = express.Router();

router.route('/sign_up').post(sign_up);
router.route('/sign_in').post(sign_in);
router.route('/who_am_i').get(authenticate, who_am_i);

module.exports = router;
