-- AlterTable
ALTER TABLE "User" ALTER COLUMN "hash" DROP NOT NULL,
ALTER COLUMN "joiningDate" SET DEFAULT now();
