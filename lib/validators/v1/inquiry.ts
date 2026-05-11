import { z } from "zod";

export const admissionInquiryBodySchema = z.object({
  name: z
    .string()
    .min(2, "이름을 입력해 주세요.")
    .max(20, "이름은 20자 이내로 입력해 주세요."),
  phone: z
    .string()
    .regex(/^010-\d{4}-\d{4}$/, "휴대폰 번호는 010-0000-0000 형식으로 입력해 주세요."),
  email: z.string().email("이메일 형식이 확인해 주세요."),
  interestLab: z
    .string()
    .max(120)
    .optional()
    .nullable()
    .transform((s) => (s == null || s === "" ? undefined : s)),
  message: z
    .string()
    .max(500, "문의 내용은 500자 이내로 입력해 주세요.")
    .optional()
    .nullable()
    .transform((s) => (s == null || s === "" ? undefined : s)),
  privacyConsent: z
    .boolean()
    .refine((v) => v === true, { message: "개인정보 수집·이용에 동의해 주세요." }),
  marketingConsent: z.boolean().optional(),
});

export type AdmissionInquiryBody = z.infer<typeof admissionInquiryBodySchema>;
