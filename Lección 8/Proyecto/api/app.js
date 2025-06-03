/* Este archivo es el punto de entrada o el código que hace que se ejecute el servidor */

const express = require('express');
const cors = require('cors')

const users = require('./routes/users');
const login = require('./routes/login');
const todos = require('./routes/todos');

/* ESTES ES MI SERVIDOR */
const app = express();

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

console.log("Por cargar las rutas");

app.use('/api/user', users);
app.use('/api/login', login);
app.use('/api/todos', todos);

console.log("Rutas cargadas");

const PORT = 3005;

app.listen(PORT, () => { // Escuchar en el puerto que pasamos
    console.log(`API corriendo en http://localhost:${PORT}`) // Mostar mensaje de confirmación
})