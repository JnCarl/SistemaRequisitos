// controllers/userController.js
const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');

exports.createUser = async (req, res) => {
    try {
        const userData = req.body;
        const lastID = await userModel.createUser(req.db, userData);
        res.status(201).json({ UsuId: lastID, ...userData });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getUsers = async (req, res) => {
    try {
        const rows = await userModel.getUsers(req.db);
        res.status(200).json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.loginUser = async (req, res) => {
    try {
        const { UsuNomUsu, UsuCon } = req.body;
        const user = await userModel.getUserByUsername(req.db, UsuNomUsu);
        if (!user) {
            return res.status(401).json({ error: 'Usuario o contraseña incorrectos' });
        }

        // Comparar la contraseña
        const match = await bcrypt.compare(UsuCon, user.UsuCon);
        if (!match) {
            return res.status(401).json({ error: 'Usuario o contraseña incorrectos' });
        }

        // Autenticación exitosa
        res.status(200).json({ message: 'Login exitoso', userId: user.UsuId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
