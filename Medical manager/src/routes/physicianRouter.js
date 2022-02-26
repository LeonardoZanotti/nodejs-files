const express = require('express');
const physicianRouter = express.Router();
const physicianController = require('../controllers/physicianController');

physicianRouter.get('/listAllPhysicians', physicianController.listAllPhysicians);
physicianRouter.post('/newPhysician', physicianController.newPhysician);
physicianRouter.put('/updatePhysician/:id', physicianController.updatePhysician);
physicianRouter.delete('/deletePhysician/:id', physicianController.deletePhysician);

module.exports = physicianRouter;
