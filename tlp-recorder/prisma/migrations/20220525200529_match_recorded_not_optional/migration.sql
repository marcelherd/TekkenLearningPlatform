-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Match" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "playerCharacter" TEXT NOT NULL,
    "playerRank" TEXT NOT NULL,
    "opponent" TEXT NOT NULL,
    "opponentCharacter" TEXT NOT NULL,
    "opponentRank" TEXT NOT NULL,
    "stage" TEXT NOT NULL,
    "playerRoundWins" INTEGER NOT NULL,
    "opponentRoundWins" INTEGER NOT NULL,
    "roundWinsRequired" INTEGER NOT NULL,
    "recorded" BOOLEAN NOT NULL DEFAULT false,
    "recordingUrl" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Match" ("createdAt", "id", "opponent", "opponentCharacter", "opponentRank", "opponentRoundWins", "playerCharacter", "playerRank", "playerRoundWins", "recorded", "recordingUrl", "roundWinsRequired", "stage", "updatedAt") SELECT "createdAt", "id", "opponent", "opponentCharacter", "opponentRank", "opponentRoundWins", "playerCharacter", "playerRank", "playerRoundWins", coalesce("recorded", false) AS "recorded", "recordingUrl", "roundWinsRequired", "stage", "updatedAt" FROM "Match";
DROP TABLE "Match";
ALTER TABLE "new_Match" RENAME TO "Match";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
