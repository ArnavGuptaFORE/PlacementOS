/*
  Warnings:

  - Added the required column `userId` to the `CaseSession` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `ChatMessage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `CompanyIntelSession` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `GuesstimateSession` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `ResumeAnalysis` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_CaseSession" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userId" TEXT NOT NULL,
    "inputText" TEXT NOT NULL,
    "sessionType" TEXT NOT NULL,
    "result" TEXT NOT NULL
);
INSERT INTO "new_CaseSession" ("createdAt", "id", "inputText", "result", "sessionType", "updatedAt") SELECT "createdAt", "id", "inputText", "result", "sessionType", "updatedAt" FROM "CaseSession";
DROP TABLE "CaseSession";
ALTER TABLE "new_CaseSession" RENAME TO "CaseSession";
CREATE INDEX "CaseSession_userId_idx" ON "CaseSession"("userId");
CREATE TABLE "new_ChatMessage" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL
);
INSERT INTO "new_ChatMessage" ("content", "createdAt", "id", "role", "sessionId") SELECT "content", "createdAt", "id", "role", "sessionId" FROM "ChatMessage";
DROP TABLE "ChatMessage";
ALTER TABLE "new_ChatMessage" RENAME TO "ChatMessage";
CREATE INDEX "ChatMessage_userId_idx" ON "ChatMessage"("userId");
CREATE INDEX "ChatMessage_sessionId_idx" ON "ChatMessage"("sessionId");
CREATE TABLE "new_CompanyIntelSession" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userId" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "roleType" TEXT NOT NULL,
    "result" TEXT NOT NULL
);
INSERT INTO "new_CompanyIntelSession" ("companyName", "createdAt", "id", "result", "roleType", "updatedAt") SELECT "companyName", "createdAt", "id", "result", "roleType", "updatedAt" FROM "CompanyIntelSession";
DROP TABLE "CompanyIntelSession";
ALTER TABLE "new_CompanyIntelSession" RENAME TO "CompanyIntelSession";
CREATE INDEX "CompanyIntelSession_userId_idx" ON "CompanyIntelSession"("userId");
CREATE TABLE "new_GuesstimateSession" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userId" TEXT NOT NULL,
    "inputText" TEXT NOT NULL,
    "result" TEXT NOT NULL
);
INSERT INTO "new_GuesstimateSession" ("createdAt", "id", "inputText", "result", "updatedAt") SELECT "createdAt", "id", "inputText", "result", "updatedAt" FROM "GuesstimateSession";
DROP TABLE "GuesstimateSession";
ALTER TABLE "new_GuesstimateSession" RENAME TO "GuesstimateSession";
CREATE INDEX "GuesstimateSession_userId_idx" ON "GuesstimateSession"("userId");
CREATE TABLE "new_ResumeAnalysis" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userId" TEXT NOT NULL,
    "inputText" TEXT NOT NULL,
    "jdText" TEXT NOT NULL,
    "result" TEXT NOT NULL
);
INSERT INTO "new_ResumeAnalysis" ("createdAt", "id", "inputText", "jdText", "result", "updatedAt") SELECT "createdAt", "id", "inputText", "jdText", "result", "updatedAt" FROM "ResumeAnalysis";
DROP TABLE "ResumeAnalysis";
ALTER TABLE "new_ResumeAnalysis" RENAME TO "ResumeAnalysis";
CREATE INDEX "ResumeAnalysis_userId_idx" ON "ResumeAnalysis"("userId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
