/*
  Warnings:

  - The values [pending,accepted,expired] on the enum `InvitationStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "InvitationStatus_new" AS ENUM ('PENDING', 'ACCEPTED', 'EXPIRED');
ALTER TABLE "UserInvitation" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "UserInvitation" ALTER COLUMN "status" TYPE "InvitationStatus_new" USING ("status"::text::"InvitationStatus_new");
ALTER TYPE "InvitationStatus" RENAME TO "InvitationStatus_old";
ALTER TYPE "InvitationStatus_new" RENAME TO "InvitationStatus";
DROP TYPE "InvitationStatus_old";
ALTER TABLE "UserInvitation" ALTER COLUMN "status" SET DEFAULT 'PENDING';
COMMIT;

-- AlterTable
ALTER TABLE "UserInvitation" ALTER COLUMN "status" SET DEFAULT 'PENDING';
