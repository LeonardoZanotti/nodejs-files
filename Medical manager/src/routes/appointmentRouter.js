const express = require('express');
const appointmentRouter = express.Router();
const appointmentController = require('../controllers/appointmentController');
const auth = require('../middlewares/auth');
const validator = require('../middlewares/validateAppointment');

appointmentRouter.post('/newAppointment', auth, validator, appointmentController.newAppointment);
appointmentRouter.get(
  '/searchAppointmentByPatientId/:id',
  auth,
  validator,
  appointmentController.searchAppointmentByPatientId
);
appointmentRouter.get(
  '/searchAppointmentByPhysicianId/:id',
  auth,
  validator,
  appointmentController.searchAppointmentByPhysicianId
);
appointmentRouter.delete('/deleteAppointment/:id', auth, validator, appointmentController.deleteAppointment);

module.exports = appointmentRouter;
