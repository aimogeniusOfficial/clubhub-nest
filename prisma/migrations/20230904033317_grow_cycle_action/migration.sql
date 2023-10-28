-- CreateEnum
CREATE TYPE "ActionMeasureType" AS ENUM ('WATER', 'TRIM', 'FEED', 'HARVEST', 'TRAINING', 'OTHER', 'VPD', 'TEMPERATURE', 'LIGHT_INTENSITY', 'HUMIDITY');

-- CreateTable
CREATE TABLE "GrowAction" (
    "id" UUID NOT NULL,
    "type" "ActionMeasureType",
    "isMeasurement" BOOLEAN DEFAULT false,
    "note" TEXT,
    "value" TEXT,
    "actionDate" DATE,
    "createdAt" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "userId" UUID NOT NULL,
    "growCycleId" UUID,

    CONSTRAINT "GrowAction_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "GrowAction" ADD CONSTRAINT "GrowAction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "GrowAction" ADD CONSTRAINT "GrowAction_growCycleId_fkey" FOREIGN KEY ("growCycleId") REFERENCES "GrowCycle"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
