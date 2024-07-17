import { z } from "zod";

export const createFormSchema = z.object({
  name: z.string().min(1, { message: "Campo obrigatório" }),
});

export type createFormData = z.infer<typeof createFormSchema>;
