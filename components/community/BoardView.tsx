"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import type { MockPost } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

const authorSchema = z.enum(["재학생", "동문"]);

const postFormSchema = z.object({
  title: z.string().min(2, "제목을 2자 이상 입력해 주세요.").max(120),
  excerpt: z.string().min(5, "내용을 5자 이상 입력해 주세요.").max(2000),
  author: authorSchema,
});

type PostFormValues = z.infer<typeof postFormSchema>;

function isBoardAuthor(v: string | undefined): v is PostFormValues["author"] {
  return v === "재학생" || v === "동문";
}

function sortByDateDesc(a: MockPost, b: MockPost) {
  return a.date < b.date ? 1 : a.date > b.date ? -1 : 0;
}

interface ApiListOk {
  success: true;
  data: MockPost[];
  error: null;
  meta: { page?: number; limit?: number; total?: number } | null;
}

interface ApiItemOk {
  success: true;
  data: MockPost;
  error: null;
  meta: null;
}

interface ApiErr {
  success: false;
  data: null;
  error: { code: string; message: string; details?: unknown };
  meta: null;
}

async function fetchBoardPosts(): Promise<MockPost[]> {
  const res = await fetch("/api/v1/posts?category=board&limit=100", { cache: "no-store" });
  const json = (await res.json()) as ApiListOk | ApiErr;
  if (!json.success) {
    throw new Error(json.error?.message ?? "목록을 불러오지 못했습니다.");
  }
  return json.data;
}

interface BoardViewProps {
  initialPosts: MockPost[];
}

