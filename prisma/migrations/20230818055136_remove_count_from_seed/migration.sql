/*
  Warnings:

  - You are about to drop the column `count` on the `Seed` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[seedId]` on the table `GrowCyclePlant` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Seed" DROP COLUMN "count",
ADD COLUMN     "plantId" BIGINT;

-- CreateIndex
CREATE UNIQUE INDEX "GrowCyclePlant_seedId_key" ON "GrowCyclePlant"("seedId");
