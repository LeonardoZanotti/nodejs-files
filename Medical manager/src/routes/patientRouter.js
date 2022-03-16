const express = require('express');
const patientRouter = express.Router();
const patientController = require('../controllers/patientController');
const validator = require('../middlewares/validatePatient');

patientRouter.post('/newPatient', validator, patientController.newPatient);
patientRouter.get('/searchPatientByName/:name', validator, patientController.searchPatientByName);
patientRouter.get('/searchPatientByPhysicianId/:id', validator, patientController.searchPatientByPhysicianId);
patientRouter.put('/updatePatient/:id', validator, patientController.updatePatient);

module.exports = patientRouter;
