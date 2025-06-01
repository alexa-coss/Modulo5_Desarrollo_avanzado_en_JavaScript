const planetas = require('./planetas');

console.log("\n🌍 Registro de planetas descubiertos 🌍\n");

// Aquí mostraremos la información de los planetas
planetas.forEach((planeta, index) => {
  console.log(`#${index + 1} 🪐`);
  console.log(`🌟 ${planeta.nombre} 🌟`);
  console.log(`📝 Descripción: ${planeta.descripcion}`);
  console.log(`🧪 Compuesto principal: ${planeta.compuestoPrincipal}.`);
  console.log(`🔭 Tipo: ${planeta.tipo}.`);
  console.log(`📚 Clasificación: ${planeta.clasificación}.`);
  console.log(`📅 Descubierto en: ${planeta.descubiertoEn}.`);
  console.log(`📍 Coordenadas: ${planeta.coordenadas}.`);
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
});