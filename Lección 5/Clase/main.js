// Capturar elementos del HTML
const form = document.querySelector("#registerForm");
const out = document.querySelector("#output");

const emailInput = document.querySelector("#email")

// Obtener valores en un objeto data
form.addEventListener('submit', (ev) => {
    ev.preventDefault()
    const data = Object.fromEntries(new FormData(form));

    console.log(data);

    out.textContent = JSON.stringify(data, null, 2);

    /*
    // Hay que hacer validaciones de seguridad
    out.innerHTML = `
    <p>Texto</p>
    <p>Texto</p>
    <p>Texto</p>
    `
    */

    form.reset()
})

// Cuando sea invalido agregamos un mensaje personalizado
emailInput.addEventListener('invalid', e => {
    e.target.setCustomValidity('Por favor ingresa un correo valido :(')
})

// Limpiar mensaje de error personalizado para que el navegador pueda validar de nuevo normalmente
emailInput.addEventListener('input', e => {
    e.setCustomValidity("");
})