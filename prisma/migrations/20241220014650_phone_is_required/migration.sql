/*
  Warnings:

  - Made the column `phone` on table `Renter` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Renter" ALTER COLUMN "phone" SET NOT NULL;
