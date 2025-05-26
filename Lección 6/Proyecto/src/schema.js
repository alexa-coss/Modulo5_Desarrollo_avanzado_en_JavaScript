/*Este MÓDULO contiene los "moldes" para las validaciones (como las Clases en POO) o modelo de datos */

import { z } from 'https://cdn.jsdelivr.net/npm/zod@3.22.4/+esm'; // A través de "z" accedemos a las librerias -> "import { z } from "zod""

/* schemas */
export const userSchema = z.object({
    name: z.string().trim().min(2, "Mínimo dos caracteres"), /* min 12, required */
    email: z.string().email("Correo inválido"), /* email, required */
    password: z.string().min(6).max(20), /* min 6 max 20 */
    phone: z
    .string()
    .regex(/^\d{10}$/, "Teléfono debe tener 10 dígitos")
    .optional()
    .or(z.literal("")), /* 10 digitos, opcional*/

    terms: z.boolean({
  required_error: "Debes aceptar los términos y condiciones",
  invalid_type_error: "Debes aceptar los términos y condiciones",
}).refine(val => val === true, {
  message: "Debes aceptar los términos y condiciones",
})


});

// ---------- Helpers ----------
export function validate(schema, formData) { // Toma el schema, formData y hace match (compara)
    const result = schema.safeParse(formData);
    return result.success ? { data: result.data } : { errors: result.error.flatten().fieldErrors };
}