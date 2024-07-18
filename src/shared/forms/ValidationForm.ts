import { z } from "zod";

export const createFormSchema = z.object({
  nomeCompleto: z
    .string()
    .min(1, { message: "Campo obrigatório" })
    .min(3, { message: "Nome inválido! minimo 3 caracteres" }),
  email: z.string().email("formato de email invalido!"),
  cidadeId: z.number().min(1, { message: "Campo obrigatório" }),
});

export type createFormData = z.infer<typeof createFormSchema>;
