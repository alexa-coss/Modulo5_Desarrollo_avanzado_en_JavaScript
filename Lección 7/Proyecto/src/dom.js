import { buscarSubcadena, filtrarPlanetasPorNombre } from './state.js';
import { planetas } from './planetas.js';

// Buscador
export function activarBuscador(render) {
  const input = document.getElementById('buscador');
  const contenedor = document.getElementById('contenedor-planetas');
  const sugerenciasDiv = document.getElementById('autocomplete-list'); // Nuevo div

  input.addEventListener('input', () => {
    const txt = input.value.trim().toLowerCase();

    // Buscar y mostrar planetas
    const resultados = filtrarPlanetasPorNombre(txt);
    render(contenedor, resultados);

    // Mostrar sugerencias
    mostrarSugerencias(txt, input, sugerenciasDiv, render);
  });
}

// Sugerencias de autocompletado
function mostrarSugerencias(valor, input, contenedor, render) {
  contenedor.innerHTML = "";

  if (!valor) {
    contenedor.style.display = 'none'; // Ocultar si el input está vacío
    return;
  }

  const sugerencias = [...new Set(planetas.map(p => p.nombre))]
    .filter(nombre => nombre.toLowerCase().startsWith(valor))
    .slice(0, 5);

  if (sugerencias.length === 0) {
    contenedor.style.display = 'none'; // Ocultar si no hay sugerencias
    return;
  }

  contenedor.style.display = 'block'; // Mostrar contenedor cuando hay sugerencias

  sugerencias.forEach(sug => {
    const item = document.createElement("div");
    item.textContent = sug;
    item.classList.add("autocomplete-item");

    item.onclick = () => {
      input.value = sug;
      input.focus();
      contenedor.innerHTML = "";
      contenedor.style.display = 'none'; // Ocultar al seleccionar

      const resultados = filtrarPlanetasPorNombre(sug);
      const contenedorPlanetas = document.getElementById('contenedor-planetas');
      render(contenedorPlanetas, resultados);
    };

    contenedor.appendChild(item);
  });
}

// Función para crear la tarjeta HTML de un planeta
export function crearCartaPlaneta(planeta) {
  return `
    <article class="card">
      <h2>${planeta.nombre}</h2>
      <p><strong>Descripción:</strong> ${planeta.descripcion}</p>
      <p><strong>Composición principal:</strong> ${planeta.compuestoPrincipal}.</p>
      <p><strong>Tipo:</strong> ${planeta.tipo}.</p>
      <p><strong>Clasificación:</strong> ${planeta.clasificacion}.</p>
      <p><strong>Descubierto en:</strong> ${planeta.descubiertoEn}.</p>
      <p><strong>Coordenadas:</strong> ${planeta.coordenadas}.</p>
    </article>
  `;
}

export function renderPlanetas(contenedor, planetas) {
  contenedor.innerHTML = planetas.map(crearCartaPlaneta).join('');
}
