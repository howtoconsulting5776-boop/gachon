import { z } from "zod";

export const eventRegisterBodySchema = z.object({
  name: z.string().min(2).max(80),
  email: z.string().email(),
  phone: z.string().max(40).optional().nullable(),
  privacyConsent: z.literal(true),
});
