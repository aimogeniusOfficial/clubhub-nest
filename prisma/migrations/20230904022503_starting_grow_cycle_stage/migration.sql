-- CreateEnum
CREATE TYPE "GrowStage" AS ENUM ('SEED', 'SEEDLING', 'CLONE', 'VEGETATIVE', 'FLOWER', 'HARVEST');

-- AlterTable
ALTER TABLE "GrowCycle" ADD COLUMN     "startingGrowStage" "GrowStage";
