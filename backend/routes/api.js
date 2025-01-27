const express = require('express');
const router = express.Router();
const requestController = require('../controllers/requestController');

router.post('/', requestController.handleRequest);

module.exports = router;
