const express = require('express');

/* Conexión a la base de datos */
const db = require("../db");

/* Router del servidor */
const router = express.Router();

/* Crear un todo (POST /api/todos) */
router.post('/', (req, res) => {
    const { task, dueDate } = req.body
    if (!task || !dueDate) return res.status(400).json({ error: 'Faltan datos obligatorios' });
    db.run(
        `INSERT INTO todos (task, dueDate) VALUES (?, ?)`,
        [task, dueDate],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json({ id: this.lastID, task, dueDate, done: 0 });
        }
    )
})

/* Leer todos los todos (GET /api/todos) */
router.get('/', (req, res) => {
    db.all(
        `SELECT * FROM todos`, (err, rows) => { // Traer todos los todos en la base de datos y regresar a la interfaz | `SELECT * FROM todos WHERE user_id = ?`
            if (err) return res.status(500).json({ error: err.message });
            res.json(rows); // Regresar filas en formato JSON
        }
    )
})

// Actualizar un todo (PUT /api/todos/:id)
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { done } = req.body; // Espera { done: true/false }
    if (done === undefined) return res.status(400).json({ error: 'Falta el estado done' });

    db.run(
        `UPDATE todos SET done = ? WHERE id = ?`,
        [done ? 1 : 0, id],
        function(err) {
            if (err) return res.status(500).json({ error: err.message });
            if (this.changes === 0) return res.status(404).json({ error: 'Todo no encontrado' });
            res.json({ id, done });
        }
    );
});

// Eliminar un todo (DELETE /api/todos/:id)
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    db.run(
        `DELETE FROM todos WHERE id = ?`,
        [id],
        function(err) {
            if (err) return res.status(500).json({ error: err.message });
            if (this.changes === 0) return res.status(404).json({ error: 'Todo no encontrado' });
            res.json({ id });
        }
    );
});


module.exports = router;