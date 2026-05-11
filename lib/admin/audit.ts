import { prisma } from "@/lib/prisma";
import { isDatabaseConfigured } from "@/lib/data/posts";

export async function writeAdminAudit(
  actorEmail: string,
  action: string,
  resource: string,
  diff?: unknown
): Promise<void> {
  if (!isDatabaseConfigured()) return;
  await prisma.adminAuditLog.create({
    data: {
      actorId: actorEmail,
      action,
      resource,
      diff: diff === undefined ? undefined : (diff as object),
    },
  });
}
