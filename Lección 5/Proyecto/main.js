const form = document.getElementById('registerForm');
const out = document.getElementById('registerOutput');

form.addEventListener('submit', function(event) {
    event.preventDefault(); // Evita envío automático

    // Variables
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const intereses = document.querySelectorAll('input[name="intereses"]:checked');
    const horario = document.querySelector('input[name="horario"]:checked');
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    const terminos = document.getElementById('terminos').checked;

    // Forzar estilos de validación de Bootstrap
    form.classList.add('was-validated');

    /*
    // Validación básica
    if (!name || !email || !phone || intereses.length === 0 || !horario || !date || !time || !terminos) {
        alert('Por favor, completa todos los campos obligatorios.');
        return;
    }
    */

    // Validación personalizada
    if (intereses.length === 0) {
        alert("Debes seleccionar al menos un interés.");
        return;
    }

    // Si todo está bien
    alert('Registro exitoso. ¡Gracias por registrarte! ✨');

    const data = Object.fromEntries(new FormData(form).entries());
    data.intereses = Array.from(intereses).map(i => i.value); // Checkboxes múltiples en intereses

    out.textContent = JSON.stringify(data, null, 2);

    form.reset();
    form.classList.remove('was-validated'); // Reset estilo
});