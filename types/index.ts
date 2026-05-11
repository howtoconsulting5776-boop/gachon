/** 공통 도메인 타입 (PRD 기반, FE 단계에서 확장) */

export interface Faculty {
  id: string;
  name: string;
  position?: string;
  photoUrl?: string;
  researchArea?: string;
  email?: string;
  bio?: string;
  displayOrder: number;
  isActive: boolean;
}

export interface Lab {
  id: string;
  slug: string;
  name: string;
  shortDesc?: string;
  description?: string;
  heroImageUrl?: string;
  leadFacultyId?: string;
  displayOrder: number;
  isPublished: boolean;
}

export type PostCategory =
  | "notice"
  | "community"
  | "qna"
  | "network"
  | "gallery"
  | "lab";

export interface Post {
  id: string;
  category: PostCategory;
  title: string;
  slug?: string;
  excerpt?: string;
  createdAt: string;
  isPinned?: boolean;
}

export interface Inquiry {
  id?: string;
  name: string;
  phone: string;
  email: string;
  interestLab?: string;
  message?: string;
  privacyConsent: boolean;
  marketingConsent?: boolean;
}

export interface EventItem {
  id: string;
  title: string;
  type: "online" | "offline" | "hybrid";
  startAt: string;
  endAt?: string;
  status: "upcoming" | "ongoing" | "completed" | "cancelled";
}
