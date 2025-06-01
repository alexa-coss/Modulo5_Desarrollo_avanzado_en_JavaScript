/* Este MÓDULO que maneja todo el estado de la aplicación, concentra la funcionalidad para manipular datos */

import { planetas } from './planetas.js';

export function buscarSubcadena(texto, objetivo) {
  const firma = str => [...str].reduce((a, c) => a + c.charCodeAt(0), 0);

  const t = texto.toLowerCase();
  const o = objetivo.toLowerCase();
  const firmaObj = firma(o);
  const res = [];

  for (let i = 0; i <= t.length - o.length; i++) {
    const ventana = t.slice(i, i + o.length);
    if (firma(ventana) === firmaObj && ventana === o) res.push(i);
  }
  return res;
}

export function filtrarPlanetasPorNombre(busqueda = '') {
  const txt = busqueda.toLowerCase();
  if (!txt) return [...planetas]; // Nada escrito → mostrar todos

  return planetas
    .filter(p => buscarSubcadena(p.nombre, txt).length) // Planetas que contienen la subcadena
    .map(p => ({
      planeta: p,
      pos: buscarSubcadena(p.nombre, txt)[0] // Primera posición donde aparece
    }))
    .sort((a, b) => a.pos - b.pos || // 1º: que empiece con la subcadena
          a.planeta.nombre.localeCompare(b.planeta.nombre, 'es', { sensitivity: 'base' })) // 2º: alfabético
    .map(o => o.planeta); // Devolver solo el planeta
}