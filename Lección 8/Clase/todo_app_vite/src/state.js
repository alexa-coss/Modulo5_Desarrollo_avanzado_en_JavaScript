/* Este MÓDULO que maneja todo el estado de la aplicación, concentra la funcionalidad para manipular datos */

import axios from 'axios'

const BASE_URL_API = "http://localhost:3005/api";

    /* ---------- 2. Todo App ---------- */

// export const todos = JSON.parse(localStorage.getItem("todos") ?? "[]"); // Traer de localStorage los todos o un arreglo vacío si no hay ninguno // Cambiar localStorage por base de datos

export const getTodos = async () => {

    try {
        const todos = await axios.get(`${BASE_URL_API}/todos`)
        console.log("llamada axios", todos)
        return todos.data;
    } catch (err) {
        console.log("Error al obtener los TODOs:", err);
        return []
    }
}

/* export const todos = getTodos() */
//todos();
/* console.log(todos) */

/* addTodo */
/* Ejecutar función para añadir un nuevo pendiente, a un listado de pendientes y si es a traves de API, llamar a la API con un POST para crear. */
// Create
export async function addTodo(item) {
    //const todos = getTodos()

    /* todos.push({ ...item, done: false });
    persist(); */
    try {
        const response = await axios.post(`${BASE_URL_API}/todos`, { ...item, done: 0 })
        return response.data;
    } catch (err) {
        console.log("Error al crear el TODO :", err);
        return {}
    }
}

// Update
export function toggleDone(index) {
    // const todos = getTodos()
    todos[index].done = !todos[index].done; // Accede al index y marca como true "done" (check)
    persist();
}

// Delete
export function removeTodo(index) {
    // const todos = getTodos()
    todos.splice(index, 1); // A partir del index, elimina ese todo
    persist();
}

// Actualizar datos
/* function persist() {
    localStorage.setItem("todos", JSON.stringify(todos));
} */


    /* ---------- 1. Registro ---------- */
export async function addUser(userData) {
    try {
        const response = await axios.post(`${BASE_URL_API}/user`, userData)
        return response.data;
    } catch (err) {
        console.log("Error al crear el usuario :", err);
        return {}
     } 
}