/*
  Warnings:

  - Added the required column `shippingAmount` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subtotalAmount` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "shippingAddress" JSONB,
ADD COLUMN     "shippingAmount" INTEGER NOT NULL,
ADD COLUMN     "shippingName" TEXT,
ADD COLUMN     "subtotalAmount" INTEGER NOT NULL;
