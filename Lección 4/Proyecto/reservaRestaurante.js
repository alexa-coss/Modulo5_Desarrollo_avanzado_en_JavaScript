/*
  📌 Práctica 4. Introducción a Flexbox
  Sistema de Reservas para un Restaurante
*/

/*
    Objetivo

Construir un sistema de reservas utilizando **promesas** y **`async/await`**, con manejo de errores adecuado.


Problema: Sistema de Reservas para un Restaurante
Imagina que tienes un restaurante y deseas permitir a los clientes hacer reservas en línea. Para ello, el sistema
debe hacer las siguientes acciones:
1. Verificar si hay mesas disponibles para el día y la hora solicitados.
2. Si las mesas están disponibles, confirmar la reserva.
3. Si todo está bien, enviar un correo de confirmación.
4. Manejar adecuadamente los errores (si no hay mesas disponibles o si hay un fallo en el envío del correo).


  // 📌 Código base

// Aquí tienes un código incompleto para tomar como base. Cada función está definida, pero los pasos cruciales aún no están implementados.

// Simulando una base de datos de mesas
const mesasDisponibles = 5;  // Número de mesas disponibles para reservar

// Función que simula la verificación de disponibilidad de mesas
function verificarDisponibilidad(mesasSolicitadas) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Completa la lógica aquí: Si hay suficientes mesas disponibles, resuelve la promesa, 
      // de lo contrario, recházala con un mensaje adecuado.
    }, 2000);  // Simula un retraso en la verificación (2 segundos)
  });
}

// Función que simula el envío de un correo de confirmación
function enviarConfirmacionReserva(nombreCliente) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Completa la lógica aquí: Simula un envío de correo. Usa Math.random() 
      // para simular si el correo se envió correctamente o si ocurrió un error.
    }, 1500);  // Simula el envío de un correo (1.5 segundos)
  });
}

// Función principal para manejar una reserva
async function hacerReserva(nombreCliente, mesasSolicitadas) {
  try {
    console.log("Verificando disponibilidad de mesas...");
    const disponibilidad = await verificarDisponibilidad(mesasSolicitadas);  // Llama a la función de verificación
    
    // Completa el flujo aquí: Si hay mesas disponibles, llama a la función para enviar la confirmación.
    // Si no hay mesas disponibles o si ocurre un error, captura el error.
  } catch (error) {
    console.log("Error:", error);  // Maneja los errores en la promesa
  }
}

// Llamada de prueba
hacerReserva("Juan Pérez", 3);  // Intenta hacer una reserva para 3 personas
*/


// Aquí tienes un código incompleto para tomar como base. Cada función está definida, pero los pasos cruciales aún no están implementados.

// Simulando una base de datos de mesas
const mesasDisponibles = 5;  // Número de mesas disponibles para reservar
const mensaje = document.getElementById("mensaje");

// 1. Función que simula la verificación de disponibilidad de mesas
function verificarDisponibilidad(mesasSolicitadas) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Completa la lógica aquí: Si hay suficientes mesas disponibles, resuelve la promesa, 
      // de lo contrario, recházala con un mensaje adecuado.
      if (mesasSolicitadas <= mesasDisponibles) {
        resolve(`¡Mesas disponibles! ✅`);
      } else {
        reject(`No hay suficientes mesas disponibles.`)
      }
    }, 2000);  // Simula un retraso en la verificación (2 segundos)
  });
}

// 2. Función que simula el envío de un correo de confirmación
function enviarConfirmacionReserva(nombreCliente) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Completa la lógica aquí: Simula un envío de correo. Usa Math.random() 
      // para simular si el correo se envió correctamente o si ocurrió un error.
      const exito = Math.random() > 0.2; // 80% de exito

      if (exito) {
        mensaje.textContent = `...`;
        resolve(`📧 Correo enviado a ${nombreCliente}.`);
      } else {
        reject(`Error al enviar correo de confirmación.`);
      }
    }, 1500);  // Simula el envío de un correo (1.5 segundos)
  });
}

// 3. Función principal para manejar una reserva
async function hacerReserva(nombreCliente, mesasSolicitadas, fecha, hora, mesa, email) {
  try {
    mensaje.style.color = "black";
    mensaje.textContent = `Verificando disponibilidad de mesas...`;

    const disponibilidad = await verificarDisponibilidad(mesasSolicitadas);  // Llama a la función de verificación
    mensaje.textContent = disponibilidad;
    
    // Completa el flujo aquí: Si hay mesas disponibles, llama a la función para enviar la confirmación.
    const confirmacion = await enviarConfirmacionReserva(nombreCliente);
    mensaje.textContent = confirmacion;

    // Aquí mostramos el mensaje con todos los datos
    setTimeout(() => {
      mensaje.innerHTML = `${confirmacion}<br>
      Reservación "${mesa}" confirmada para ${nombreCliente} (${email}).<br>
      📅 ${fecha}, ${hora} horas.<br>
      🛎️ Mesas solicitadas: ${mesasSolicitadas}.<br>`;
    }, 2000);

    // Si no hay mesas disponibles o si ocurre un error, captura el error.
  } catch (error) {
    // Maneja los errores en la promesa
    mensaje.style.color = "red";
    mensaje.textContent = error;
  }
}

/*
// Llamada de prueba
hacerReserva("Juan Pérez", 3);  // Intenta hacer una reserva para 3 personas
*/

// Conetar con form HTML
document.getElementById("form").addEventListener("submit", function (e) {
  e.preventDefault();

  const date = document.getElementById("fecha").value;
  const time = document.getElementById("hora").value;
  const number = parseInt(document.getElementById("mesas").value);
  const name = document.getElementById("nombre").value.trim();
  const email = document.getElementById("email").value.trim();
  const table = document.getElementById("mesa").value.trim();

  if (!date || !time || isNaN(number) || !name || !email || !table) {
    alert(`Por favor, completa todos los campos.`);
    return;
  }

  hacerReserva(name, number, date, time, table, email);
});
