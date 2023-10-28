/*
  Warnings:

  - Changed the type of `paymentStatus` on the `UserSubscription` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "PaymentStatusType" AS ENUM ('FREE', 'PAID_MONTHLY', 'PAID_YEARLY', 'CANCELLED', 'OVERDUE');

-- AlterTable
ALTER TABLE "UserSubscription" DROP COLUMN "paymentStatus",
ADD COLUMN     "paymentStatus" "PaymentStatusType" NOT NULL;
