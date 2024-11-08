//userRoutes.js
const express = require('express');
const userController = require('../controllers/userController'); // Asegúrate de que esta ruta es correcta

const router = express.Router();

// Rutas de usuario
router.post('/usuario', userController.createUser); // Crear usuario
router.get('/usuario', userController.getUsers);     // Obtener todos los usuarios
router.post('/login', userController.loginUser);     // Login

module.exports = router;
