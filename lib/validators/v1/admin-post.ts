import { z } from "zod";

export const adminPostCreateBodySchema = z.object({
  category: z.enum(["notice", "board", "qna"]),
  title: z.string().min(1).max(200),
  excerpt: z.string().min(1).max(8000),
  content: z.string().max(20000).optional().nullable(),
  author: z.string().max(120).optional().nullable(),
});

export const adminPostUpdateBodySchema = z.object({
  title: z.string().min(1).max(200),
  excerpt: z.string().min(1).max(8000),
  content: z.string().max(20000).optional().nullable(),
  author: z.string().max(120).optional().nullable(),
});
