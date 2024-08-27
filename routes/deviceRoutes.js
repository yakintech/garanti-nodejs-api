const express = require('express');
const { deviceController } = require('../controllers/deviceController');



const deviceRouter = express.Router();

// GET /api/devices
deviceRouter.get('/', deviceController.getAll);
deviceRouter.post('/', deviceController.create);
deviceRouter.get('/:id', deviceController.getById);
deviceRouter.put('/:id', deviceController.update);



module.exports = {
    deviceRouter
};