export function BoardView({ initialPosts }: BoardViewProps) {
  const [posts, setPosts] = React.useState<MockPost[]>(() => [...initialPosts]);
  const [loadError, setLoadError] = React.useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [editingId, setEditingId] = React.useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<PostFormValues>({
    resolver: zodResolver(postFormSchema),
    defaultValues: { title: "", excerpt: "", author: "재학생" },
  });

  const refresh = React.useCallback(async () => {
    try {
      setLoadError(null);
      const next = await fetchBoardPosts();
      setPosts(next);
    } catch (e) {
      setLoadError(e instanceof Error ? e.message : "목록을 불러오지 못했습니다.");
    }
  }, []);

  React.useEffect(() => {
    void refresh();
  }, [refresh]);

  const sorted = React.useMemo(() => [...posts].sort(sortByDateDesc), [posts]);

  const openCreate = () => {
    setEditingId(null);
    reset({ title: "", excerpt: "", author: "재학생" });
    setDialogOpen(true);
  };

  const openEdit = (p: MockPost) => {
    setEditingId(p.id);
    reset({
      title: p.title,
      excerpt: p.content ?? p.excerpt,
      author: isBoardAuthor(p.author) ? p.author : "재학생",
    });
    setDialogOpen(true);
  };

  const onSubmit = async (values: PostFormValues) => {
    const body = values.excerpt;
    if (editingId) {
      const res = await fetch(`/api/v1/posts/${encodeURIComponent(editingId)}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: values.title,
          excerpt: body,
          author: values.author,
        }),
      });
      const json = (await res.json()) as ApiItemOk | ApiErr;
      if (!json.success) {
        if (res.status === 503) {
          window.alert(
            "데이터베이스가 연결되지 않아 저장할 수 없습니다. docker-compose로 PostgreSQL을 띄운 뒤 DATABASE_URL을 설정해 주세요."
          );
        } else {
          window.alert(json.error?.message ?? "저장에 실패했습니다.");
        }
        return;
      }
    } else {
      const res = await fetch("/api/v1/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          category: "board",
          title: values.title,
          excerpt: body,
          author: values.author,
        }),
      });
      const json = (await res.json()) as ApiItemOk | ApiErr;
      if (!json.success) {
        if (res.status === 503) {
          window.alert(
            "데이터베이스가 연결되지 않아 등록할 수 없습니다. 로컬에서는 docker-compose로 PostgreSQL을 띄운 뒤 .env의 DATABASE_URL을 설정해 주세요."
          );
        } else {
          window.alert(json.error?.message ?? "등록에 실패했습니다.");
        }
        return;
      }
    }
    setDialogOpen(false);
    setEditingId(null);
    reset({ title: "", excerpt: "", author: "재학생" });
    await refresh();
  };

  const remove = async (id: string) => {
    if (!window.confirm("이 글을 삭제할까요?")) return;
    const res = await fetch(`/api/v1/posts/${encodeURIComponent(id)}`, { method: "DELETE" });
    const json = (await res.json()) as ApiErr | { success: true; data: unknown };
    if (!json.success) {
      if (res.status === 503) {
        window.alert(
          "데이터베이스가 연결되지 않아 삭제할 수 없습니다. DATABASE_URL을 확인해 주세요."
        );
      } else {
        window.alert(json.error?.message ?? "삭제에 실패했습니다.");
      }
      return;
    }
    await refresh();
  };

  return (
    <div className="mx-auto max-w-5xl px-6 py-10 md:px-12 md:py-12">
      {loadError && (
        <p className="mb-4 rounded-lg border border-amber-200 bg-amber-50 px-4 py-2 text-sm text-amber-900 break-keep">
          {loadError}
        </p>
      )}
      <div className="flex justify-end">
        <Button type="button" onClick={openCreate} className="shrink-0 break-keep">
          글쓰기
        </Button>
      </div>

      <div className="mt-8 overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-sm">
        <table className="w-full min-w-[640px] border-collapse text-left text-sm">
          <caption className="sr-only">전공 게시판 글 목록</caption>
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50/90">
              <th scope="col" className="px-4 py-3 font-semibold text-gachon-900">
                번호
              </th>
              <th scope="col" className="px-4 py-3 font-semibold text-gachon-900">
                제목
              </th>
              <th scope="col" className="w-28 px-4 py-3 font-semibold text-gachon-900">
                작성자
              </th>
              <th scope="col" className="w-32 px-4 py-3 font-semibold text-gachon-900">
                등록일
              </th>
              <th scope="col" className="w-36 px-4 py-3 text-center font-semibold text-gachon-900">
                관리
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {sorted.map((p, idx) => (
              <tr key={p.id} className="hover:bg-gachon-50/40">
                <td className="px-4 py-3 text-gray-500">{sorted.length - idx}</td>
                <td className="px-4 py-3">
                  <span className="font-medium text-gachon-900 break-keep" title={p.title}>
                    {p.title}
                  </span>
                  <p className="mt-1 line-clamp-2 text-gray-600 break-keep">{p.excerpt}</p>
                </td>
                <td className="px-4 py-3 text-gray-700 break-keep">
                  {isBoardAuthor(p.author) ? p.author : p.author ?? "—"}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-gray-600">{p.date}</td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap justify-center gap-1">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="text-xs"
                      onClick={() => openEdit(p)}
                    >
                      수정
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="text-xs text-red-600 hover:bg-red-50 hover:text-red-700"
                      onClick={() => void remove(p.id)}
                    >
                      삭제
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {sorted.length === 0 && (
        <p className="mt-6 text-center text-sm text-gray-500 break-keep">
          등록된 글이 없습니다. 글쓰기로 첫 글을 남겨 보세요.
        </p>
      )}

      <Dialog
        open={dialogOpen}
        onOpenChange={(open) => {
          setDialogOpen(open);
          if (!open) setEditingId(null);
        }}
      >
        <DialogContent className="z-[100] max-h-[90vh] overflow-y-auto sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="break-keep">
              {editingId ? "글 수정" : "글쓰기"}
            </DialogTitle>
            <DialogDescription className="sr-only break-keep">
              제목·작성자 구분·내용을 입력한 뒤 등록하거나 저장합니다.
            </DialogDescription>
          </DialogHeader>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              void handleSubmit(onSubmit)(e);
            }}
            className="space-y-4"
          >
            <div className="space-y-2">
              <Label htmlFor="board-title" className="break-keep">
                제목
              </Label>
              <Input
                id="board-title"
                {...register("title")}
                className="break-keep"
                aria-invalid={!!errors.title}
              />
              {errors.title && (
                <p className="text-xs text-red-600 break-keep">{errors.title.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="board-author" className="break-keep">
                작성자 구분
              </Label>
              <select
                id="board-author"
                {...register("author")}
                className={cn(
                  "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm",
                  "ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                )}
              >
                <option value="재학생">재학생</option>
                <option value="동문">동문</option>
              </select>
              {errors.author && (
                <p className="text-xs text-red-600 break-keep">{errors.author.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="board-body" className="break-keep">
                내용
              </Label>
              <Textarea
                id="board-body"
                rows={8}
                {...register("excerpt")}
                className="resize-y break-keep"
                aria-invalid={!!errors.excerpt}
              />
              {errors.excerpt && (
                <p className="text-xs text-red-600 break-keep">{errors.excerpt.message}</p>
              )}
            </div>
            <DialogFooter className="gap-2 sm:gap-0">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setDialogOpen(false);
                  setEditingId(null);
                }}
              >
                취소
              </Button>
              <Button type="button" disabled={isSubmitting} onClick={() => void handleSubmit(onSubmit)()}>
                {editingId ? "저장" : "등록"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
