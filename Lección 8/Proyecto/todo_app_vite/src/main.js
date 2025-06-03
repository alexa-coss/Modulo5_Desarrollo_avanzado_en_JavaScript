/* (MÓDULO) Este es el punto de entrada del aplicativo, el que concentra todas las funcionalidades */

import { userSchema, todoSchema, loginSchema, validate } from "./schema.js";
import { postUser, getUser, postLogin, postTodo, getTodos, putTodo, deleteTodo } from "./state.js";
import {
    renderErrors,
    renderRegisterOutput,
    renderLoginOutput,
    renderTodoList,
    setupTodoActions,
} from "./dom.js";

/* ---------- 1. Register ---------- */
const registerForm = document.querySelector("#registerForm"); // Todo el form (registro de usuario)
const registerOutput = document.querySelector("#registerOutput"); // Donde se mostrarán los datos de usuario

registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(registerForm)); // Crear objeto tipo "FormData" con la información del formulario
    const { data, errors } = validate(userSchema, formData); // Desestructuración para validar | Traer ambos con información o vacíos de la función "validate"

    console.log("FORMDATA:", formData)

    try {
        const user = await postUser(data); // función que hace el POST a /api/users
        console.log("REGISTER RESPONSE:", user);

        if (user && user.message) {
            renderErrors(registerForm);
            registerOutput.textContent = "";
            registerOutput.classList.add("d-block");
            renderLoginOutput(registerOutput, user.message); // o crea una función similar para registro
        } else if (user && user.error) {
            // Mostrar errores si vienen del backend (como email duplicado)
            renderErrors(registerForm, { email: [user.error] });
        }
    } catch (error) {
        renderErrors(registerForm, {
            email: ["Error del servidor al registrar usuario"],
        });
    }
});

/* ---------- 2. Login ---------- */
const loginForm = document.querySelector("#loginForm"); // Todo el form (registro de usuario)
const loginOutput = document.querySelector("#loginOutput"); // Donde se mostrarán los datos de usuario

loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(loginForm)); // Crear objeto tipo "FormData" con la información del formulario
    const { data, errors } = validate(loginSchema, formData); // Desestructuración para validar | Traer ambos con información o vacíos de la función "validate"

    console.log("FORMDATA:", formData)

    if (errors) {
        renderErrors(loginForm, errors); // <-- esto muestra los errores en el formulario
        return;
    }

    try {
        const user = await postLogin(data);
        console.log("LOGIN RESPONSE:", user);

        if (user && user.nickname) {
            renderErrors(loginForm); // limpiar errores
            loginOutput.textContent = "";  // limpiar contenido anterior
            loginOutput.classList.add("d-block"); // asegurarse de que se muestre
            renderLoginOutput(loginOutput, user.message); // mostrar mensaje completo
        } else if (user && user.error) {
            // Mostrar mensaje debajo del input correcto
            if (user.error.toLowerCase().includes("contraseña")) {
                renderErrors(loginForm, { password: [user.error] });
            } else {
                renderErrors(loginForm, { email: [user.error] });
            }
        }
    } catch (error) {
        renderErrors(loginForm, {
        email: ["Error del servidor o credenciales incorrectas"],
        });
    }
});


/* ---------- 3. Todo App ---------- */
const todoForm = document.querySelector("#todoForm"); // Todo el form (registro de todo)
const todoList = document.querySelector("#todoList"); // Donde se mostrarán los todos

async function refreshTodos() {
    const todos = await getTodos(); // Obtener de la API
    renderTodoList(todoList, todos); // Renderizar
}
refreshTodos(); // Renderizar o dibujar los todos existentes en localStorage o arreglo vacío
setupTodoActions(todoList, refreshTodos); // Si existiera algún todo como listado, inicializarlo

todoForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(todoForm)); // Obtener formulario
    const { data, errors } = validate(todoSchema, formData); // Validar

    if (errors) { // Si hay error
        renderErrors(todoForm, errors); // Renderizarlo o dibujarlo
    } else {
        await postTodo(data); // Añadir
        renderErrors(todoForm); // Mostra mensajes (0) y limpiar elementos del formulario
        todoForm.reset(); // Limpiar formulario, borrar campos después de enviar un todo
        refreshTodos(); // Actualiza lista de todos, para que aparezca el nuevo todo agregado
    }
});
