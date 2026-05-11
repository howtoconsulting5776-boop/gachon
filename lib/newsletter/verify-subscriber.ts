import { prisma } from "@/lib/prisma";
import { isDatabaseConfigured } from "@/lib/data/posts";

export type VerifyNewsletterResult =
  | { ok: true; email: string }
  | { ok: false; code: "NO_DB" | "MISSING" | "NOT_FOUND" };

export async function verifyNewsletterSubscriberByToken(
  token: string | null | undefined
): Promise<VerifyNewsletterResult> {
  if (!isDatabaseConfigured()) {
    return { ok: false, code: "NO_DB" };
  }
  const t = token?.trim();
  if (!t) {
    return { ok: false, code: "MISSING" };
  }

  const row = await prisma.newsletterSubscriber.findFirst({
    where: { verifyToken: t },
  });
  if (!row) {
    return { ok: false, code: "NOT_FOUND" };
  }

  await prisma.newsletterSubscriber.update({
    where: { id: row.id },
    data: {
      verified: true,
      verifiedAt: new Date(),
      verifyToken: null,
    },
  });

  return { ok: true, email: row.email };
}
