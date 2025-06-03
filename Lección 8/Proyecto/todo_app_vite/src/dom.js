/* Este MÓDULO es el encargado de renderizar y redibujar todo el contenido, osea todo el DOM */

import { postUser, getUser, postTodo, getTodos, putTodo, deleteTodo } from "./state.js";


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

/* ---------- 1. Resgister ---------- */
export function renderRegisterOutput(pre, dataObj) { // Mostrar un texto en el "<pre>"
    pre.textContent = JSON.stringify(dataObj, null, 2); // JSON del objeto registrado (datos de usuario)
}

/* ---------- 2. Login ---------- */
export function renderLoginOutput(container, message) {
    container.textContent = message;
}

/* ---------- 3. Todo App ---------- */
export async function renderTodoList(ul) {
    ul.replaceChildren(); // limpia

    const todos = await getTodos()
    todos.forEach((todo) => {
        const li = document.createElement("li"); // Crear elemento <li>
        li.className = // Añadir clases
            "list-group-item d-flex justify-content-between align-items-center";
        if (todo.done) li.classList.add("done");

        const { fecha, hora } = splitDateTime(todo.dueDate);

        const checkBtnClass = todo.done
        ? "btn btn-sm btn-success me-2"         // fondo verde si ya está hecho
        : "btn btn-sm btn-outline-success me-2"; // borde verde si no

        li.innerHTML = `
            <div class="d-flex justify-content-between align-items-center w-100">
                <div class="flex-grow-1">
                <span class="task-text">${todo.task}</span>
                <span>
                    <small class="badge bg-info ms-2">${fecha}</small>
                    <small class="badge bg-secondary ms-2">${hora}</small>
                </span>
                </div>
                <div>
                <button class="${checkBtnClass}" data-action="toggle" data-id="${todo.id}">
                    <i class="bi bi-check"></i>
                </button>
                <button class="btn btn-sm btn-outline-danger" data-action="delete" data-id="${todo.id}">
                    <i class="bi bi-trash"></i>
                </button>
                </div>
            </div>
        `; // Añadir contenido, incluiendo buttons de check y eliminado (index)

        ul.appendChild(li); // Agregar <li> al <ul>
    });
}

function splitDateTime(dateTimeStr) {
    const dt = new Date(dateTimeStr);
    const day = String(dt.getDate()).padStart(2, '0');
    const month = String(dt.getMonth() + 1).padStart(2, '0');
    const year = dt.getFullYear();
    const hours = String(dt.getHours()).padStart(2, '0');
    const minutes = String(dt.getMinutes()).padStart(2, '0');
    return {
        fecha: `${day}/${month}/${year}`,
        hora: `${hours}:${minutes}`
    };
}


/* ---------- evento delegación para lista ---------- */
export function setupTodoActions(ul, onChange) {
    ul.addEventListener("click", async (e) => { // Añadir un evento click en toda la lista

        const btn = e.target.closest("button"); // Si no es un button // "closest" -> si el clcik esta cerca de un button, guardalo (button o undefined)

        if (!btn) return; // Regresa // Si no es button

        const { action, id } = btn.dataset; // Desestructuración | Si es button extrae action e index de "dataset" -> guarda todo lo que tenga el nombre "data-" (data-action, data-name) en el HTML        
        if (action === "toggle") { // Check (saber sobre que botón se hizo click)
            // Obtener el todo actual para saber el estado "done"
            const todos = await getTodos();
            const todo = todos.find(t => t.id == id);
            if (todo) {
                await putTodo({ id: todo.id, done: !todo.done });
            }
        }
        if (action === "delete") { // Remove (saber sobre que botón se hizo click)
            await deleteTodo(id);
        }

        onChange();
    });
}