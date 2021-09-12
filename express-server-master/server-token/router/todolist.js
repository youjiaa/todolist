const express = require('express');
const todolistController = require('../controllers/todolistController.js');
const router = express.Router();

todolistController(router);

module.exports = router;
