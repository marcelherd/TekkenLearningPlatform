/*
  Warnings:

  - Made the column `stage` on table `Match` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Match" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "playerCharacter" TEXT NOT NULL,
    "opponent" TEXT NOT NULL,
    "opponentCharacter" TEXT NOT NULL,
    "stage" TEXT NOT NULL,
    "playerRoundWins" INTEGER NOT NULL,
    "opponentRoundWins" INTEGER NOT NULL,
    "roundWinsRequired" INTEGER NOT NULL,
    "recordingUrl" TEXT
);
INSERT INTO "new_Match" ("id", "opponent", "opponentCharacter", "opponentRoundWins", "playerCharacter", "playerRoundWins", "recordingUrl", "roundWinsRequired", "stage") SELECT "id", "opponent", "opponentCharacter", "opponentRoundWins", "playerCharacter", "playerRoundWins", "recordingUrl", "roundWinsRequired", "stage" FROM "Match";
DROP TABLE "Match";
ALTER TABLE "new_Match" RENAME TO "Match";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
