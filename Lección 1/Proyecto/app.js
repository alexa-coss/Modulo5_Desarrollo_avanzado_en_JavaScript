/*
  📌 Práctica 7. Divide y Vencerás
  Búsqueda del Máximo en un Arreglo con Divide and Conquer
*/

/*
    Objetivo

Crear una simulación interactiva que permita simular algunas actividades en una cafetería:
1.	Reciba nuevos pedidos de clientes.
2.	Procese cada pedido de manera asincrónica con un tiempo de preparación simulado.
3.	Actualice el estado de cada pedido ('En Proceso' -> 'Completado') en la interfaz de usuario.


Problema: Simulador de Pedidos en una Cafetería
En una cafetería moderna, es común que los clientes realicen pedidos que requieren preparación mientras se reciben
nuevos pedidos. Una interfaz debe mostrar los pedidos en progreso, permitir que los baristas trabajen en ellos de
manera asincrónica y actualizar el estado de los pedidos en tiempo real. El desafío consiste en simular este sistema
mediante JavaScript, utilizando el Event Loop y diferentes mecanismos de asincronía como `setTimeout`, Promises y
`async/await`.


  📌 Código base

const orderList = document.getElementById('orderList');
const addOrderBtn = document.getElementById('addOrderBtn');

let orderId = 1; // Para identificar los pedidos

addOrderBtn.addEventListener('click', () => {
    const order = { id: orderId++, status: 'En Proceso' };
    addOrder(order);
    processOrder(order);
});

function addOrder(order) {
    const listItem = document.createElement('li');
    listItem.id = `order-${order.id}`;
    listItem.textContent = `Pedido #${order.id}: ${order.status}`;
    orderList.appendChild(listItem);
}

function updateOrderStatus(order, status) {
    const listItem = document.getElementById(`order-${order.id}`);
    if (listItem) {
        listItem.textContent = `Pedido #${order.id}: ${status}`;
    }
}

async function processOrder(order) {
    // TODO: Simular la preparación del pedido usando setTimeout y Promise
    // TODO: Actualizar el estado del pedido a "Completado"
}
*/

console.log('El archivo JavaScript se ha cargado correctamente');
const orderList = document.getElementById('orderList'); // Button Agregar Pedido
const addOrderBtn = document.getElementById('addOrderBtn'); // Obtener el contenedor de la lista de resultados
const checkboxes = document.querySelectorAll('input[type="checkbox"]'); // Checkboxes

let orderId = 1; // Para identificar los pedidos

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

    // 2.1. Receiving a new order.
addOrderBtn.addEventListener('click', (event) => {
    event.preventDefault();

    // Filtrar checkboxes seleccionados
    const selectedProducts = Array.from(checkboxes)
        .filter(checkbox => checkbox.checked) // Filtra solo los seleccionados
        .map(checkbox => checkbox.value); // Extrae sus valores

    // Verificar si al menos un producto está seleccionado
    if (selectedProducts.length === 0) {
        mostrarModal('Por favor, selecciona al menos un producto.');
        return; // No continuar si no hay productos seleccionados
    }

    // 3.1. Generate an order with a unique identifier.
    const order = { id: orderId++, status: 'En Proceso' };
    addOrder(order); // Mostar estado "En Proceso"
    processOrder(order); // MAndar a "Proceso de preparación"

    // Mostrar el modal con el número de pedido y los productos seleccionados
    mostrarModal(`Pedido #${order.id}\n ${selectedProducts.join(', ')}`);

    // Limpiar checkboxes seleccionados
    checkboxes.forEach(checkbox => {
        checkbox.checked = false;
    });
});

    // 3.2. It will be displayed on the interface with the status 'In Process'.
function addOrder(order) {
    const listItem = document.createElement('li'); // Crear nuevo elemento <li>
    listItem.id = `order-${order.id}`; // Poner su ID
    listItem.textContent = `Pedido #${order.id}: ${order.status}`; // Pedido con número y estado
    listItem.classList.add('en-proceso'); // Agrega clase para estado "En Proceso"
    orderList.appendChild(listItem); // Agregarlo a la ul del html
}

    // 2.2. Visual update of order status.
function updateOrderStatus(order, status) {
    const listItem = document.getElementById(`order-${order.id}`); // Buscar el <li> por su ID
    if (listItem) { // Si existe el ID
        listItem.textContent = `Pedido #${order.id}: ${status}`; // Actualiza el estado

        // Cambiar clase según estado
        if (status.toLowerCase().includes("completado")) {
            listItem.classList.remove('en-proceso');
            listItem.classList.add('completado');
        }
    }
}

    // 2.3. Simulation of order preparation.
    // 4.3.	Utiliza `async/await` para actualizar el estado en tiempo real.
async function processOrder(order) {
    // TODO: Simular la preparación del pedido usando setTimeout y Promise
    const preparationTime = Math.floor(Math.random() * 3000) + 2000;
        // Math.random() -> Generar decimal aleatorio 0 <= x < 1.
        // Math.random() * 5000 -> Multiplica por 5000 (entre 0 y 4999.999)
        // Math.floor(...) -> Redondea al número entero menor más cercano.

        // 4.1. Use `setTimeout` to simulate order preparation time.
        // 4.2. Implement **Promises** to handle order fulfillment.
        await new Promise(resolve => {
            setTimeout(() => {
                resolve();
            }, preparationTime);
        })

    // TODO: Actualizar el estado del pedido a "Completado"
    // 3.3. After a random time (simulating preparation), the status will change to 'Completed'.
    updateOrderStatus(order, "Completado.");
}