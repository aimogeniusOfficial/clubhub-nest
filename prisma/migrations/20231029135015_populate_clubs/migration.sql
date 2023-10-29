-- AlterTable
ALTER TABLE "Club" ADD COLUMN     "instagram" TEXT DEFAULT '',
ADD COLUMN     "logo_url" TEXT DEFAULT '',
ADD COLUMN     "members" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "tiktok" TEXT DEFAULT '';
