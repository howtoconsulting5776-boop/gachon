"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { MOCK_LABS } from "@/lib/mock-data";

const schema = z.object({
  name: z.string().min(2, "이름을 입력해 주세요."),
  phone: z
    .string()
    .min(10, "연락처를 확인해 주세요.")
    .regex(/^[\d\s-]+$/, "숫자와 하이픈만 사용할 수 있습니다."),
  email: z.string().email("이메일 형식을 확인해 주세요."),
  interestLab: z.string().optional(),
  message: z.string().optional(),
  privacyConsent: z.boolean().refine((v) => v === true, {
    message: "개인정보 수집·이용에 동의해 주세요.",
  }),
  marketingConsent: z.boolean().optional(),
});

type FormValues = z.infer<typeof schema>;

export function InquiryForm() {
  const [done, setDone] = React.useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      privacyConsent: false,
      marketingConsent: false,
      interestLab: "",
    },
  });

  const privacy = watch("privacyConsent");
  const marketing = watch("marketingConsent");

  const [submitError, setSubmitError] = React.useState<string | null>(null);

  const onSubmit = handleSubmit(async (data) => {
    setSubmitError(null);
    const res = await fetch("/api/v1/inquiries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: data.name,
        phone: data.phone,
        email: data.email,
        interestLab: data.interestLab || undefined,
        message: data.message || undefined,
        privacyConsent: data.privacyConsent,
        marketingConsent: data.marketingConsent ?? false,
      }),
    });
    const json = (await res.json()) as {
      success: boolean;
      error?: { message?: string; code?: string };
    };
    if (!json.success) {
      setSubmitError(json.error?.message ?? "제출에 실패했습니다.");
      return;
    }
    setDone(true);
    reset({
      privacyConsent: false,
      marketingConsent: false,
      interestLab: "",
    });
  });

  return (
    <form
      onSubmit={onSubmit}
      className="mx-auto max-w-xl space-y-6"
      noValidate
    >
      {submitError && (
        <p
          role="alert"
          className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-900 break-keep"
        >
          {submitError}
        </p>
      )}
      {done && (
        <p
          role="status"
          className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900 break-keep"
        >
          제출되었습니다. 순차적으로 연락드리겠습니다. (이메일 알림은 Resend 등
          연동 후 활성화할 수 있습니다.)
        </p>
      )}
      <div className="space-y-2">
        <Label htmlFor="inquiry-name">이름 *</Label>
        <Input
          id="inquiry-name"
          autoComplete="name"
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "err-name" : undefined}
          {...register("name")}
        />
        {errors.name && (
          <p id="err-name" className="text-sm text-destructive break-keep">
            {errors.name.message}
          </p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="inquiry-phone">연락처 *</Label>
        <Input
          id="inquiry-phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="010-0000-0000"
          aria-invalid={!!errors.phone}
          aria-describedby={errors.phone ? "err-phone" : undefined}
          {...register("phone")}
        />
        {errors.phone && (
          <p id="err-phone" className="text-sm text-destructive break-keep">
            {errors.phone.message}
          </p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="inquiry-email">이메일 *</Label>
        <Input
          id="inquiry-email"
          type="email"
          autoComplete="email"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "err-email" : undefined}
          {...register("email")}
        />
        {errors.email && (
          <p id="err-email" className="text-sm text-destructive break-keep">
            {errors.email.message}
          </p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="inquiry-lab">관심 LAB (선택)</Label>
        <select
          id="inquiry-lab"
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          {...register("interestLab")}
        >
          <option value="">선택 안 함</option>
          {MOCK_LABS.map((l) => (
            <option key={l.slug} value={l.slug}>
              {l.name}
            </option>
          ))}
        </select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="inquiry-msg">문의 내용 (선택)</Label>
        <Textarea
          id="inquiry-msg"
          rows={4}
          className="resize-y break-keep"
          {...register("message")}
        />
      </div>
      <div className="flex items-start gap-3 rounded-lg border border-gray-200 p-4">
        <Checkbox
          id="privacy"
          checked={privacy}
          onCheckedChange={(c) =>
            setValue("privacyConsent", c === true, { shouldValidate: true })
          }
          aria-invalid={!!errors.privacyConsent}
        />
        <div>
          <Label
            htmlFor="privacy"
            className="cursor-pointer font-normal break-keep"
          >
            (필수) 개인정보 수집·이용에 동의합니다. 수집 항목은 이름, 연락처,
            이메일이며, 입학 상담 목적으로 3년간 보관됩니다.
          </Label>
          {errors.privacyConsent && (
            <p className="mt-2 text-sm text-destructive break-keep">
              {errors.privacyConsent.message}
            </p>
          )}
        </div>
      </div>
      <div className="flex items-start gap-3 rounded-lg border border-gray-100 bg-gray-50/80 p-4">
        <Checkbox
          id="marketing"
          checked={!!marketing}
          onCheckedChange={(c) =>
            setValue("marketingConsent", c === true, { shouldValidate: true })
          }
        />
        <Label
          htmlFor="marketing"
          className="cursor-pointer font-normal break-keep"
        >
          (선택) 설명회·모집 안내 등 마케팅 정보 수신에 동의합니다.
        </Label>
      </div>
      <Button
        type="submit"
        className="w-full md:w-auto"
        disabled={isSubmitting}
      >
        {isSubmitting ? "제출 중…" : "상담 신청하기"}
      </Button>
    </form>
  );
}
