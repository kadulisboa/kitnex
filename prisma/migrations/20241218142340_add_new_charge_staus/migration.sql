/*
  Warnings:

  - Made the column `endDate` on table `Rental` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterEnum
ALTER TYPE "ChargeStatus" ADD VALUE 'CHARGED';

-- AlterTable
ALTER TABLE "Rental" ALTER COLUMN "endDate" SET NOT NULL;
