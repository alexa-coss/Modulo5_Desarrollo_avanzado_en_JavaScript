/*Este MÓDULO contiene los "moldes" para las validaciones (como las Clases en POO) o modelo de datos */

import { z } from 'https://cdn.jsdelivr.net/npm/zod@3.22.4/+esm'; // A través de "z" accedemos a las librerias -> "import { z } from "zod""

/* schemas */
export const userSchema = z.object({
    name: z.string().trim().min(2, "Mínimo dos caracteres"),
    email: z.string().email("Correo inválido"), /* email required */
    password: z.string().min(12).max(20), /* max 20 min 12 ab[-_$*#.] */ /* regex("[a-zA-Z]+[0-9]+\-+\${1}") | "+" -> una o más veces lo que esta a la izquierda | "$" una vez */
    phone: z
    .string()
    .regex(/^\d{10}$/, "Teléfono debe tener 10 dígitos")
    .optional()
    .or(z.literal("")), /* 10 digitos opcional*/
    nickname: z.string().min(3),
})

export const todoSchema = z.object({
    task: z
        .string()
        .trim()
        .min(1, "Obligatorio")
        .max(50, "Máx. 50 caracteres"),
    dueDate: z
        .string()
        .refine(
            (d) => { // Que no sea menor a hoy
                const today = new Date();
                const date = new Date(d);
                return !isNaN(date) && date >= today.setHours(0, 0, 0, 0);
            },
            { message: "Fecha inválida o en el pasado" }
        ),
});

// ---------- Helpers ----------
export function validate(schema, formData) { // Toma uno de los dos schemas, formData y hace match (compara)
    const result = schema.safeParse(formData);
    return result.success ? { data: result.data } : { errors: result.error.flatten().fieldErrors };
}