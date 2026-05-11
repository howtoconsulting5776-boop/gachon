"use client";

import * as React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { MOCK_LABS } from "@/lib/mock-data";

const MESSAGE_MAX = 500;

function formatKrMobileInput(raw: string): string {
  const digits = raw.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 3) return digits;
  if (digits.length <= 7) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
  return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`;
}

const schema = z.object({
  name: z
    .string()
    .min(2, "이름은 2자 이상 입력해 주세요.")
    .max(20, "이름은 20자 이내로 입력해 주세요."),
  phone: z
    .string()
    .regex(/^010-\d{4}-\d{4}$/, "휴대폰 번호는 010-0000-0000 형식이어야 합니다."),
  email: z.string().email("이메일 형식을 확인해 주세요."),
  interestLab: z.string().optional(),
  message: z.string().max(MESSAGE_MAX, `문의 내용은 ${MESSAGE_MAX}자 이내입니다.`).optional(),
  privacyConsent: z.boolean().refine((v) => v === true, {
    message: "개인정보 수집·이용에 동의해 주세요.",
  }),
  marketingConsent: z.boolean().optional(),
});

type FormValues = z.infer<typeof schema>;

export function InquiryForm() {
  const [done, setDone] = React.useState(false);
  const successRef = React.useRef<HTMLDivElement>(null);

  const {
    register,
    control,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      phone: "",
      privacyConsent: false,
      marketingConsent: false,
      interestLab: "",
      message: "",
    },
  });

  const privacy = watch("privacyConsent");
  const marketing = watch("marketingConsent");
  const messageVal = watch("message") ?? "";

  const [submitError, setSubmitError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (done && successRef.current) {
      successRef.current.focus();
    }
  }, [done]);

  const onSubmit = handleSubmit(async (data) => {
    setSubmitError(null);
    const res = await fetch("/api/v1/inquiries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: data.name.trim(),
        phone: data.phone,
        email: data.email.trim(),
        interestLab: data.interestLab || undefined,
        message: data.message?.trim() || undefined,
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
      name: "",
      phone: "",
      email: "",
      privacyConsent: false,
      marketingConsent: false,
      interestLab: "",
      message: "",
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
          aria-live="polite"
          className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-900 break-keep"
        >
          {submitError}
        </p>
      )}
      {done && (
        <div
          ref={successRef}
          tabIndex={-1}
          role="status"
          aria-live="polite"
          className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900 break-keep outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
        >
          신청이 완료되었습니다. 운영팀이 24시간 내 연락드립니다.
        </div>
      )}
      <div className="space-y-2">
        <Label htmlFor="inquiry-name">이름 *</Label>
        <Input
          id="inquiry-name"
          autoComplete="name"
          maxLength={20}
          aria-required
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
        <Controller
          name="phone"
          control={control}
          render={({ field }) => (
            <Input
              id="inquiry-phone"
              type="tel"
              inputMode="numeric"
              autoComplete="tel"
              placeholder="010-0000-0000"
              aria-required
              aria-invalid={!!errors.phone}
              aria-describedby={errors.phone ? "err-phone" : undefined}
              value={field.value}
              onChange={(e) => field.onChange(formatKrMobileInput(e.target.value))}
              onBlur={field.onBlur}
              name={field.name}
              ref={field.ref}
            />
          )}
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
          aria-required
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
          <option value="">아직 결정하지 못함</option>
          {MOCK_LABS.map((l) => (
            <option key={l.slug} value={l.slug}>
              {l.name}
            </option>
          ))}
        </select>
      </div>
      <div className="space-y-2">
        <div className="flex items-baseline justify-between gap-2">
          <Label htmlFor="inquiry-msg">문의 내용 (선택)</Label>
          <span className="text-xs text-gray-500 tabular-nums" aria-live="polite">
            {messageVal.length}/{MESSAGE_MAX}
          </span>
        </div>
        <Textarea
          id="inquiry-msg"
          rows={4}
          maxLength={MESSAGE_MAX}
          className="resize-y break-keep"
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "err-msg" : undefined}
          {...register("message")}
        />
        {errors.message && (
          <p id="err-msg" className="text-sm text-destructive break-keep">
            {errors.message.message}
          </p>
        )}
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
            <span className="text-destructive">*</span> (필수) 개인정보 수집·이용에 동의합니다.
            수집 항목은 이름, 연락처, 이메일이며, 입학 상담 목적으로 3년간 보관됩니다.
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
        {isSubmitting ? "전송 중…" : "상담 신청하기"}
      </Button>
    </form>
  );
}
