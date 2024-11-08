// tests/userRoutes.test.js
const request = require('supertest');
const app = require('../server'); // Asegúrate de que `server.js` exporte `app`
const db = require('../config/database'); // Importa la conexión a la base de datos

describe('Rutas de usuario', () => {
    it('Debe crear un nuevo usuario', async () => {
        const res = await request(app)
            .post('/api/usuario')
            .send({
                UsuNom: 'Juan',
                UsuApePat: 'Perez',
                UsuApeMat: 'Lopez',
                UsuCorEle: 'juan@example.com',
                UsuNomUsu: 'juanp',
                UsuCon: 'password123'
            });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('UsuId');
    });

    it('Debe fallar al crear usuario sin datos requeridos', async () => {
        const res = await request(app)
            .post('/api/usuario')
            .send({});
        expect(res.statusCode).toEqual(400);
    });
});

// Cierra la base de datos después de todas las pruebas
afterAll((done) => {
    db.close(() => done());
});
