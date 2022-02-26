const express = require('express');
const router = express.Router();

const physicianRouter = require('./physicianRouter');

router.get('/', (req, res) => res.send('dale'));

router.use('/physician', physicianRouter);

module.exports = router;
