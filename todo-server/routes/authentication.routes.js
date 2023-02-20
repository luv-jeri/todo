const express = require('express');
const { sign_in, sign_up } = require('../controllers/authentication.controller');

const router = express.Router();

router.route('/sign_up').post(sign_up);
router.route('/sign_in').post(sign_in);

module.exports = router;
