import { NextResponse as NR, type NextResponse } from "next/server";

export type ApiSuccess<T> = {
  success: true;
  data: T;
  error: null;
  meta: { page?: number; limit?: number; total?: number } | null;
};

export type ApiErrorBody = {
  success: false;
  data: null;
  error: {
    code: string;
    message: string;
    details?: Record<string, unknown>;
  };
  meta: null;
};

export function jsonOk<T>(
  data: T,
  init?: { status?: number; meta?: ApiSuccess<T>["meta"] }
): NextResponse<ApiSuccess<T>> {
  const body: ApiSuccess<T> = {
    success: true,
    data,
    error: null,
    meta: init?.meta ?? null,
  };
  return NR.json(body, { status: init?.status ?? 200 });
}

export function jsonErr(
  status: number,
  code: string,
  message: string,
  details?: Record<string, unknown>
): NextResponse<ApiErrorBody> {
  const body: ApiErrorBody = {
    success: false,
    data: null,
    error: { code, message, ...(details ? { details } : {}) },
    meta: null,
  };
  return NR.json(body, { status });
}
