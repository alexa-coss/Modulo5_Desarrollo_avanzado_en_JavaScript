/*
  📌 Práctica 2. Callbacks and JSON
  Gestión de una Biblioteca de Libros
*/

/*
    Objetivo

El objetivo es crear una pequeña aplicación de consola que permita realizar las siguientes tareas:
1. Consultar libros: Mostrar todos los libros almacenados en formato JSON.
2. Agregar libros: Permitir al usuario agregar un libro a la colección.
3. Actualizar la disponibilidad: Cambiar el estado de disponibilidad de un libro a 'prestado' o 'disponible'.
4. (Opcional) Simular un archivo JSON: Aunque no vas a leer/escribir realmente en un archivo, simularás la lectura y
    escritura de datos usando callbacks, como si interactuaras con un sistema de almacenamiento.


Problema: Gestión de una Biblioteca de Libros
En una cafetería moderna, es común que los clientes realicen pedidos que requieren preparación mientras se reciben
nuevos pedidos. Una interfaz debe mostrar los pedidos en progreso, permitir que los baristas trabajen en ellos de
manera asincrónica y actualizar el estado de los pedidos en tiempo real. El desafío consiste en simular este sistema
mediante JavaScript, utilizando el Event Loop y diferentes mecanismos de asincronía como `setTimeout`, Promises y
`async/await`.


  📌 Código base

// Datos iniciales de libros en formato JSON
let biblioteca = {
    "libros": [
        { "titulo": "Cien años de soledad", "autor": "Gabriel García Márquez", "genero": "Realismo mágico", "disponible": true },
        { "titulo": "1984", "autor": "George Orwell", "genero": "Distopía", "disponible": true }
    ]
};

// Función para simular la lectura de datos (asimilar la lectura de un archivo JSON)
function leerDatos(callback) {
    setTimeout(() => {
        // Aquí simulas leer el JSON con un retraso de 1 segundo
        callback(biblioteca);
    }, 1000);
}

// Función para mostrar todos los libros en consola
function mostrarLibros() {
    leerDatos((datos) => {
        console.log("Inventario de libros:");
        datos.libros.forEach((libro, index) => {
            console.log(`${index + 1}. ${libro.titulo} - ${libro.autor} (${libro.disponible ? 'Disponible' : 'Prestado'})`);
        });
    });
}

// Función para agregar un nuevo libro
function agregarLibro(titulo, autor, genero, disponible) {
    const nuevoLibro = { titulo, autor, genero, disponible };
    // Aquí falta la simulación de escribir el libro en el "archivo" (es decir, agregarlo al objeto)
    setTimeout(() => {
        // Pista: deberías agregar el nuevo libro a `biblioteca.libros`
    }, 1000);
}

// Función para cambiar la disponibilidad de un libro
function actualizarDisponibilidad(titulo, nuevoEstado) {
    // Simula un retraso antes de actualizar la disponibilidad
    setTimeout(() => {
        // Pista: busca el libro por título y cambia la propiedad 'disponible' a nuevoEstado
    }, 1000);
}

// Ejemplo de cómo ejecutar la aplicación
mostrarLibros();
agregarLibro("El principito", "Antoine de Saint-Exupéry", "Fábula", true);
actualizarDisponibilidad("1984", false);
*/


    // 📌 Para consola
