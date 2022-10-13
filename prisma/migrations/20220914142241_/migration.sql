/*
  Warnings:

  - You are about to drop the column `usename` on the `clients` table. All the data in the column will be lost.
  - You are about to drop the column `usename` on the `deliveryman` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[username]` on the table `clients` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[username]` on the table `deliveryman` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `username` to the `clients` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `deliveryman` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "clients_usename_key";

-- DropIndex
DROP INDEX "deliveryman_usename_key";

-- AlterTable
ALTER TABLE "clients" DROP COLUMN "usename",
ADD COLUMN     "username" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "deliveryman" DROP COLUMN "usename",
ADD COLUMN     "username" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "clients_username_key" ON "clients"("username");

-- CreateIndex
CREATE UNIQUE INDEX "deliveryman_username_key" ON "deliveryman"("username");
