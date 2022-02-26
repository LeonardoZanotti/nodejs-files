const express = require('express');
const physicianRouter = express.Router();
const physicianController = require('../controllers/physicianController');

physicianRouter.get('/listAllPhysicians', physicianController.listAllPhysicians);

module.exports = physicianRouter;
