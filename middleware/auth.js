// Crea un archivo en C:\Users\jcarl\Desktop\UNSA\2024-B\PIS\github\Back-endFronend\middleware\auth.js

module.exports = (req, res, next) => {
    // Simulación de autenticación
    const authHeader = req.headers['authorization'];

    if (!authHeader || authHeader !== 'Bearer some_token') {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    next();
};
