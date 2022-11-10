/*
  Warnings:

  - You are about to drop the column `username` on the `User` table. All the data in the column will be lost.
  - Made the column `password` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "User_username_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "username",
ADD COLUMN     "first_name" TEXT,
ADD COLUMN     "last_name" TEXT,
ALTER COLUMN "password" SET NOT NULL;
