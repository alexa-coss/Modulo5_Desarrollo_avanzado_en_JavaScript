/* (MÓDULO) Este es el punto de entrada del aplicativo, el que concentra todas las funcionalidades */

import { userSchema, validate } from "./schema.js";
import {
    renderErrors,
    renderRegisterOutput,
} from "./dom.js";

/* ---------- 1. Registro ---------- */
const registerForm = document.querySelector("#registerForm"); // Todo el form (registro de usuario)
const registerOutput = document.querySelector("#registerOutput"); // Donde se mostrarán los datos de usuario

registerForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(registerForm)); // Crear objeto tipo "FormData" con la información del formulario
    formData.terms = registerForm.terms.checked; // true o false
    
    const { data, errors } = validate(userSchema, formData); // Desestructuración para validar | Traer ambos con información o vacíos de la función "validate"

    if (errors) { // Si existe un error
        renderErrors(registerForm, errors); // Renderizar
    } else {
        renderErrors(registerForm); // limpia // Esta función muestra los mensajes (0) y limpia los elementos del formulario
        renderRegisterOutput(registerOutput, data); // Renderizar donde se muestran los datos de usuario
        registerForm.reset();
    }
});