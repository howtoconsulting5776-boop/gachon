import { z } from "zod";

export const adminEventCreateBodySchema = z.object({
  id: z.string().min(2).max(40).regex(/^[a-z0-9-]+$/),
  title: z.string().min(1).max(300),
  type: z.enum(["online", "offline", "hybrid"]),
  startAt: z.string().min(1),
  location: z.string().max(500).optional().nullable(),
  capacity: z.number().int().positive().max(100000).optional().nullable(),
});

export const adminEventUpdateBodySchema = z.object({
  title: z.string().min(1).max(300),
  type: z.enum(["online", "offline", "hybrid"]),
  startAt: z.string().min(1),
  location: z.string().max(500).optional().nullable(),
  capacity: z.number().int().positive().max(100000).optional().nullable(),
});
