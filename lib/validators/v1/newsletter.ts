import { z } from "zod";

export const newsletterSubscribeBodySchema = z.object({
  email: z.string().email(),
  privacyConsent: z.literal(true),
});

export const newsletterUnsubscribeBodySchema = z.object({
  token: z.string().min(10).max(200),
});
