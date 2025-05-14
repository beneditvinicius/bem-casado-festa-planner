
import { z } from "zod";

export const ColorFormSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  code: z.string().min(1, "Código é obrigatório"),
  color: z.string().min(1, "Cor HEX é obrigatória"),
  isNew: z.boolean().optional(),
});

export type ColorFormValues = z.infer<typeof ColorFormSchema>;
