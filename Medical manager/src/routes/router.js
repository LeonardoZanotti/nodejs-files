const express = require('express');
const router = express.Router();

const physicianRouter = require('./physicianRouter');
const patientRouter = require('./patientRouter');
const appointmentRouter = require('./appointmentRouter');

router.use('/physician', physicianRouter);
router.use('/patient', patientRouter);
router.use('/appointment', appointmentRouter);

module.exports = router;
