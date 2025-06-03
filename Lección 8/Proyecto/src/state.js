/* Este MÓDULO que maneja todo el estado de la aplicación, concentra la funcionalidad para manipular datos */

export const todos = JSON.parse(localStorage.getItem("todos") ?? "[]"); // Traer de localStorage los todos o un arreglo vacío si no hay ninguno

/* addTodo */
/* Ejecutar función para añadir un nuevo pendiente, a un listado de pendientes y si es a traves de API, llamar a la API con un POST para crear. */
// Create
export function addTodo(item) {
    todos.push({ ...item, done: false }); // "...item" mantener los que ya tiene | "false" la bandera se crea aquí
    persist();
}

// Update
export function toggleDone(index) {
    todos[index].done = !todos[index].done; // Accede al index y marca como true "done" (check)
    persist();
}

// Delete
export function removeTodo(index) {
    todos.splice(index, 1); // A partir del index, elimina ese todo
    persist();
}

// Actualizar datos
function persist() {
    localStorage.setItem("todos", JSON.stringify(todos)); // Guardar en localStorage
}