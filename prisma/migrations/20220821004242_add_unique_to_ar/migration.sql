/*
  Warnings:

  - A unique constraint covering the columns `[ar]` on the table `Words` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Users" ALTER COLUMN "joiningDate" SET DEFAULT now();

-- CreateIndex
CREATE UNIQUE INDEX "Words_ar_key" ON "Words"("ar");
