const express = require('express');
const app = express();
app.use(express.json());

const port = process.env.PORT || 3000;
// Variable para identificar el entorno (Blue/Green)
const APP_COLOR = process.env.APP_COLOR || 'unknown';

// Base de datos "en memoria" (se borra si reinicias, pero sirve para la demo)
let habitaciones = [
    { id: 1, nombre: "Suite Presidencial", estado: "disponible" },
    { id: 2, nombre: "Habitación Doble", estado: "disponible" },
    { id: 3, nombre: "Habitación Sencilla", estado: "disponible" }
];

// Endpoint 1: Ver estado del servidor (Requisito Blue/Green)
app.get('/', (req, res) => {
    res.json({
        mensaje: "Bienvenido a la API de Hospedajeeeeeeeeeeee",
        version: "2.0.0"
    });
});

// Endpoint 2: Listar habitaciones
app.get('/habitaciones', (req, res) => {
    res.json({
        total: habitaciones.length,
        data: habitaciones,
        servidor: APP_COLOR
    });
});

// Endpoint 3: Reservar habitación
app.post('/reservar', (req, res) => {
    const { id } = req.body;
    const habitacion = habitaciones.find(h => h.id === id);

    if (!habitacion) {
        return res.status(404).json({ error: "Habitación no encontrada" });
    }
    
    habitacion.estado = "reservada";
    res.json({ mensaje: "Reserva exitosa", habitacion });
});

// Exportamos 'app' y 'server' por separado para poder testear sin abrir puerto
if (require.main === module) {
    app.listen(port, () => {
        console.log(`Hotel API escuchando en puerto ${port} - Slot: ${APP_COLOR}`);
    });
}

module.exports = app;
