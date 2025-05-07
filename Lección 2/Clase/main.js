/*
function sumar(a, b, callback) {
    const resultado = a + b;
    console.log("Antes de ejecutar el callback");
    callback(resultado) // -> No es necesario poner: "return callback(resultado)".
}
*/

function sumar(a, b, mifuncionexterna) {
    const resultado = a + b;
    console.log("Antes de ejecutar el callback");
    mifuncionexterna(resultado) // -> No es necesario poner: "return callback(resultado)".
}

console.log("Antes de ejecutar suma");
// sumar(5, 10, console.log) // Esto no se realiza.
    // Ejemplo de callback con función anónima
sumar(5, 10, (resultado) => console.log('Suma: ', resultado)) // Si la voy a usar varias veces es mejor ponerle nombre.

    // Ejemplo de callback con función anónima
sumar(5, 10, (resultado) => console.log('Suma: ', resultado))

// Una función siempre recibe y devuelve algo.

// Al pasarlo como argumento ya es un callback.
// Llamada de retorno.

/*
function callback() {

}
*/

// Funciones iguales:

function functionPanchito(resultado) {
    console.log(resultado)
}

    // Función anónima de tipo flecha que no puedo ejecutar
(resultado) => {
    console.log(resultado)
}


// Ejemplo de callback para manipulación del DOM
// Cuando tenemos una API que no sabemos cuando va a responder
/*
const inputNombre = document.querySelector("#Nombre-Usuario");

inputNombre.addEventListener("focus", () => { // Cuando el usuario haga "focus", Cambia las...
    // Cambia las clases de CSS que están asociadas al input
})
*/


/*
Protocolos:

APIs REST (Representational State Transfer) -> serie de principios.
APIs SOAP (Simple Object Access Protocol) -> protocolo.

Diferencias: https://miro.medium.com/v2/resize:fit:860/0*nAEBGydW0F5VYpHA.png
*/


// JSON

const jsonExample = `{
"nombre":"Alexa",
"edad":25
}`

console.log("(JSON) Nombre:", jsonExample.nombre)

const objectExample = JSON.parse(jsonExample);

console.log("Nombre:", objectExample.nombre)