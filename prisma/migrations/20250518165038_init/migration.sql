-- CreateTable
CREATE TABLE "CallsSession" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "callerId" TEXT NOT NULL,
    "receiverId" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,

    CONSTRAINT "CallsSession_pkey" PRIMARY KEY ("id")
);
