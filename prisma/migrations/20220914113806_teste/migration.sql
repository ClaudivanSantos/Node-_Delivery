/*
  Warnings:

  - Added the required column `teste` to the `Deliveryman` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Deliveryman" ADD COLUMN     "teste" TEXT NOT NULL;