/*
// 1. Datos iniciales de libros en formato JSON
let biblioteca = {
    "libros": [
        { "titulo": "Cien años de soledad", "autor": "Gabriel García Márquez", "genero": "Realismo mágico", "disponible": true },
        { "titulo": "1984", "autor": "George Orwell", "genero": "Distopía", "disponible": true }
    ]
};

// 2. Función para simular la lectura de datos (asimilar la lectura de un archivo JSON)
function leerDatos(callback) {
    setTimeout(() => {
        // Aquí simulas leer el JSON con un retraso de 1 segundo
        callback(biblioteca);
    }, 1000);
}

// 4. Función para simular la escritura de datos (asimilar la escritura de un archivo JSON)
function escribirDatos(nuevosDatos, callback) {
    setTimeout(() => {
        // Aquí simulas escribir el JSON con un retraso de 1 segundo
        biblioteca = nuevosDatos;
        callback();
    }, 1000);
}

// 3.1 Función para mostrar todos los libros en consola
function mostrarLibros() {
    leerDatos((datos) => {
        console.log("📚 Inventario de libros 📚");
        datos.libros.forEach((libro, index) => {
            console.log(`${index + 1}. ${libro.titulo} - ${libro.autor} | Género: ${libro.genero} (${libro.disponible ? 'Disponible' : 'Prestado'})`);
        });
    });
}

// 3.2 Función para agregar un nuevo libro
function agregarLibro(titulo, autor, genero, disponible) {
    const nuevoLibro = { titulo, autor, genero, disponible };
    // Aquí falta la simulación de escribir el libro en el "archivo" (es decir, agregarlo al objeto)
    // setTimeout(() => {
        // Pista: deberías agregar el nuevo libro a `biblioteca.libros`
        // biblioteca.libros.push(nuevoLibro);
        // console.log(`Libro "${titulo}" agregado exitosamente.`);
    // }, 1000);
   leerDatos((datos) => {
    datos.libros.push(nuevoLibro);
    escribirDatos(datos, () => {
        console.log(`🔄 Actualizando 🔄`);
        console.log(`📘 Libro "${titulo}" agregado exitosamente.`);
    })
   })
}

// 3.3 Función para cambiar la disponibilidad de un libro
function actualizarDisponibilidad(titulo, nuevoEstado) {
    // Simula un retraso antes de actualizar la disponibilidad
    //setTimeout(() => {
        // Pista: busca el libro por título y cambia la propiedad 'disponible' a nuevoEstado
        // const libro = biblioteca.libros.find(libro => libro.titulo === titulo);

        // if (libro) {
            // libro.disponible = nuevoEstado;
            // console.log(`📒 Libro "${titulo}", disponibilidad de actualizada: ${nuevoEstado ? 'Disponible' : 'Prestado'}.`);
        // } else {
            // console.log(`📕 Libro "${titulo}" no encontrado.`);
        // }
    // }, 1000);
   leerDatos((datos) => {
        const libro = datos.libros.find(libro => libro.titulo === titulo);

        if (libro) {
            libro.disponible = nuevoEstado;
            escribirDatos(datos, () => {
                console.log(`🔄 Actualizando 🔄`);
                console.log(`📒 Libro "${titulo}", disponibilidad de actualizada: ${nuevoEstado ? 'Disponible' : 'Prestado'}.`);
            });
        } else {
            console.log(`📕 Libro "${titulo}" no encontrado.`);
        }
   })
}

// Inventario final
function mostrarLibrosFinales() {
    setTimeout(() => {
        mostrarLibros();
    }, 5000);
}

// Ejemplo de cómo ejecutar la aplicación
mostrarLibros();
agregarLibro("El principito", "Antoine de Saint-Exupéry", "Fábula", true);
actualizarDisponibilidad("1984", false);
mostrarLibrosFinales();
*/


    // 📌 Para HTML

// 1. Datos iniciales de libros en formato JSON
let biblioteca = {
    "libros": [
        { "titulo": "Cien años de soledad", "autor": "Gabriel García Márquez", "genero": "Realismo mágico", "disponible": true },
        { "titulo": "1984", "autor": "George Orwell", "genero": "Distopía", "disponible": true }
    ]
};

// 2. Función para simular la lectura de datos (asimilar la lectura de un archivo JSON)
function leerDatos(callback) {
    setTimeout(() => {
        // Aquí simulas leer el JSON con un retraso de 1 segundo
        callback(biblioteca);
    }, 1000);
}

// 4. Función para simular la escritura de datos (asimilar la escritura de un archivo JSON)
function escribirDatos(nuevosDatos, callback) {
    setTimeout(() => {
        // Aquí simulas escribir el JSON con un retraso de 1 segundo
        biblioteca = nuevosDatos;
        callback();
    }, 1000);
}

