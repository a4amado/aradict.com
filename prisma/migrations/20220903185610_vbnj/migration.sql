-- AlterTable
ALTER TABLE "User" ADD COLUMN     "locale" TEXT,
ALTER COLUMN "joiningDate" SET DEFAULT now();
