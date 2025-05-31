/* (MÓDULO) Este es el punto de entrada del aplicativo, el que concentra todas las funcionalidades */

import { userSchema, todoSchema, validate } from "./schema.js";
import { addTodo, addUser } from "./state.js";
import {
    renderErrors,
    renderRegisterOutput,
    renderTodoList,
    setupTodoActions,
} from "./dom.js";

/* ---------- 1. Registro ---------- */
const registerForm = document.querySelector("#registerForm"); // Todo el form (registro de usuario)
const registerOutput = document.querySelector("#registerOutput"); // Donde se mostrarán los datos de usuario

registerForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(registerForm)); // Crear objeto tipo "FormData" con la información del formulario
    const { data, errors } = validate(userSchema, formData); // Desestructuración para validar | Traer ambos con información o vacíos de la función "validate"

    console.log("FORMDATA:", formData)

    if (errors) { // Si existe un error
        renderErrors(registerForm, errors); // Renderizar
    } else {
        renderErrors(registerForm); // limpia // Esta función muestra los mensajes (0) y limpia los elementos del formulario
        // renderRegisterOutput(registerOutput, data); // Renderizar donde se muestran los datos de usuario // Ahora -> llamar a la base de datos
        addUser(data);
        registerForm.reset();
    }
});

/* ---------- 2. Todo App ---------- */
const todoForm = document.querySelector("#todoForm"); // Todo el form (registro de todo)
const todoList = document.querySelector("#todoList"); // Donde se mostrarán los todos

function refreshTodos() {
    renderTodoList(todoList); // Renderizar o dibujar el primer todo
}
refreshTodos(); // Renderizar o dibujar los todos existentes en localStorage o arreglo vacío
setupTodoActions(todoList, refreshTodos); // Si existiera algún todo como listado, inicializarlo

todoForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(todoForm)); // Obtener formulario
    const { data, errors } = validate(todoSchema, formData); // Validar

    if (errors) { // Si hay error
        renderErrors(todoForm, errors); // Renderizarlo o dibujarlo
    } else {
        addTodo(data); // Añadir
        renderErrors(todoForm); // Mostra mensajes (0) y limpiar elementos del formulario
        todoForm.reset(); // Limpiar formulario, borrar campos después de enviar un todo
        refreshTodos(); // Actualiza lista de todos, para que aparezca el nuevo todo agregado
    }
});