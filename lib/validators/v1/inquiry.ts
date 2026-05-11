import { z } from "zod";

export const admissionInquiryBodySchema = z.object({
  name: z.string().min(2, "이름을 입력해 주세요."),
  phone: z
    .string()
    .min(10, "연락처를 확인해 주세요.")
    .regex(/^[\d\s-]+$/, "숫자와 하이픈만 사용할 수 있습니다."),
  email: z.string().email("이메일 형식이 확인해 주세요."),
  interestLab: z
    .string()
    .max(120)
    .optional()
    .nullable()
    .transform((s) => (s == null || s === "" ? undefined : s)),
  message: z
    .string()
    .max(4000)
    .optional()
    .nullable()
    .transform((s) => (s == null || s === "" ? undefined : s)),
  privacyConsent: z
    .boolean()
    .refine((v) => v === true, { message: "개인정보 수집·이용에 동의해 주세요." }),
  marketingConsent: z.boolean().optional(),
});

export type AdmissionInquiryBody = z.infer<typeof admissionInquiryBodySchema>;
