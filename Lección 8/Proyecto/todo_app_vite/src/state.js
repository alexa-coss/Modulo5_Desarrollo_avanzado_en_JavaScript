/* Este MÓDULO que maneja todo el estado de la aplicación, concentra la funcionalidad para manipular datos */

import axios from 'axios'

const BASE_URL_API = "http://localhost:3005/api";

    /* ---------- 1. Register ---------- */

// Create
export async function postUser(userData) {
    try {
        const response = await axios.post(`${BASE_URL_API}/user`, userData)
        return response.data;
    } catch (err) {
        console.log("Error al crear el usuario:", err);
        return {}
     }
}

// Read
export const getUser = async () => {
    try {
        const response = await axios.get(`${BASE_URL_API}/user`);
        return response.data;
    } catch (err) {
        console.log("Error al obtener registro de usuario:", err);
        return []
    }
}

    /* ---------- 2. Login ---------- */

// Create
export async function postLogin(loginData) {
    try {
        const response = await axios.post(`${BASE_URL_API}/login`, loginData);
        return response.data;
    } catch (err) {
        // Captura el mensaje enviado por el backend
        if (err.response && err.response.data && err.response.data.error) {
            return { error: err.response.data.error };
        }
        return { error: "Error del servidor" };
    }
}

    /* ---------- 3. Todo App ---------- */
/* addTodo */
/* Ejecutar función para añadir un nuevo pendiente, a un listado de pendientes y si es a traves de API, llamar a la API con un POST para crear. */

// Create
export async function postTodo(id) {
    try {
        const response = await axios.post(`${BASE_URL_API}/todos`, { ...id, done: 0 });
        return response.data;
    } catch (err) {
        console.log("Error al crear el TODO:", err);
        return {}
    }
}

// Read
export const getTodos = async () => {
    try {
        const todos = await axios.get(`${BASE_URL_API}/todos`);
        console.log("llamada axios", todos)
        return todos.data;
    } catch (err) {
        console.log("Error al obtener los TODOs:", err);
        return []
    }
}

// Update
export async function putTodo({ id, done }) {
    try {
        const response = await axios.put(`${BASE_URL_API}/todos/${id}`, { done });
        return response.data;
    } catch (err) {
        console.log("Error al actualizar el TODO:", err);
        return {}
    }
}

// Delete
export async function deleteTodo(id) {
    try {
        const response = await axios.delete(`${BASE_URL_API}/todos/${id}`)
        return response.data;
    } catch (err) {
        console.log("Error al crear el TODO:", err);
        return {}
    }
}
