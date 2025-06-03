const express = require('express');
const router = express.Router();
const db = require('../db');
const bcrypt = require('bcrypt');

router.post('/', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email y contraseña son requeridos" });
  }

  const query = "SELECT * FROM users WHERE email = ?";

  db.get(query, [email], async (err, user) => {
    if (err) {
      return res.status(500).json({ error: "Error al consultar la base de datos" });
    }

    if (!user) {
      return res.status(401).json({ error: "Usuario no encontrado" });
    }

    // Compara contraseña en texto plano con la hasheada almacenada
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ error: "Contraseña incorrecta" });
    }

    // Usuario validado correctamente
    res.json({ message: `¡Bienvenido, ${user.nickname}!`, nickname: user.nickname });
  });
});

module.exports = router;
