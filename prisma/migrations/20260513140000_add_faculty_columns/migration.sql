-- 교수 칼럼 (기존 DB에 `db push`로 이미 있을 수 있어 IF NOT EXISTS 사용)
CREATE TABLE IF NOT EXISTS "faculty_columns" (
    "id" TEXT NOT NULL,
    "faculty_id" VARCHAR(32) NOT NULL,
    "public_slug" VARCHAR(255) NOT NULL,
    "title" TEXT NOT NULL,
    "excerpt" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "published_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "faculty_columns_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX IF NOT EXISTS "faculty_columns_public_slug_key" ON "faculty_columns"("public_slug");

CREATE INDEX IF NOT EXISTS "faculty_columns_faculty_id_published_at_idx" ON "faculty_columns"("faculty_id", "published_at" DESC);
