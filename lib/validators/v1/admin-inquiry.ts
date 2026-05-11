import { z } from "zod";

export const adminInquiryStatusSchema = z.enum(["new", "contacted", "closed"]);

export const adminInquiryUpdateBodySchema = z.object({
  status: adminInquiryStatusSchema,
  adminNotes: z.string().max(8000).optional().nullable(),
});
