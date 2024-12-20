/*
  Warnings:

  - A unique constraint covering the columns `[userId,document]` on the table `Renter` will be added. If there are existing duplicate values, this will fail.
  - Made the column `number` on table `Property` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `userId` to the `Renter` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Property" ALTER COLUMN "number" SET NOT NULL;

-- AlterTable
ALTER TABLE "Renter" ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Renter_userId_document_key" ON "Renter"("userId", "document");

-- AddForeignKey
ALTER TABLE "Renter" ADD CONSTRAINT "Renter_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
