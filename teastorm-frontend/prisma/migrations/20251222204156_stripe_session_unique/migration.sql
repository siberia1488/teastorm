-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "stripeEventId" TEXT NOT NULL,
    "stripeSessionId" TEXT NOT NULL,
    "amountTotal" INTEGER NOT NULL,
    "currency" TEXT NOT NULL,
    "email" TEXT,
    "status" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "Order_stripeEventId_key" ON "Order"("stripeEventId");

-- CreateIndex
CREATE UNIQUE INDEX "Order_stripeSessionId_key" ON "Order"("stripeSessionId");
