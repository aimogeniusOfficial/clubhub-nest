/*
  Warnings:

  - Added the required column `cultivarId` to the `GrowCycle` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "GrowCycle" ADD COLUMN     "cultivarId" BIGINT NOT NULL;

-- AddForeignKey
ALTER TABLE "GrowCycle" ADD CONSTRAINT "GrowCycle_cultivarId_fkey" FOREIGN KEY ("cultivarId") REFERENCES "Cultivar"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
