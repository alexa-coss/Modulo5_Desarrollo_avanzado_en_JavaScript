/* Este MÓDULO es el encargado de renderizar y redibujar todo el contenido, osea todo el DOM */

// Aquí se importarían las funciones de "state.js" si se hicera un manejo de datos.


/* ---------- utilidades ---------- */
export function renderErrors(form, errors = {}) { // Recibe form a validar o revisar y una serie de errores

    // limpia estados previos
    [...form.elements].forEach((el) => { // De cada elemento del formulario
        if (!el.name) return; // Remover esas clases de bootstrap (mantenerlo neutral)
        el.classList.remove("is-invalid", "is-valid"); // Remover esas clases de bootstrap (mantenerlo neutral)
        const feedback = el.closest(".input-group")?.querySelector(".invalid-feedback") ?? el.nextElementSibling; // Obtener mensaje (invalid-feedback)
        if (feedback) {
            feedback.textContent = ""; // Limpiar
            feedback.classList.remove("d-block"); // Quitar clase "d-block" // Ocultar mensaje (invalid-feedback)
        }
    });
    //

    // muestra nuevos
    Object.entries(errors).forEach(([name, msgs]) => { // Para cada elemento del formulario
        const input = form.elements[name];
        if (!input) return;
        input.classList.add("is-invalid"); // Mostrar mensaje (invalid-feedback) // Añadir clase "invalid-feedback"
        input.nextElementSibling.textContent = msgs[0]; // Inyectar mensaje
        input.nextElementSibling.classList.add("d-block"); // Añadir clase "d-block" // Mostrar mensaje (invalid-feedback)
    });

    // green cuando todo ok // Mostrar como válido si no hay ningún error
    if (!Object.keys(errors).length) {
        [...form.elements]
            .filter((el) => el.name)
            .forEach((el) => el.classList.add("is-valid"));
    }
}

export function renderRegisterOutput(pre, dataObj) { // Mostrar un texto en el "<pre>"
    pre.textContent = JSON.stringify(dataObj, null, 2); // JSON del objeto registrado (datos de usuario)
}