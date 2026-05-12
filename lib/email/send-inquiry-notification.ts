import { Resend } from "resend";

/** 기본 수신자 — INQUIRY_NOTIFY_EMAIL 환경변수로 덮어쓸 수 있습니다. */
const DEFAULT_NOTIFY_TO = "bear5776@gachon.ac.kr";

export interface InquiryEmailPayload {
  inquiryId: string;
  name: string;
  phone: string;
  email: string;
  interestLab?: string | null;
  message?: string | null;
  marketingConsent: boolean;
  submittedAt: Date;
}

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (c) => {
    switch (c) {
      case "&":
        return "&amp;";
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case '"':
        return "&quot;";
      case "'":
        return "&#39;";
      default:
        return c;
    }
  });
}

/**
 * 입학 상담 신청 알림 메일을 운영자에게 발송합니다.
 *
 * - 실패해도 API 응답을 막지 않도록 호출 측에서 try/catch 권장
 * - RESEND_API_KEY 미설정 시 즉시 graceful skip
 * - `replyTo`에 신청자 이메일을 넣어, 관리자 회신이 바로 신청자에게 가도록 함
 */
export async function sendInquiryNotificationEmail(
  payload: InquiryEmailPayload
): Promise<{ ok: true } | { ok: false; message: string }> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    return { ok: false, message: "RESEND_API_KEY가 설정되지 않았습니다." };
  }

  const to = process.env.INQUIRY_NOTIFY_EMAIL?.trim() || DEFAULT_NOTIFY_TO;
  const from =
    process.env.RESEND_FROM_EMAIL?.trim() ||
    "가천대 에듀컨설팅 <onboarding@resend.dev>";

  const submittedKst = payload.submittedAt.toLocaleString("ko-KR", {
    timeZone: "Asia/Seoul",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  const lab = payload.interestLab?.trim() ? payload.interestLab : "(미선택)";
  const message = payload.message?.trim()
    ? payload.message
    : "(상세 문의 없음)";

  const subject = `[가천대 에듀컨설팅] 입학 상담 신청 · ${payload.name}`;

  const html = `
    <div style="font-family:Pretendard,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#1f2937;max-width:640px;margin:0 auto;padding:24px;">
      <h2 style="margin:0 0 4px 0;font-size:18px;color:#002C62;">입학 상담 신청이 접수되었습니다</h2>
      <p style="margin:0 0 16px 0;font-size:12px;color:#6b7280;">접수 일시: ${escapeHtml(submittedKst)} (KST) · 신청 ID: ${escapeHtml(payload.inquiryId)}</p>

      <table style="width:100%;border-collapse:collapse;font-size:14px;">
        <tbody>
          <tr>
            <th style="text-align:left;padding:10px 12px;background:#f3f4f6;width:120px;font-weight:600;border-bottom:1px solid #e5e7eb;">이름</th>
            <td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;">${escapeHtml(payload.name)}</td>
          </tr>
          <tr>
            <th style="text-align:left;padding:10px 12px;background:#f3f4f6;font-weight:600;border-bottom:1px solid #e5e7eb;">연락처</th>
            <td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;">
              <a href="tel:${escapeHtml(payload.phone)}" style="color:#002C62;text-decoration:none;">${escapeHtml(payload.phone)}</a>
            </td>
          </tr>
          <tr>
            <th style="text-align:left;padding:10px 12px;background:#f3f4f6;font-weight:600;border-bottom:1px solid #e5e7eb;">이메일</th>
            <td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;">
              <a href="mailto:${escapeHtml(payload.email)}" style="color:#002C62;text-decoration:none;">${escapeHtml(payload.email)}</a>
            </td>
          </tr>
          <tr>
            <th style="text-align:left;padding:10px 12px;background:#f3f4f6;font-weight:600;border-bottom:1px solid #e5e7eb;">관심 LAB</th>
            <td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;">${escapeHtml(lab)}</td>
          </tr>
          <tr>
            <th style="text-align:left;padding:10px 12px;background:#f3f4f6;font-weight:600;border-bottom:1px solid #e5e7eb;">마케팅 수신 동의</th>
            <td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;">${payload.marketingConsent ? "동의" : "거부"}</td>
          </tr>
        </tbody>
      </table>

      <h3 style="margin:24px 0 8px 0;font-size:14px;color:#002C62;">문의 내용</h3>
      <pre style="white-space:pre-wrap;background:#f9fafb;border:1px solid #e5e7eb;border-radius:8px;padding:12px;font-family:inherit;font-size:14px;line-height:1.6;margin:0;">${escapeHtml(message)}</pre>

      <p style="margin:24px 0 0 0;font-size:12px;color:#9ca3af;">
        본 메일은 가천대학교 경영대학원 에듀컨설팅 전공 사이트의 입학 상담 신청 폼에서 자동 발송되었습니다.
        회신 버튼을 누르면 신청자(${escapeHtml(payload.email)})에게 바로 전달됩니다.
      </p>
    </div>
  `;

  const text = [
    "입학 상담 신청이 접수되었습니다.",
    `접수 일시: ${submittedKst} (KST)`,
    `신청 ID: ${payload.inquiryId}`,
    "",
    `이름: ${payload.name}`,
    `연락처: ${payload.phone}`,
    `이메일: ${payload.email}`,
    `관심 LAB: ${lab}`,
    `마케팅 수신 동의: ${payload.marketingConsent ? "동의" : "거부"}`,
    "",
    "문의 내용:",
    message,
  ].join("\n");

  try {
    const resend = new Resend(apiKey);
    const { data, error } = await resend.emails.send({
      from,
      to: [to],
      replyTo: payload.email,
      subject,
      html,
      text,
    });

    if (error) {
      return { ok: false, message: error.message };
    }
    if (!data?.id) {
      return { ok: false, message: "메일 발송 응답이 비어 있습니다." };
    }
    return { ok: true };
  } catch (err) {
    const msg = err instanceof Error ? err.message : "알 수 없는 오류";
    return { ok: false, message: msg };
  }
}
