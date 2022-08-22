-- AlterTable
ALTER TABLE "Users" ALTER COLUMN "role" DROP DEFAULT,
ALTER COLUMN "joiningDate" SET DEFAULT now();
