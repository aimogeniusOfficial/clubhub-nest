/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `FeatureFlag` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "FeatureFlag_name_key" ON "FeatureFlag"("name");
