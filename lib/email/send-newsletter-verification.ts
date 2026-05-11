import { Resend } from "resend";
import { getPublicSiteRoot } from "@/lib/site-url";

export function isResendConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY?.trim());
}

function siteBaseUrl(): string {
  return getPublicSiteRoot();
}

export async function sendNewsletterVerificationEmail(
  to: string,
  verifyToken: string
): Promise<{ ok: true } | { ok: false; message: string }> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    return { ok: false, message: "RESEND_API_KEY가 설정되지 않았습니다." };
  }

  const from =
    process.env.RESEND_FROM_EMAIL?.trim() ??
    "가천대 에듀컨설팅 <onboarding@resend.dev>";

  const verifyUrl = `${siteBaseUrl()}/newsletter/verify?token=${encodeURIComponent(verifyToken)}`;

  const resend = new Resend(apiKey);
  const { data, error } = await resend.emails.send({
    from,
    to: [to],
    subject: "[가천대 에듀컨설팅] 뉴스레터 구독을 확인해 주세요",
    html: `
      <p>안녕하세요.</p>
      <p>아래 버튼을 눌러 이메일 구독 인증을 완료해 주세요.</p>
      <p><a href="${verifyUrl}" style="display:inline-block;margin:16px 0;padding:12px 20px;background:#002C62;color:#fff;text-decoration:none;border-radius:8px;">구독 인증하기</a></p>
      <p style="font-size:12px;color:#666;">버튼이 동작하지 않으면 이 링크를 복사해 브라우저에 붙여 넣으세요:<br/>${verifyUrl}</p>
    `,
  });

  if (error) {
    return { ok: false, message: error.message };
  }
  if (!data?.id) {
    return { ok: false, message: "메일 발송 응답이 비어 있습니다." };
  }
  return { ok: true };
}
