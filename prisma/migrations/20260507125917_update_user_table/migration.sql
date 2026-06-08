/*
  Warnings:

  - You are about to drop the column `userId` on the `Projects` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[username]` on the table `Users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `username` to the `Projects` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Projects" DROP CONSTRAINT "Projects_userId_fkey";

-- DropIndex
DROP INDEX "Users_userId_key";

-- AlterTable
ALTER TABLE "Projects" DROP COLUMN "userId",
ADD COLUMN     "username" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Users" DROP COLUMN "userId";

-- CreateIndex
CREATE UNIQUE INDEX "Users_username_key" ON "Users"("username");

-- AddForeignKey
ALTER TABLE "Projects" ADD CONSTRAINT "Projects_username_fkey" FOREIGN KEY ("username") REFERENCES "Users"("username") ON DELETE CASCADE ON UPDATE CASCADE;
