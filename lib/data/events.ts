import { Prisma, type Event as PrismaEvent } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { MOCK_EVENTS } from "@/lib/mock-data";
import { isDatabaseConfigured } from "@/lib/data/posts";

export interface EventListItemDto {
  id: string;
  title: string;
  type: "online" | "offline" | "hybrid";
  startAt: string;
  location?: string;
  capacity?: number;
  registeredCount: number;
}

function mockToDto(e: (typeof MOCK_EVENTS)[number]): EventListItemDto {
  return {
    id: e.id,
    title: e.title,
    type: e.type,
    startAt: e.startAt,
    location: e.location,
    capacity: e.capacity,
    registeredCount: 0,
  };
}

function prismaToDto(
  row: PrismaEvent,
  registeredCount: number
): EventListItemDto {
  return {
    id: row.id,
    title: row.title,
    type: row.type as EventListItemDto["type"],
    startAt: row.startAt.toISOString(),
    location: row.location ?? undefined,
    capacity: row.capacity ?? undefined,
    registeredCount,
  };
}

export async function listEvents(
  status?: "upcoming" | "past" | "all"
): Promise<EventListItemDto[]> {
  const now = Date.now();
  const filterStatus = status ?? "upcoming";

  if (!isDatabaseConfigured()) {
    let list = MOCK_EVENTS.map(mockToDto);
    if (filterStatus === "upcoming") {
      list = list.filter((e) => new Date(e.startAt).getTime() >= now);
    } else if (filterStatus === "past") {
      list = list.filter((e) => new Date(e.startAt).getTime() < now);
    }
    return list.sort((a, b) => new Date(a.startAt).getTime() - new Date(b.startAt).getTime());
  }

  const where =
    filterStatus === "all"
      ? {}
      : filterStatus === "upcoming"
        ? { startAt: { gte: new Date(now) } }
        : { startAt: { lt: new Date(now) } };

  const rows = await prisma.event.findMany({
    where,
    orderBy: { startAt: "asc" },
  });
  const counts = await Promise.all(
    rows.map((r) =>
      prisma.eventRegistration.count({ where: { eventId: r.id } })
    )
  );
  return rows.map((r, i) => prismaToDto(r, counts[i] ?? 0));
}

export async function getEventById(id: string): Promise<EventListItemDto | null> {
  if (!isDatabaseConfigured()) {
    const e = MOCK_EVENTS.find((x) => x.id === id);
    return e ? mockToDto(e) : null;
  }
  const row = await prisma.event.findUnique({ where: { id } });
  if (!row) return null;
  const registeredCount = await prisma.eventRegistration.count({
    where: { eventId: id },
  });
  return prismaToDto(row, registeredCount);
}

export async function createEventRegistration(
  eventId: string,
  data: { name: string; email: string; phone?: string | null }
): Promise<
  | { ok: true; id: string }
  | {
      ok: false;
      status: number;
      code: string;
      message: string;
    }
> {
  if (!isDatabaseConfigured()) {
    return {
      ok: false,
      status: 503,
      code: "DATABASE_NOT_CONFIGURED",
      message: "데이터베이스가 설정되지 않아 사전 등록을 받을 수 없습니다.",
    };
  }

  const event = await prisma.event.findUnique({ where: { id: eventId } });
  if (!event) {
    return {
      ok: false,
      status: 404,
      code: "EVENT_NOT_FOUND",
      message: "행사를 찾을 수 없습니다.",
    };
  }

  const count = await prisma.eventRegistration.count({ where: { eventId } });
  if (event.capacity != null && count >= event.capacity) {
    return {
      ok: false,
      status: 409,
      code: "EVENT_FULL",
      message: "정원이 마감되었습니다.",
    };
  }

  try {
    const row = await prisma.eventRegistration.create({
      data: {
        eventId,
        name: data.name.trim(),
        email: data.email.trim().toLowerCase(),
        phone: data.phone?.trim() || null,
      },
    });
    return { ok: true, id: row.id };
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2002") {
      return {
        ok: false,
        status: 409,
        code: "DUPLICATE_REGISTRATION",
        message: "해당 일정에 이미 등록된 이메일입니다.",
      };
    }
    throw e;
  }
}
