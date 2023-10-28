-- AlterTable
ALTER TABLE "GrowCycle" ADD COLUMN     "growerCultivarId" UUID,
ALTER COLUMN "startDate" DROP NOT NULL,
ALTER COLUMN "endDate" DROP NOT NULL,
ALTER COLUMN "cultivarId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "GrowCycle" ADD CONSTRAINT "GrowCycle_growerCultivarId_fkey" FOREIGN KEY ("growerCultivarId") REFERENCES "GrowerCultivar"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
