const express = require('express');
const router = express.Router();

const physicianRouter = require('./physicianRouter');

router.use('/physician', physicianRouter);

module.exports = router;
