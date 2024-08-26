/*
  Warnings:

  - The primary key for the `drivers` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `places` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `travel_steps` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `travels` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "drivers" DROP CONSTRAINT "drivers_userId_fkey";

-- DropForeignKey
ALTER TABLE "travel_steps" DROP CONSTRAINT "travel_steps_locationId_fkey";

-- DropForeignKey
ALTER TABLE "travel_steps" DROP CONSTRAINT "travel_steps_travelId_fkey";

-- DropForeignKey
ALTER TABLE "travels" DROP CONSTRAINT "travels_driverId_fkey";

-- AlterTable
ALTER TABLE "drivers" DROP CONSTRAINT "drivers_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ADD CONSTRAINT "drivers_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "drivers_id_seq";

-- AlterTable
ALTER TABLE "places" DROP CONSTRAINT "places_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "places_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "places_id_seq";

-- AlterTable
ALTER TABLE "travel_steps" DROP CONSTRAINT "travel_steps_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "locationId" SET DATA TYPE TEXT,
ALTER COLUMN "travelId" SET DATA TYPE TEXT,
ADD CONSTRAINT "travel_steps_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "travel_steps_id_seq";

-- AlterTable
ALTER TABLE "travels" DROP CONSTRAINT "travels_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "driverId" SET DATA TYPE TEXT,
ADD CONSTRAINT "travels_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "travels_id_seq";

-- AlterTable
ALTER TABLE "users" DROP CONSTRAINT "users_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "users_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "users_id_seq";

-- AddForeignKey
ALTER TABLE "travel_steps" ADD CONSTRAINT "travel_steps_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "places"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "travel_steps" ADD CONSTRAINT "travel_steps_travelId_fkey" FOREIGN KEY ("travelId") REFERENCES "travels"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "travels" ADD CONSTRAINT "travels_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "drivers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "drivers" ADD CONSTRAINT "drivers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
