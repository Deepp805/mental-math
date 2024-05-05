/*
  Warnings:

  - Added the required column `length` to the `Score` table without a default value. This is not possible if the table is not empty.

*/
-- AlterSequence
ALTER SEQUENCE "Score_id_seq" MAXVALUE 9223372036854775807;

-- AlterTable
ALTER TABLE "Score" ADD COLUMN "length" INT NOT NULL DEFAULT 0;