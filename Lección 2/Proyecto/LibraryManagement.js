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
    /*
    setTimeout(() => {
        // Pista: deberías agregar el nuevo libro a `biblioteca.libros`
        biblioteca.libros.push(nuevoLibro);
        console.log(`Libro "${titulo}" agregado exitosamente.`);
    }, 1000);
    */
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
    /*
    setTimeout(() => {
        // Pista: busca el libro por título y cambia la propiedad 'disponible' a nuevoEstado
        const libro = biblioteca.libros.find(libro => libro.titulo === titulo);

        if (libro) {
            libro.disponible = nuevoEstado;
            console.log(`📒 Libro "${titulo}", disponibilidad de actualizada: ${nuevoEstado ? 'Disponible' : 'Prestado'}.`);
        } else {
            console.log(`📕 Libro "${titulo}" no encontrado.`);
        }
    }, 1000);
    */
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