-- CreateEnum
CREATE TYPE "SeedType" AS ENUM ('REGULAR', 'FEMINIZED');

-- CreateEnum
CREATE TYPE "GrowthType" AS ENUM ('PHOTOPERIOD', 'AUTOFLOWER');

-- CreateTable
CREATE TABLE "GrowerCultivar" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "growerId" UUID NOT NULL,
    "linkedCultivarId" BIGINT NOT NULL,
    "seedType" "SeedType" NOT NULL,
    "growthType" "GrowthType" NOT NULL,

    CONSTRAINT "GrowerCultivar_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "GrowerCultivar" ADD CONSTRAINT "GrowerCultivar_growerId_fkey" FOREIGN KEY ("growerId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "GrowerCultivar" ADD CONSTRAINT "GrowerCultivar_linkedCultivarId_fkey" FOREIGN KEY ("linkedCultivarId") REFERENCES "Cultivar"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
