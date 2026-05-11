"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const formSchema = z.object({
  name: z.string().min(2, "이름을 입력해 주세요.").max(80),
  email: z.string().email("이메일 형식을 확인해 주세요."),
  phone: z.string().max(40).optional(),
  privacyConsent: z.boolean().refine((v) => v === true, {
    message: "개인정보 수집·이용에 동의해 주세요.",
  }),
});

type FormValues = z.infer<typeof formSchema>;

interface EventRegisterButtonProps {
  eventId: string;
  eventTitle: string;
  capacity?: number;
  registeredCount: number;
  canRegister: boolean;
}

export function EventRegisterButton({
  eventId,
  eventTitle,
  capacity,
  registeredCount,
  canRegister,
}: EventRegisterButtonProps) {
  const [open, setOpen] = React.useState(false);
  const [done, setDone] = React.useState(false);
  const [serverError, setServerError] = React.useState<string | null>(null);

  const full = capacity != null && registeredCount >= capacity;

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      privacyConsent: false,
      phone: "",
    },
  });

  const privacy = watch("privacyConsent");

  const onSubmit = handleSubmit(async (values) => {
    setServerError(null);
    const res = await fetch(`/api/v1/events/${eventId}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: values.name,
        email: values.email,
        phone: values.phone?.trim() || null,
        privacyConsent: true as const,
      }),
    });
    const json = (await res.json()) as {
      success: boolean;
      error?: { message?: string; code?: string };
    };
    if (!res.ok || !json.success) {
      setServerError(json.error?.message ?? "등록에 실패했습니다.");
      return;
    }
    setDone(true);
    reset({ privacyConsent: false, phone: "", name: "", email: "" });
  });

  if (!canRegister) {
    return (
      <p className="mt-4 text-sm text-gray-500 break-keep">
        사전 등록은 데이터베이스 연결 후 활성화됩니다. 입학 상담 페이지에서 문의해 주세요.
      </p>
    );
  }

  if (full) {
    return (
      <p className="mt-4 text-sm text-amber-800 break-keep">
        본 일정은 정원이 마감되었습니다.
      </p>
    );
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        setOpen(v);
        if (!v) {
          setDone(false);
          setServerError(null);
        }
      }}
    >
      <DialogTrigger asChild>
        <Button className="mt-4" type="button">
          사전 등록
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="break-keep">설명회 사전 등록</DialogTitle>
          <DialogDescription className="break-keep text-left">
            {eventTitle}
            {capacity != null ? (
              <span className="mt-1 block text-xs text-gray-500">
                잔여 {Math.max(0, capacity - registeredCount)}명 / 정원 {capacity}명
              </span>
            ) : null}
          </DialogDescription>
        </DialogHeader>
        {done ? (
          <p className="text-sm text-gachon-800 break-keep">
            등록이 완료되었습니다. 일정 안내는 입력하신 이메일로 발송될 수 있습니다.
          </p>
        ) : (
          <form className="space-y-4" onSubmit={onSubmit}>
            <div>
              <Label htmlFor={`er-name-${eventId}`}>이름</Label>
              <Input id={`er-name-${eventId}`} className="mt-1" {...register("name")} />
              {errors.name && (
                <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor={`er-email-${eventId}`}>이메일</Label>
              <Input
                id={`er-email-${eventId}`}
                type="email"
                className="mt-1"
                autoComplete="email"
                {...register("email")}
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor={`er-phone-${eventId}`}>연락처 (선택)</Label>
              <Input id={`er-phone-${eventId}`} className="mt-1" {...register("phone")} />
            </div>
            <div className="flex items-start gap-2">
              <Checkbox
                id={`er-privacy-${eventId}`}
                checked={privacy}
                onCheckedChange={(c) => setValue("privacyConsent", c === true)}
              />
              <Label htmlFor={`er-privacy-${eventId}`} className="text-sm font-normal leading-snug break-keep">
                개인정보 수집·이용에 동의합니다. (필수)
              </Label>
            </div>
            {errors.privacyConsent && (
              <p className="text-xs text-red-600">{errors.privacyConsent.message}</p>
            )}
            {serverError && <p className="text-sm text-red-600 break-keep">{serverError}</p>}
            <DialogFooter className="gap-2 sm:gap-0">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "전송 중…" : "등록하기"}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
