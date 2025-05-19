/*
  📌 Práctica 3. Fetch y Axios
  Consumo de APIs con Fetch y Axios
*/

/*
    Objetivo

El objetivo es que desarrolles las habilidades necesarias para realizar solicitudes HTTP y manejar datos obtenidos de
APIs, utilizando tanto `fetch` como Axios. Además, practicarás el manejo de errores y la representación de datos en
una interfaz gráfica sencilla.


Problema: Consumo de APIs con Fetch y Axios
En este proyecto, crearás una aplicación web sencilla que permita obtener información de personajes de una API de tu
elección (como la de Star Wars o Rick & Morty). La aplicación deberá mostrar los datos obtenidos en la interfaz de
usuario y ofrecerá dos botones para realizar las mismas solicitudes, uno utilizando `fetch` y otro utilizando `axios`. Esto te permitirá comparar el uso de ambas herramientas.


  // 📌 Código base

// Implementa las Solicitudes con Fetch
const fetchBtn = document.getElementById('fetch-btn');
const dataContainer = document.getElementById('data-container');

fetchBtn.addEventListener('click', () => {
  fetch('https://rickandmortyapi.com/api/character')
    .then(response => {
      if (!response.ok) {
        throw new Error('Error en la solicitud');
      }
      return response.json();
    })
    .then(data => {
      // Completar: renderizar datos en el contenedor
      // Pista: Usa `data.results` para iterar sobre los personajes obtenidos.
    })
    .catch(error => {
      console.error('Error:', error);
      dataContainer.textContent = 'Hubo un error al obtener los datos.';
    });
});

// Implementa las Solicitudes con Axios

// 1. Instala Axios o inclúyelo mediante una CDN:
//   <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
// 2. Escribe una función que utilice Axios para obtener los datos y manejarlos de manera similar a `fetch`.

const axiosBtn = document.getElementById('axios-btn');

axiosBtn.addEventListener('click', () => {
  axios.get('https://rickandmortyapi.com/api/character')
    .then(response => {
      const data = response.data;
      // Completar: renderizar datos en el contenedor
      // Pista: Observa que Axios ya convierte la respuesta JSON, por lo que no necesitas usar `.json()`.
    })
    .catch(error => {
      console.error('Error:', error);
      dataContainer.textContent = 'Hubo un error al obtener los datos.';
    });
});

// Ejemplo de función de renderizado:
// Puedes adecuar este código
function renderCharacters(characters) {
  dataContainer.innerHTML = '';
  characters.forEach(character => {
    const characterElement = document.createElement('div');
    characterElement.innerHTML = `
      <h3>${character.name}</h3>
      <img src="${character.image}" alt="${character.name}">
    `;
    dataContainer.appendChild(characterElement);
  });
}
*/


const mensaje = document.getElementById('mensaje'); // Mensaje sobre método utilizado

// Implementa las Solicitudes con Fetch
const fetchBtn = document.getElementById('fetch-btn');
const dataContainer = document.getElementById('data-container');

fetchBtn.addEventListener('click', (event) => {
  event.preventDefault();
  fetch('https://rickandmortyapi.com/api/character')
    .then(response => {
      if (!response.ok) {
        throw new Error('Error en la solicitud');
      }
      return response.json();
    })

    .then(data => {
      // Completar: renderizar datos en el contenedor
      // Pista: Usa `data.results` para iterar sobre los personajes obtenidos.
      renderCharacters(data.results, 'Fetch')
    })

    .catch(error => {
      console.error('Error:', error);
      dataContainer.textContent = 'Hubo un error al obtener los datos.';
    });
});

// Implementa las Solicitudes con Axios

// 1. Instala Axios o inclúyelo mediante una CDN:
//   <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
// 2. Escribe una función que utilice Axios para obtener los datos y manejarlos de manera similar a `fetch`.

const axiosBtn = document.getElementById('axios-btn');

axiosBtn.addEventListener('click', (event) => {
  event.preventDefault();
  axios.get('https://rickandmortyapi.com/api/character')
    .then(response => {
      const data = response.data;
      // Completar: renderizar datos en el contenedor
      // Pista: Observa que Axios ya convierte la respuesta JSON, por lo que no necesitas usar `.json()`.
      renderCharacters(data.results, 'Axios')
    })

    .catch(error => {
      console.error('Error:', error);
      dataContainer.textContent = 'Hubo un error al obtener los datos.';
    });
});

// Ejemplo de función de renderizado:
// Puedes adecuar este código
function renderCharacters(characters, metodo) {
  dataContainer.innerHTML = ''; // Limpiar

  // Agregar título
  const title = document.createElement('h2'); // Crear h2 para título
  title.textContent = 'Personajes'; // Contenido
  dataContainer.appendChild(title); // Agregar

  // Crear y agregar el badge del método utilizado
  const metodoBadge = document.createElement('span');
  metodoBadge.classList.add('metodo-badge');
  metodoBadge.textContent = `Obtenido con ${metodo}`;
  dataContainer.appendChild(metodoBadge);
  
  // Agregar peronajes
  characters.forEach(character => { // Iterar sobre los personajes
    const characterElement = document.createElement('div'); // Crear contenedor para el personaje
    // Agregar datos del personaje al <div>
    characterElement.innerHTML = `
        <h3>${character.name}</h3>
        <img src="${character.image}" alt="${character.name}">
        <p><strong>Especie:</strong> ${character.species}</p>
        <p><strong>Estado:</strong> ${character.status}</p>
        <p><strong>Género:</strong> ${character.gender}</p>
        <p><strong>Origen:</strong> ${character.origin.name}</p>
        <p><strong>Ubicación actual:</strong> ${character.location.name}</p>
        <p><strong>Episodios:</strong> ${character.episode.length}</p>
    `;
    dataContainer.appendChild(characterElement); // Agregar <div> del personaje al contenedor principal
  });
}