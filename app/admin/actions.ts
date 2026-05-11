"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { randomUUID } from "node:crypto";
import type { EventType } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { prisma } from "@/lib/prisma";
import { writeAdminAudit } from "@/lib/admin/audit";
import { isDatabaseConfigured } from "@/lib/data/posts";
import { makePostPublicSlug } from "@/lib/slug";

async function requireActorEmail(): Promise<string | null> {
  const s = await getServerSession(authOptions);
  const r = s?.user?.role;
  if (!s?.user?.email || (r !== "admin" && r !== "editor")) return null;
  return s.user.email;
}

export async function updateInquiryAction(formData: FormData) {
  const email = await requireActorEmail();
  if (!email || !isDatabaseConfigured()) redirect("/admin/login");

  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "");
  const adminNotes = String(formData.get("adminNotes") ?? "");
  if (!id || !["new", "contacted", "closed"].includes(status)) return;

  await prisma.admissionInquiry.update({
    where: { id },
    data: {
      status,
      adminNotes: adminNotes.trim() || null,
    },
  });
  await writeAdminAudit(email, "inquiry.update", id, { status });
  revalidatePath("/admin/inquiries");
}

export async function createNoticePostAction(formData: FormData) {
  const email = await requireActorEmail();
  if (!email || !isDatabaseConfigured()) redirect("/admin/login");

  const title = String(formData.get("title") ?? "").trim();
  const excerpt = String(formData.get("excerpt") ?? "").trim();
  const content = String(formData.get("content") ?? "").trim();
  const author = String(formData.get("author") ?? "").trim();
  if (!title || !excerpt) return;

  const id = `n-${randomUUID().slice(0, 10)}`;
  const excerptShort = excerpt.length > 200 ? `${excerpt.slice(0, 200)}…` : excerpt;
  const publicSlug = makePostPublicSlug(id, title);

  await prisma.post.create({
    data: {
      id,
      publicSlug,
      category: "notice",
      title,
      excerpt: excerptShort,
      content: content || null,
      author: author || null,
    },
  });
  await writeAdminAudit(email, "post.create", id, { category: "notice" });
  revalidatePath("/admin/posts");
  revalidatePath("/community/notice");
}

export async function updatePostAdminAction(formData: FormData) {
  const email = await requireActorEmail();
  if (!email || !isDatabaseConfigured()) redirect("/admin/login");

  const id = String(formData.get("id") ?? "");
  const title = String(formData.get("title") ?? "").trim();
  const excerpt = String(formData.get("excerpt") ?? "").trim();
  const content = String(formData.get("content") ?? "").trim();
  const author = String(formData.get("author") ?? "").trim();
  if (!id || !title || !excerpt) return;

  const excerptShort = excerpt.length > 200 ? `${excerpt.slice(0, 200)}…` : excerpt;
  await prisma.post.update({
    where: { id },
    data: {
      title,
      excerpt: excerptShort,
      content: content || null,
      author: author || null,
    },
  });
  await writeAdminAudit(email, "post.update", id, {});
  revalidatePath("/admin/posts");
  revalidatePath("/community/notice");
}

export async function deletePostAdminAction(formData: FormData) {
  const email = await requireActorEmail();
  if (!email || !isDatabaseConfigured()) redirect("/admin/login");
  const id = String(formData.get("id") ?? "");
  if (!id) return;
  await prisma.post.delete({ where: { id } });
  await writeAdminAudit(email, "post.delete", id, {});
  revalidatePath("/admin/posts");
  revalidatePath("/community/notice");
}

export async function createEventAdminAction(formData: FormData) {
  const email = await requireActorEmail();
  if (!email || !isDatabaseConfigured()) redirect("/admin/login");

  const id = String(formData.get("id") ?? "").trim();
  const title = String(formData.get("title") ?? "").trim();
  const type = String(formData.get("type") ?? "") as "online" | "offline" | "hybrid";
  const startAt = String(formData.get("startAt") ?? "");
  const location = String(formData.get("location") ?? "").trim();
  const capRaw = String(formData.get("capacity") ?? "").trim();
  if (!id || !title || !startAt) return;
  if (!["online", "offline", "hybrid"].includes(type)) return;

  const start = new Date(startAt);
  if (Number.isNaN(start.getTime())) return;

  const capacity = capRaw ? Number(capRaw) : null;
  await prisma.event.create({
    data: {
      id,
      title,
      type: type as EventType,
      startAt: start,
      location: location || null,
      capacity: capacity && Number.isFinite(capacity) ? capacity : null,
    },
  });
  await writeAdminAudit(email, "event.create", id, {});
  revalidatePath("/admin/events");
  revalidatePath("/admissions/events");
}
