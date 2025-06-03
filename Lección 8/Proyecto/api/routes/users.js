const express = require('express');
const db = require("../db");
const router = express.Router(); // Servidor: express, método: Router
const bcrypt = require('bcrypt'); // Hashear contraseña
const saltRounds = 10;

// Registrar usuario (POST /api/users)
router.post('/', async (req, res) => { // El método POST siempre hay un request y response | "/" en la ruta (raíz)
    try {
        const { name, email, password, phone, nickname } = req.body; // Desestructurando -> lo recibo desde el body de la solicitud

        if (!name || !email || !password || !nickname)
        return res.status(400).json({ error: 'Faltan datos obligatorios' });

        // Hash de la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        db.run(
            `INSERT INTO users (name, email, password, phone, nickname) VALUES (?, ?, ?, ?, ?)`, // Insertar en la tabla users los valores
            // "?" Parametrizar -> Validaciones más profundas en SQL, evitar inyecciones no deseadas - > Cosas de seguridad
            [name, email, hashedPassword, phone || null, nickname], // Poner en los "?", regla de correspondencia por posición | No dejar nada a la interpretación
            function (err) {
                if (err) {
                    if (err.message.includes("UNIQUE constraint failed: users.email")) {
                        return res.status(400).json({ error: "El email ya está registrado" });
                    }
                    return res.status(400).json({ error: err.message });
                }
                console.log(this.lastID, name, email, phone, nickname);
                res.status(201).json({
                    message: `Usuario ${nickname} registrado correctamente.`,
                    id: this.lastID,
                    name,
                    email,
                    phone,
                    nickname
                });
            }
        )
    } catch (error) {
        res.status(500).json({ error: "Error interno del servidor" });
    }
})

module.exports = router;