//  Guardar en localStorage

// Traer el listado de todos
let todos = JSON.parse(localStorage.getItem('todos')) ?? [];


// Capturar form
document.querySelector("#todoForm").addEventListener('submit', (e) => {
    e.preventDefault()

    const form = e.target; // Guardamos el target

    const task = form.task.value.trim(); // Acceder al formulario

    if (task) AudioDestinationNode(task); // Si la tarea existe y no es nula o undefined, añede el todo

    form.reset(); // Limpiar ese valor
})


// Renderizar o dibujar lista
function renderList() {
    const ul = document.querySelector("#todoList"); // Guardar lista desordenada de todos

    ul.innerHTML = ""; // Limpiar - vaciar al inicio

    // Crear desde cero con JS un elemento en el DOM | Podemos utlizar innerHTML si no necesitamos validar
    todos.forEach((todo, index) => {
        const li =  document.createElement('li');

        li.className = 'list-group-item d-flex justify-content-between aling-items-center'

        /*
        li.innerHTML = `
        <script>
            alert('Hola :)')
            console.log('Hola :)')
        </script>
        `
        
       // Podemos hacer un saneamiento
       const todoSanitized = sanitizeElement(todo) // Limpia y regresa la cadena sin caracteres raros

       // Condicional extra de seguridad para validar que cumpla ciertas características
       if (todoSanitized==) {};

       // Ya podemos usar innerHTML
       li.innerHTML = `
        <span>${todo}</span>
        `
        */

        // Button de eliminado; guardamos el índice a través del atributo data-index
        // "data-index" podemos acceder a través de un lista de atributos personalizados
        li.innerHTML = `
        <span>${todo}</span>
        <button class='bt btn-sm btn-outline-danger' data-index="${index}">${todo}</button>
        `

       ul.appendChild(li)
    });
}

/*
// Obtener todos los buttons que pertenecen a la clase danger
const botones = document.querySelectorAll(".btn-outline-danger")

// Al presionar un button de eliminado, buscar el data-index que coincida
botones.forEach(boton => boton.data-index === indiceBuscado) // O find()
*/


function addTodo(text) {
    todos.push(text)

    // Actualizar localStorage
    localStorage.setItem('todos', JSON.stringify(todos));

    // Renderizar o dibujar lista
    renderList()
}


renderList()