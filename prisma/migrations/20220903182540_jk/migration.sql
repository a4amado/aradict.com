/*
  Warnings:

  - The primary key for the `Account` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Session` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Sounds` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Words` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_userId_fkey";

-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_userId_fkey";

-- DropForeignKey
ALTER TABLE "Sounds" DROP CONSTRAINT "Sounds_autherId_fkey";

-- DropForeignKey
ALTER TABLE "Sounds" DROP CONSTRAINT "Sounds_wordId_fkey";

-- DropForeignKey
ALTER TABLE "Words" DROP CONSTRAINT "Words_autherId_fkey";

-- AlterTable
ALTER TABLE "Account" DROP CONSTRAINT "Account_pkey",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Account_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Session" DROP CONSTRAINT "Session_pkey",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Session_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Sounds" DROP CONSTRAINT "Sounds_pkey",
ALTER COLUMN "soundId" SET DATA TYPE TEXT,
ALTER COLUMN "wordId" SET DATA TYPE TEXT,
ALTER COLUMN "autherId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Sounds_pkey" PRIMARY KEY ("soundId");

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "joiningDate" SET DEFAULT now(),
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Words" DROP CONSTRAINT "Words_pkey",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "autherId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Words_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Words" ADD CONSTRAINT "Words_autherId_fkey" FOREIGN KEY ("autherId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sounds" ADD CONSTRAINT "Sounds_autherId_fkey" FOREIGN KEY ("autherId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sounds" ADD CONSTRAINT "Sounds_wordId_fkey" FOREIGN KEY ("wordId") REFERENCES "Words"("id") ON DELETE SET NULL ON UPDATE CASCADE;