// 3.1 Función para mostrar todos los libros en consola
function mostrarLibros() {
    leerDatos((datos) => {
        const listaLibros = document.getElementById('libros');
        listaLibros.innerHTML = ''; // Limpiar antes de agregar libro

        datos.libros.forEach((libro, index) => {
            const libroElemento = document.createElement('li'); // Crear nuevo elemento li para cada libro
            libroElemento.textContent = `${libro.titulo} - ${libro.autor} | Género: ${libro.genero} | ${libro.disponible ? 'Disponible' : 'Prestado'}`;

            listaLibros.appendChild(libroElemento); // Agregar elemento a la lista
        });
    });
}

// 3.2 Función para agregar un nuevo libro
function agregarLibro(titulo, autor, genero, disponible, event) {
    event.preventDefault();

    const nuevoLibro = { titulo, autor, genero, disponible };

    leerDatos((datos) => {
    datos.libros.push(nuevoLibro);
    escribirDatos(datos, () => {
        mostrarMensaje(`🔄 Actualizando 🔄`);
        mostrarMensaje(`📘 Libro "${titulo}" agregado exitosamente.`);

        // Limpiar campos
        document.getElementById('titulo').value = '';
        document.getElementById('autor').value = '';
        document.getElementById('genero').value = '';
        document.getElementById('Estado').value = '';
    })
   })
}

// 3.3 Función para cambiar la disponibilidad de un libro
function actualizarDisponibilidad(titulo, nuevoEstado, event) {
    event.preventDefault();

    leerDatos((datos) => {
        const libro = datos.libros.find(libro => libro.titulo === titulo);

        if (libro) {
            libro.disponible = nuevoEstado;
            escribirDatos(datos, () => {
                mostrarMensaje(`🔄 Actualizando 🔄`);
                mostrarMensaje(`📒 Libro "${titulo}", disponibilidad de actualizada: ${nuevoEstado ? 'Disponible' : 'Prestado'}.`);

                // Limpiar campos
                document.getElementById('tituloActualizar').value = '';
                document.getElementById('nuevoEstado').value = '';
            });
        } else {
            mostrarMensaje(`📕 Libro "${titulo}" no encontrado.`);
        }
   })
}


// Mostrar inventario de libros
function mostrarInventario() {
    const listaLibros = document.getElementById('librosLista');
    listaLibros.style.display = 'block';  // Mostrar el inventario
    mostrarLibros();  // Llamar a la función para mostrar los libros
}


    // Eventos 

document.getElementById('consultar').addEventListener('click', function(event) {
    event.preventDefault();
    mostrarInventario();
});

document.getElementById('agregar').addEventListener('click', function(event) {
    event.preventDefault();

    const titulo = document.getElementById('titulo').value.trim();
    const autor = document.getElementById('autor').value.trim();
    const genero = document.getElementById('genero').value.trim();
    const estadoSelect = document.getElementById('Estado');
    const estadoValor = estadoSelect.value;

    if (!estadoValor) {
        mostrarModal('Por favor, llena todos los campos.');
        return;
    }

    const disponible = estadoValor === 'true';

    agregarLibro(titulo, autor, genero, disponible, event);
});


document.getElementById('actualizar').addEventListener('click', function(event) {
    event.preventDefault();

    const titulo = document.getElementById('tituloActualizar').value.trim();
    const estadoSelect = document.getElementById('nuevoEstado');
    const estadoValor = estadoSelect.value;

    if (!titulo || !estadoValor) {
        mostrarModal('Por favor, llena todos los campos.');
        return;
    }

    const nuevoEstado = estadoValor === 'true';
    
    actualizarDisponibilidad(titulo, nuevoEstado, event);
});

function mostrarMensaje(texto) {
    const mensaje = document.getElementById('mensaje');
    const nuevoMensaje = document.createElement('p');
    nuevoMensaje.textContent = texto;
    mensaje.appendChild(nuevoMensaje);
}

// Mostrar modal
function mostrarModal(message) {
    const modal = document.getElementById('modal'); // Modal
    const modalText = document.getElementById('modal-text'); // Texto modal
    modalText.textContent = message; // Cambiar mensaje
    modalText.innerHTML = message.replace(/\n/g, '<br>'); // Reemplaza \n por <br> para saltos de línea
    modal.style.display = 'flex'; // Mostrar modal
}

// Cerrar el modal
function cerrarModal() {
    const modal = document.getElementById('modal'); // Obtener el modal
    modal.style.display = 'none'; // Ocultar el modal
}