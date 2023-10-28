/*
  Warnings:

  - The values [draft,active,completed,cancelled] on the enum `GrowCycleStatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the `SeedVault` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "SeedStatus" AS ENUM ('AVAILABLE', 'LOCKED', 'GERMINATED', 'FAILED');

-- AlterEnum
BEGIN;
CREATE TYPE "GrowCycleStatus_new" AS ENUM ('DRAFT', 'PREPARING', 'ACTIVE', 'COMPLETED', 'CANCLED', 'ARCHIVED');
ALTER TABLE "GrowCycle" ALTER COLUMN "status" TYPE "GrowCycleStatus_new" USING ("status"::text::"GrowCycleStatus_new");
ALTER TYPE "GrowCycleStatus" RENAME TO "GrowCycleStatus_old";
ALTER TYPE "GrowCycleStatus_new" RENAME TO "GrowCycleStatus";
DROP TYPE "GrowCycleStatus_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "SeedVault" DROP CONSTRAINT "SeedVault_cultivarId_fkey";

-- DropForeignKey
ALTER TABLE "SeedVault" DROP CONSTRAINT "SeedVault_userId_fkey";

-- DropTable
DROP TABLE "SeedVault";

-- CreateTable
CREATE TABLE "Vault" (
    "id" SERIAL NOT NULL,
    "userId" UUID NOT NULL,

    CONSTRAINT "Vault_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Seed" (
    "id" BIGSERIAL NOT NULL,
    "cultivarId" BIGINT NOT NULL,
    "vaultId" INTEGER NOT NULL,
    "count" INTEGER NOT NULL DEFAULT 0,
    "status" "SeedStatus" NOT NULL,

    CONSTRAINT "Seed_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GrowCyclePlant" (
    "id" BIGSERIAL NOT NULL,
    "growCycleId" UUID NOT NULL,
    "seedId" BIGINT NOT NULL,

    CONSTRAINT "GrowCyclePlant_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Vault_userId_key" ON "Vault"("userId");

-- AddForeignKey
ALTER TABLE "Vault" ADD CONSTRAINT "Vault_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Seed" ADD CONSTRAINT "Seed_cultivarId_fkey" FOREIGN KEY ("cultivarId") REFERENCES "Cultivar"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Seed" ADD CONSTRAINT "Seed_vaultId_fkey" FOREIGN KEY ("vaultId") REFERENCES "Vault"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "GrowCyclePlant" ADD CONSTRAINT "GrowCyclePlant_growCycleId_fkey" FOREIGN KEY ("growCycleId") REFERENCES "GrowCycle"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "GrowCyclePlant" ADD CONSTRAINT "GrowCyclePlant_seedId_fkey" FOREIGN KEY ("seedId") REFERENCES "Seed"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
