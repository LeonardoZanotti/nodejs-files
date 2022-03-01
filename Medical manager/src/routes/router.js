const express = require('express');
const router = express.Router();

const physicianRouter = require('./physicianRouter');
const patientRouter = require('./patientRouter');

router.use('/physician', physicianRouter);
router.use('/patient', patientRouter);

module.exports = router;
