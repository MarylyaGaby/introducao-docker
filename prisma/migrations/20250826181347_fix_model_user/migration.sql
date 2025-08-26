-- CreateEnum
CREATE TYPE "public"."BookCategory" AS ENUM ('ROMANCE', 'FANTASIA', 'SUSPENSE', 'TERROR', 'BIOGRAFIA', 'INFANTIL', 'RELIGIOSO');

-- CreateEnum
CREATE TYPE "public"."UserRole" AS ENUM ('ADMIN', 'COMUM');

-- CreateTable
CREATE TABLE "public"."Book" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "publicationDate" TEXT,
    "category" "public"."BookCategory",

    CONSTRAINT "Book_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT,
    "googleId" TEXT,
    "role" "public"."UserRole" NOT NULL DEFAULT 'COMUM',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Book_title_key" ON "public"."Book"("title");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_googleId_key" ON "public"."User"("googleId");
