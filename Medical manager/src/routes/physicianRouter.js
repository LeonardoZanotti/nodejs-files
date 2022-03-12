const express = require('express');
const physicianRouter = express.Router();
const physicianController = require('../controllers/physicianController');
const auth = require('../middlewares/auth');
const validator = require('../middlewares/validatePhysician');

physicianRouter.post('/authentication', validator, physicianController.authentication);
physicianRouter.get('/listAllPhysicians', auth, validator, physicianController.listAllPhysicians);
physicianRouter.post('/newPhysician', auth, validator, physicianController.newPhysician);
physicianRouter.put('/updatePhysician/:id', auth, validator, physicianController.updatePhysician);
physicianRouter.delete('/deletePhysician/:id', auth, validator, physicianController.deletePhysician);

module.exports = physicianRouter;
