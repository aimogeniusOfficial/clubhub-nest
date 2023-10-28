/*
  Warnings:

  - You are about to drop the column `growArea` on the `GrowSpace` table. All the +data in the column will be lost.
  - You are about to drop the column `humidity` on the `GrowSpace` table. All the +data in the column will be lost.
  - You are about to drop the column `light_intensity` on the `GrowSpace` table. All the +data in the column will be lost.
  - You are about to drop the column `size` on the `GrowSpace` table. All the +data in the column will be lost.
  - You are about to drop the column `temperature` on the `GrowSpace` table. All the +data in the column will be lost.
  - You are about to drop the column `vpd` on the `GrowSpace` table. All the +data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "GrowSpace" DROP COLUMN "growArea",
DROP COLUMN "humidity",
DROP COLUMN "light_intensity",
DROP COLUMN "size",
DROP COLUMN "temperature",
DROP COLUMN "vpd";
