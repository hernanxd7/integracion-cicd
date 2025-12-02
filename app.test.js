const request = require('supertest');
const app = require('./index'); // Importamos tu app

describe('Pruebas de la API del Hotel', () => {
    
    // Prueba 1: Verificar que el home responde y dice qué color es
    test('GET / debe devolver el mensaje de bienvenida', async () => {
        const res = await request(app).get('/');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('servidor');
    });

    // Prueba 2: Verificar que lista las habitaciones
    test('GET /habitaciones debe devolver una lista', async () => {
        const res = await request(app).get('/habitaciones');
        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body.data)).toBe(true);
    });

    // Prueba 3: Probar una reserva (POST)
    test('POST /reservar debe cambiar estado a reservada', async () => {
        const res = await request(app)
            .post('/reservar')
            .send({ id: 1 });
        
        expect(res.statusCode).toEqual(200);
        expect(res.body.habitacion.estado).toBe('reservada');
    });
});