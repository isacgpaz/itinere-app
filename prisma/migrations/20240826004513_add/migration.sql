/*
  Warnings:

  - Added the required column `driverId` to the `travels` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "travels" ADD COLUMN     "driverId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "travels" ADD CONSTRAINT "travels_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "drivers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
