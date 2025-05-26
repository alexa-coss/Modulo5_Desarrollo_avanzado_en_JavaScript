// Importamos Zod
const { z } = window.Zod;

// Esquema para validar los datos del formulario
const registerSchema = z.object({
    // PISTA: Define que el nombre debe ser una cadena no vacía.

    // PISTA: Valida que el correo tenga el formato correcto.

    // PISTA: La contraseña debe tener al menos 6 caracteres.

});

document.getElementById("registerForm").addEventListener("submit", (event) => {
    event.preventDefault();
      
    // Capturamos los valores ingresados
    const formData = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
    };

    try {
        // PISTA: Usa el método correcto de Zod para validar el esquema.
        //registerSchema.___?___(formData);
        alert("¡Registro exitoso!");
    } catch (error) {
        // PISTA: Muestra los mensajes de error en la página.
        document.getElementById("errors").textContent = error.errors.map(e => e.message).join(", ");
    }
});