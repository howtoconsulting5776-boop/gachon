import { z } from "zod";

export const postCategoryQuery = z.enum(["notice", "board", "qna"]);

const authorSchema = z.enum(["재학생", "동문"]);

export const postCreateBodySchema = z.object({
  category: z.literal("board"),
  title: z.string().min(2).max(120),
  excerpt: z.string().min(5).max(2000),
  author: authorSchema,
});

export const postUpdateBodySchema = z.object({
  title: z.string().min(2).max(120),
  excerpt: z.string().min(5).max(2000),
  author: authorSchema,
});
