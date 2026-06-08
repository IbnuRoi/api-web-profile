/*
  Warnings:

  - Added the required column `date` to the `Projects` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Projects` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "KeyFeatures" DROP CONSTRAINT "KeyFeatures_projectId_fkey";

-- DropForeignKey
ALTER TABLE "TechStacks" DROP CONSTRAINT "TechStacks_projectId_fkey";

-- AlterTable
ALTER TABLE "Projects" ADD COLUMN     "date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "userId" VARCHAR NOT NULL,
    "username" VARCHAR(255) NOT NULL,
    "password" VARCHAR NOT NULL,
    "role" VARCHAR(50) NOT NULL DEFAULT 'admin',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_userId_key" ON "Users"("userId");

-- AddForeignKey
ALTER TABLE "Projects" ADD CONSTRAINT "Projects_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KeyFeatures" ADD CONSTRAINT "KeyFeatures_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Projects"("projectId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TechStacks" ADD CONSTRAINT "TechStacks_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Projects"("projectId") ON DELETE CASCADE ON UPDATE CASCADE;
