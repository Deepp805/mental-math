/*
  Warnings:

  - You are about to alter the column `length` on the `Score` table. The data in that column could be lost. The data in that column will be cast from `Int8` to `Int4`.

*/
-- AlterTable
ALTER TABLE "Score" ALTER COLUMN "length" DROP DEFAULT;
ALTER TABLE "Score" ALTER COLUMN "length" SET DATA TYPE INT4;
