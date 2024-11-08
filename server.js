//server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./config/database');
const usersRouter = require('./routes/userRoutes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Middleware para pasar la conexión de la base de datos en cada solicitud
app.use((req, res, next) => {
    req.db = db;
    next();
});

// Configuración de rutas
app.use('/api', usersRouter);

// Iniciar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log('Servidor iniciado en el puerto', PORT);
});
module.exports = app;