-- CreateEnum
CREATE TYPE "InvitationStatus" AS ENUM ('pending', 'accepted', 'expired');

-- CreateEnum
CREATE TYPE "AnnouncmentType" AS ENUM ('Maintenance', 'Outage', 'Update', 'NewFeature', 'BugFix');

-- CreateEnum
CREATE TYPE "Landrace" AS ENUM ('Afghan', 'Thai', 'Columbian', 'Mexican', 'Jamaican');

-- CreateEnum
CREATE TYPE "GrowCycleStatus" AS ENUM ('draft', 'active', 'completed', 'cancelled');

-- CreateEnum
CREATE TYPE "GrowSpaceEnvironment" AS ENUM ('Indoor', 'Outdoor');

-- CreateEnum
CREATE TYPE "GrowSpaceType" AS ENUM ('Tent', 'GrowRoom', 'Other');

-- CreateEnum
CREATE TYPE "GrowSpaceMeasurementUnit" AS ENUM ('Feet', 'Inches', 'Cm');

-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "birthdate" TIMESTAMP(3),
    "invitationsLeft" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AccessRole" (
    "id" BIGSERIAL NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL DEFAULT '',
    "rank" BIGINT NOT NULL DEFAULT 0,
    "description" TEXT DEFAULT '',

    CONSTRAINT "AccessRole_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserInvitation" (
    "id" BIGSERIAL NOT NULL,
    "inviterId" UUID NOT NULL,
    "inviteeEmail" TEXT NOT NULL,
    "status" "InvitationStatus" NOT NULL DEFAULT 'pending',
    "token" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "expirationDate" TIMESTAMP(6) NOT NULL DEFAULT (now() + '24:00:00'::interval),

    CONSTRAINT "UserInvitation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubscriptionPlan" (
    "id" BIGSERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "monthlyPrice" DOUBLE PRECISION NOT NULL,
    "yearlyPrice" DOUBLE PRECISION,
    "stripeMonthlyPriceId" TEXT,
    "stripeYearlyPriceId" TEXT,
    "productId" TEXT,
    "growSpaces" INTEGER NOT NULL,
    "activeGrowCycles" INTEGER NOT NULL,
    "plantsPerGrowCycle" INTEGER NOT NULL,

    CONSTRAINT "SubscriptionPlan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserSubscription" (
    "id" BIGSERIAL NOT NULL,
    "userId" UUID NOT NULL,
    "subscriptionPlanId" BIGINT NOT NULL,
    "activationDate" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiryDate" DATE NOT NULL,
    "paymentStatus" TEXT NOT NULL,
    "stripeSubscriptionId" TEXT,

    CONSTRAINT "UserSubscription_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserRole" (
    "id" BIGSERIAL NOT NULL,
    "createdAt" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "userId" UUID NOT NULL,
    "accessRoleId" BIGINT,

    CONSTRAINT "UserRole_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Versions" (
    "id" BIGSERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Versions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FeatureFlag" (
    "id" BIGSERIAL NOT NULL,
    "createdAt" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "isEnabled" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "FeatureFlag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Announcement" (
    "id" BIGSERIAL NOT NULL,
    "start" TIMESTAMPTZ(6),
    "finish" TIMESTAMPTZ(6),
    "createdAt" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "announcementType" "AnnouncmentType" NOT NULL,

    CONSTRAINT "maintenance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Breeder" (
    "id" BIGSERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "country" TEXT,
    "state" TEXT,
    "website" TEXT,
    "isVerified" BOOLEAN,

    CONSTRAINT "Breeder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Terpene" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Terpene_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Flavor" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Flavor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cultivar" (
    "id" BIGSERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "imageUrl" TEXT,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "landrace" "Landrace",
    "isUnknown" BOOLEAN NOT NULL DEFAULT false,
    "isAutoflower" BOOLEAN NOT NULL DEFAULT false,
    "breederId" BIGINT,

    CONSTRAINT "Cultivar_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GeneticLineage" (
    "id" BIGSERIAL NOT NULL,
    "cultivarId" BIGINT NOT NULL,
    "motherId" BIGINT,
    "fatherId" BIGINT,

    CONSTRAINT "GeneticLineage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SeedVault" (
    "id" BIGSERIAL NOT NULL,
    "userId" UUID NOT NULL,
    "cultivarId" BIGINT NOT NULL,
    "amount" INTEGER DEFAULT 0,
    "growRuns" INTEGER DEFAULT 0,
    "totalHarvests" INTEGER DEFAULT 0,
    "isOnWithList" BOOLEAN DEFAULT false,

    CONSTRAINT "my_seeds_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GrowCycle" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "status" "GrowCycleStatus" NOT NULL,
    "description" TEXT,
    "startDate" DATE NOT NULL,
    "endDate" DATE NOT NULL,
    "createdAt" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "userId" UUID NOT NULL,
    "growSpaceId" UUID,

    CONSTRAINT "GrowCycle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GrowSpace" (
    "id" UUID NOT NULL,
    "createdAt" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT,
    "location" TEXT,
    "temperature" DOUBLE PRECISION,
    "humidity" DOUBLE PRECISION,
    "light_intensity" REAL,
    "userId" UUID NOT NULL,
    "environment" "GrowSpaceEnvironment",
    "spaceType" "GrowSpaceType",
    "measurementUnit" "GrowSpaceMeasurementUnit",
    "length" DOUBLE PRECISION,
    "width" DOUBLE PRECISION,
    "height" DOUBLE PRECISION,
    "growArea" DOUBLE PRECISION,
    "vpd" DOUBLE PRECISION,
    "size" TEXT,

    CONSTRAINT "GrowSpace_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JournalEntry" (
    "id" BIGSERIAL NOT NULL,
    "createdAt" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "entryText" TEXT,
    "createdBy" UUID NOT NULL,
    "journalId" BIGINT,
    "growCycleId" UUID,

    CONSTRAINT "JournalEntry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Journal" (
    "id" BIGSERIAL NOT NULL,
    "createdAt" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "name" VARCHAR,
    "growCycleId" UUID,

    CONSTRAINT "Journal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JournalEntryAttachment" (
    "id" BIGSERIAL NOT NULL,
    "journalEntryId" BIGINT NOT NULL,
    "fileUrl" TEXT NOT NULL,

    CONSTRAINT "JournalEntryAttachment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CultivarToFlavor" (
    "A" BIGINT NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_CultivarToTerpene" (
    "A" BIGINT NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "UserInvitation_token_key" ON "UserInvitation"("token");

-- CreateIndex
CREATE UNIQUE INDEX "Versions_name_key" ON "Versions"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_CultivarToFlavor_AB_unique" ON "_CultivarToFlavor"("A", "B");

-- CreateIndex
CREATE INDEX "_CultivarToFlavor_B_index" ON "_CultivarToFlavor"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CultivarToTerpene_AB_unique" ON "_CultivarToTerpene"("A", "B");

-- CreateIndex
CREATE INDEX "_CultivarToTerpene_B_index" ON "_CultivarToTerpene"("B");

-- AddForeignKey
ALTER TABLE "UserInvitation" ADD CONSTRAINT "UserInvitation_inviterId_fkey" FOREIGN KEY ("inviterId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "UserSubscription" ADD CONSTRAINT "UserSubscription_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "UserSubscription" ADD CONSTRAINT "UserSubscription_subscriptionPlanId_fkey" FOREIGN KEY ("subscriptionPlanId") REFERENCES "SubscriptionPlan"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "UserRole" ADD CONSTRAINT "UserRole_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "UserRole" ADD CONSTRAINT "UserRole_accessRoleId_fkey" FOREIGN KEY ("accessRoleId") REFERENCES "AccessRole"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Cultivar" ADD CONSTRAINT "Cultivar_breederId_fkey" FOREIGN KEY ("breederId") REFERENCES "Breeder"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "GeneticLineage" ADD CONSTRAINT "GeneticLineage_cultivarId_fkey" FOREIGN KEY ("cultivarId") REFERENCES "Cultivar"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "GeneticLineage" ADD CONSTRAINT "GeneticLineage_motherId_fkey" FOREIGN KEY ("motherId") REFERENCES "Cultivar"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GeneticLineage" ADD CONSTRAINT "GeneticLineage_fatherId_fkey" FOREIGN KEY ("fatherId") REFERENCES "Cultivar"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SeedVault" ADD CONSTRAINT "SeedVault_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "SeedVault" ADD CONSTRAINT "SeedVault_cultivarId_fkey" FOREIGN KEY ("cultivarId") REFERENCES "Cultivar"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "GrowCycle" ADD CONSTRAINT "GrowCycle_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "GrowCycle" ADD CONSTRAINT "GrowCycle_growSpaceId_fkey" FOREIGN KEY ("growSpaceId") REFERENCES "GrowSpace"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "GrowSpace" ADD CONSTRAINT "GrowSpace_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "JournalEntry" ADD CONSTRAINT "JournalEntry_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "JournalEntry" ADD CONSTRAINT "JournalEntry_growCycleId_fkey" FOREIGN KEY ("growCycleId") REFERENCES "GrowCycle"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "JournalEntry" ADD CONSTRAINT "JournalEntry_journalId_fkey" FOREIGN KEY ("journalId") REFERENCES "Journal"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Journal" ADD CONSTRAINT "Journal_growCycleId_fkey" FOREIGN KEY ("growCycleId") REFERENCES "GrowCycle"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "JournalEntryAttachment" ADD CONSTRAINT "JournalEntryAttachment_journalEntryId_fkey" FOREIGN KEY ("journalEntryId") REFERENCES "JournalEntry"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "_CultivarToFlavor" ADD CONSTRAINT "_CultivarToFlavor_A_fkey" FOREIGN KEY ("A") REFERENCES "Cultivar"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CultivarToFlavor" ADD CONSTRAINT "_CultivarToFlavor_B_fkey" FOREIGN KEY ("B") REFERENCES "Flavor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CultivarToTerpene" ADD CONSTRAINT "_CultivarToTerpene_A_fkey" FOREIGN KEY ("A") REFERENCES "Cultivar"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CultivarToTerpene" ADD CONSTRAINT "_CultivarToTerpene_B_fkey" FOREIGN KEY ("B") REFERENCES "Terpene"("id") ON DELETE CASCADE ON UPDATE CASCADE;
