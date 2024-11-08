module.exports = (req, res, next) => {
    // Simulación de autenticación
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!authHeader || authHeader !== 'Bearer some_token') {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    next();
};
