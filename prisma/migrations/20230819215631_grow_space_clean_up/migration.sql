/*
  Warnings:

  - The values [Indoor,Outdoor] on the enum `GrowSpaceEnvironment` will be removed. If these variants are still used in the database, this will fail.
  - The values [Tent,GrowRoom,Other] on the enum `GrowSpaceType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `measurementUnit` on the `GrowSpace` table. All the +data in the column will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "GrowSpaceEnvironment_new" AS ENUM ('INDOOR', 'OUTDOOR');
ALTER TABLE "GrowSpace" ALTER COLUMN "environment" TYPE "GrowSpaceEnvironment_new" USING ("environment"::text::"GrowSpaceEnvironment_new");
ALTER TYPE "GrowSpaceEnvironment" RENAME TO "GrowSpaceEnvironment_old";
ALTER TYPE "GrowSpaceEnvironment_new" RENAME TO "GrowSpaceEnvironment";
DROP TYPE "GrowSpaceEnvironment_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "GrowSpaceType_new" AS ENUM ('TENT', 'GROW_ROOM', 'OTHER');
ALTER TABLE "GrowSpace" ALTER COLUMN "spaceType" TYPE "GrowSpaceType_new" USING ("spaceType"::text::"GrowSpaceType_new");
ALTER TYPE "GrowSpaceType" RENAME TO "GrowSpaceType_old";
ALTER TYPE "GrowSpaceType_new" RENAME TO "GrowSpaceType";
DROP TYPE "GrowSpaceType_old";
COMMIT;

-- AlterTable
ALTER TABLE "GrowSpace" DROP COLUMN "measurementUnit",
ADD COLUMN     "otherSpaceType" TEXT;

-- DropEnum
DROP TYPE "GrowSpaceMeasurementUnit";
