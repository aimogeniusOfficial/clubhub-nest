/*
  Warnings:

  - The values [CANCLED] on the enum `GrowCycleStatus` will be removed. If these variants are still used in the database, this will fail.
  - Changed the type of `announcementType` on the `Announcement` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is +data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "AnnouncementType" AS ENUM ('Maintenance', 'Outage', 'Update', 'NewFeature', 'BugFix');

-- AlterEnum
BEGIN;
CREATE TYPE "GrowCycleStatus_new" AS ENUM ('DRAFT', 'PREPARING', 'ACTIVE', 'COMPLETED', 'CANCELED', 'ARCHIVED');
ALTER TABLE "GrowCycle" ALTER COLUMN "status" TYPE "GrowCycleStatus_new" USING ("status"::text::"GrowCycleStatus_new");
ALTER TYPE "GrowCycleStatus" RENAME TO "GrowCycleStatus_old";
ALTER TYPE "GrowCycleStatus_new" RENAME TO "GrowCycleStatus";
DROP TYPE "GrowCycleStatus_old";
COMMIT;

-- AlterTable
ALTER TABLE "Announcement" DROP COLUMN "announcementType",
ADD COLUMN     "announcementType" "AnnouncementType" NOT NULL;

-- DropEnum
DROP TYPE "AnnouncmentType";
