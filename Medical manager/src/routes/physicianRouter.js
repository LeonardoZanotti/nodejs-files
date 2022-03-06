const express = require('express');
const physicianRouter = express.Router();
const physicianController = require('../controllers/physicianController');
const auth = require("../middlewares/auth");

physicianRouter.post('/authentication', physicianController.authentication);
physicianRouter.get('/listAllPhysicians', auth, physicianController.listAllPhysicians);
physicianRouter.post('/newPhysician', auth, physicianController.newPhysician);
physicianRouter.put('/updatePhysician/:id', auth, physicianController.updatePhysician);
physicianRouter.delete('/deletePhysician/:id', auth,  physicianController.deletePhysician);

module.exports = physicianRouter;
