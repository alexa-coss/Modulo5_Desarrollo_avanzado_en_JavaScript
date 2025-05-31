const express = require('express');
const db = require("../db");
const router = express.Router(); // Servidor: express, método: Router

// Registrar usuario (POST /api/users)
router.post('/', (req, res) => { // El método POST siempre hay un request y response | "/" en la ruta (raíz)
    const { name, email, password, phone } = req.body; // Desestructurando -> lo recibo desde el body de la solicitud
    if (!name || !email || !password)
        return res.status(400).json({ error: 'Faltan datos obligatorios' });

    db.run(
        `INSERT INTO users (name, email, password, phone) VALUES (?, ?, ?, ?)`, // Insertar en la tabla users los valores
        // "?" Parametrizar -> Validaciones más profundas en SQL, evitar inyecciones no deseadas - > Cosas de seguridad
        [name, email, password, phone || null], // Poner en los "?", regla de correspondencia por posición | No dejar nada a la interpretación
        function (err) {
            if (err) return res.status(400).json({ error: err.message });
            res.status(201).json({ id: this.lastID, name, email, phone })
        }
    )
})

module.exports = router;