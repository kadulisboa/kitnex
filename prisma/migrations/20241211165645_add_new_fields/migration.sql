/*
  Warnings:

  - A unique constraint covering the columns `[userId,code]` on the table `Charge` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,code]` on the table `Property` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,code]` on the table `Rental` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `code` to the `Charge` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Charge` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Charge` table without a default value. This is not possible if the table is not empty.
  - Added the required column `code` to the `Property` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Property` table without a default value. This is not possible if the table is not empty.
  - Added the required column `code` to the `Rental` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Charge" ADD COLUMN     "code" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Property" ADD COLUMN     "code" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Rental" ADD COLUMN     "code" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "UserSequence" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "propertySeq" INTEGER NOT NULL DEFAULT 0,
    "rentalSeq" INTEGER NOT NULL DEFAULT 0,
    "chargeSeq" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserSequence_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserSequence_userId_key" ON "UserSequence"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Charge_userId_code_key" ON "Charge"("userId", "code");

-- CreateIndex
CREATE UNIQUE INDEX "Property_userId_code_key" ON "Property"("userId", "code");

-- CreateIndex
CREATE UNIQUE INDEX "Rental_userId_code_key" ON "Rental"("userId", "code");

-- AddForeignKey
ALTER TABLE "UserSequence" ADD CONSTRAINT "UserSequence_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
