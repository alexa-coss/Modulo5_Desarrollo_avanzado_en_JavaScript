/* Este MÓDULO es el encargado de renderizar y redibujar todo el contenido, osea todo el DOM */

import { todos, toggleDone, removeTodo } from "./state.js"


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

    // green cuando todo ok // Mostrar como valido si no hay ningún error
    if (!Object.keys(errors).length) {
        [...form.elements]
            .filter((el) => el.name)
            .forEach((el) => el.classList.add("is-valid"));
    }
}

export function renderRegisterOutput(pre, dataObj) { // Mostrar un texto en el "<pre>"
    pre.textContent = JSON.stringify(dataObj, null, 2); // JSON del objeto registrado (datos de usuario)
}

export function renderTodoList(ul) {
    ul.replaceChildren(); // limpia

    todos.forEach((todo, index) => {
        const li = document.createElement("li"); // Crear elemento <li>
        li.className = // Añadir clases
            "list-group-item d-flex justify-content-between align-items-center";
        if (todo.done) li.classList.add("done");

        li.innerHTML = `
      <span>${todo.task} <small class="badge bg-info ms-2">${todo.dueDate}</small></span>
      <div>
        <button class="btn btn-sm btn-outline-success me-2" data-action="toggle" data-index="${index}">
            <i class="bi bi-check"></i>
        </button>
        <button class="btn btn-sm btn-outline-danger" data-action="delete" data-index="${index}">
            <i class="bi bi-trash"></i>
        </button>
      </div>
    `; // Añadir contenido, incluiendo buttons de check y eliminado (index)

        ul.appendChild(li); // Agregar <li> al <ul>
    });
}

/* ---------- evento delegación para lista ---------- */
export function setupTodoActions(ul, onChange) {
    ul.addEventListener("click", (e) => { // Añadir un evento click en toda la lista

        const btn = e.target.closest("button"); // Si no es un button // "closest" -> si el clcik esta cerca de un button, guardalo (button o undefined)

        if (!btn) return; // Regresa // Si no es button

        const { action, index } = btn.dataset; // Desestructuración | Si es button extrae action e index de "dataset" -> guarda todo lo que tenga el nombre "data-" (data-action, data-name) en el HTML
        if (action === "toggle") toggleDone(index); // Check (saber sobre que botón se hizo click)
        if (action === "delete") removeTodo(index); // Remove (saber sobre que botón se hizo click)

        onChange();
    });
}