-- CreateEnum
CREATE TYPE "Role" AS ENUM ('admin', 'soundContributer', 'soundReviewer');

-- CreateTable
CREATE TABLE "Users" (
    "userId" UUID NOT NULL,
    "username" VARCHAR(20) NOT NULL,
    "hash" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'soundContributer',
    "joiningDate" TIMESTAMP(3) NOT NULL DEFAULT now(),

    CONSTRAINT "Users_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "Words" (
    "wordId" UUID NOT NULL,
    "ar" TEXT NOT NULL,
    "en" TEXT NOT NULL,
    "autherId" UUID NOT NULL,

    CONSTRAINT "Words_pkey" PRIMARY KEY ("wordId")
);

-- CreateTable
CREATE TABLE "Sounds" (
    "soundId" UUID NOT NULL,
    "fileName" TEXT NOT NULL,
    "autherId" UUID NOT NULL,
    "wordId" UUID NOT NULL,

    CONSTRAINT "Sounds_pkey" PRIMARY KEY ("soundId")
);

-- AddForeignKey
ALTER TABLE "Words" ADD CONSTRAINT "Words_autherId_fkey" FOREIGN KEY ("autherId") REFERENCES "Users"("userId") ON DELETE SET DEFAULT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sounds" ADD CONSTRAINT "Sounds_autherId_fkey" FOREIGN KEY ("autherId") REFERENCES "Users"("userId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sounds" ADD CONSTRAINT "Sounds_wordId_fkey" FOREIGN KEY ("wordId") REFERENCES "Words"("wordId") ON DELETE SET NULL ON UPDATE CASCADE;
