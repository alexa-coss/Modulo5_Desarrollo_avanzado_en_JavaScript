import { planetas } from './planetas.js';
import { renderPlanetas, activarBuscador } from './dom.js';

    // Mostrar planetas
const contenedorPlanetas = document.querySelector('#contenedor-planetas');

renderPlanetas(contenedorPlanetas, planetas);

    // Buscador
activarBuscador(renderPlanetas);
