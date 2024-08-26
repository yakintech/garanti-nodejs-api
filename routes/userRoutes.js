const express = require('express');
const { userController } = require('../controllers/userController');

const userRouter = express.Router();

// GET /api/users
userRouter.get('/', userController.getAll);
userRouter.post('/', userController.create);
userRouter.get('/:id', userController.getOne);
userRouter.put('/:id', userController.update);
userRouter.delete('/:id', userController.delete);

module.exports = {
    userRouter
};
