const path = require('path');

const express = require('express');

const homepageController = require('../controllers/login');

const router = express.Router();

router.get('/login', homepageController.getLoginPage);

module.exports = router;