-- DropForeignKey
ALTER TABLE "Words" DROP CONSTRAINT "Words_autherId_fkey";

-- AlterTable
ALTER TABLE "Users" ALTER COLUMN "joiningDate" SET DEFAULT now();

-- AddForeignKey
ALTER TABLE "Words" ADD CONSTRAINT "Words_autherId_fkey" FOREIGN KEY ("autherId") REFERENCES "Users"("userId") ON DELETE SET NULL ON UPDATE CASCADE;
