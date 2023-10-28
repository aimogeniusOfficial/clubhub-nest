-- CreateTable
CREATE TABLE "JournalEntryLike" (
    "id" SERIAL NOT NULL,
    "journalEntryId" BIGINT,
    "userId" UUID NOT NULL,

    CONSTRAINT "JournalEntryLike_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "JournalEntryLike_journalEntryId_userId_key" ON "JournalEntryLike"("journalEntryId", "userId");

-- AddForeignKey
ALTER TABLE "JournalEntryLike" ADD CONSTRAINT "JournalEntryLike_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "JournalEntryLike" ADD CONSTRAINT "JournalEntryLike_journalEntryId_fkey" FOREIGN KEY ("journalEntryId") REFERENCES "JournalEntry"("id") ON DELETE SET NULL ON UPDATE CASCADE;
