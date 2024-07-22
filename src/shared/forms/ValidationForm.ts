import { z } from "zod";

export const loginFormSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Campo obrigatório" })
    .email("Email inválido"),
  password: z.string().min(1, { message: "Campo obrigatório" }),
});

export type loginFormData = z.infer<typeof loginFormSchema>;

export const pessoaFormSchema = z.object({
  nomeCompleto: z
    .string()
    .min(1, { message: "Campo obrigatório" })
    .min(3, { message: "Nome inválido! minimo 3 caracteres" }),
  email: z.string().email("formato de email invalido!"),
  cidadeId: z.any(),
});

export type pessoaFormData = z.infer<typeof pessoaFormSchema>;

export const cidadeFormSchema = z.object({
  nome: z
    .string()
    .min(1, { message: "Campo obrigatório" })
    .min(3, { message: "Nome inválido! minimo 3 caracteres" }),
});

export type cidadeFormData = z.infer<typeof cidadeFormSchema>;
