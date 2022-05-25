/*
  Warnings:

  - You are about to drop the column `outcome` on the `Match` table. All the data in the column will be lost.
  - Added the required column `opponentRoundWins` to the `Match` table without a default value. This is not possible if the table is not empty.
  - Added the required column `playerRoundWins` to the `Match` table without a default value. This is not possible if the table is not empty.
  - Added the required column `roundWinsRequired` to the `Match` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Match" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "playerCharacter" TEXT NOT NULL,
    "opponent" TEXT NOT NULL,
    "opponentCharacter" TEXT NOT NULL,
    "stage" TEXT,
    "playerRoundWins" INTEGER NOT NULL,
    "opponentRoundWins" INTEGER NOT NULL,
    "roundWinsRequired" INTEGER NOT NULL,
    "recordingUrl" TEXT
);
INSERT INTO "new_Match" ("id", "opponent", "opponentCharacter", "playerCharacter", "recordingUrl", "stage") SELECT "id", "opponent", "opponentCharacter", "playerCharacter", "recordingUrl", "stage" FROM "Match";
DROP TABLE "Match";
ALTER TABLE "new_Match" RENAME TO "Match";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
