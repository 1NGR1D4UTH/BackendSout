-- CreateEnum
CREATE TYPE "etatCommande" AS ENUM ('EN_ATTENTE', 'En_COUR', 'TERMINEE', 'LIVRER');

-- CreateEnum
CREATE TYPE "type" AS ENUM ('COUTURIER', 'EMPLOYER', 'CLIENT');

-- CreateEnum
CREATE TYPE "morphologie" AS ENUM ('ENFANT', 'FEMME', 'HOMME');

-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "nom" TEXT NOT NULL,
    "prenom" TEXT,
    "dateNaissance" TIMESTAMP(3) NOT NULL,
    "phoneNumberU" TEXT NOT NULL,
    "mail" TEXT NOT NULL,
    "password" TEXT,
    "sexe" TEXT NOT NULL,
    "localisation" TEXT NOT NULL,
    "avatar" TEXT,
    "createBy" TEXT,
    "status" "type" DEFAULT 'COUTURIER',
    "dateCreate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateUpdate" TIMESTAMP(3) NOT NULL,
    "isdelete" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "clients" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "userId" TEXT NOT NULL,
    "userCreated" UUID NOT NULL,
    "status" "type" DEFAULT 'CLIENT',
    "morphologie" "morphologie" NOT NULL,
    "dateCreate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateUpdate" TIMESTAMP(3) NOT NULL,
    "isdelete" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "clients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "employers" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "userId" TEXT NOT NULL,
    "userCreated" UUID NOT NULL,
    "status" "type" DEFAULT 'EMPLOYER',
    "dateCreate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateUpdate" TIMESTAMP(3) NOT NULL,
    "isdelete" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "employers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "catalogues" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "nomC" TEXT NOT NULL,
    "libelleC" TEXT NOT NULL,
    "userCreated" UUID NOT NULL,
    "dateCreate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateUpdate" TIMESTAMP(3) NOT NULL,
    "isdelete" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "catalogues_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "modeles" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "nom" TEXT NOT NULL,
    "libelle" TEXT NOT NULL,
    "catalogueId" UUID NOT NULL,
    "dateCreate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateUpdate" TIMESTAMP(3) NOT NULL,
    "isdelete" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "modeles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "prendreMesures" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "clientId" UUID NOT NULL,
    "employerId" UUID NOT NULL,
    "dateCreate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateUpdate" TIMESTAMP(3) NOT NULL,
    "isDelete" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "prendreMesures_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mesureHauts" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "clientId" UUID NOT NULL,
    "employerId" UUID NOT NULL,
    "epaule" INTEGER NOT NULL,
    "poitrine" INTEGER NOT NULL,
    "dos" INTEGER NOT NULL,
    "hautSein" INTEGER,
    "tourSien" INTEGER,
    "carrureDos" INTEGER NOT NULL,
    "carrureAvant" INTEGER NOT NULL,
    "ventre" INTEGER NOT NULL,
    "taille" INTEGER NOT NULL,
    "lTaille" INTEGER NOT NULL,
    "lTotal" INTEGER NOT NULL,
    "bassin" INTEGER NOT NULL,
    "lManche" INTEGER NOT NULL,
    "tManche" INTEGER NOT NULL,
    "tPoignet" INTEGER NOT NULL,
    "col" INTEGER NOT NULL,
    "nDePoches" INTEGER NOT NULL,
    "prendreMesureId" UUID NOT NULL,
    "dateCreate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateUpdate" TIMESTAMP(3) NOT NULL,
    "isDelete" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "mesureHauts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mesureBass" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "clientId" UUID NOT NULL,
    "employerId" UUID NOT NULL,
    "taille" INTEGER NOT NULL,
    "bassin" INTEGER NOT NULL,
    "fesses" INTEGER NOT NULL,
    "cuisse" INTEGER NOT NULL,
    "longueur" INTEGER NOT NULL,
    "fond" INTEGER NOT NULL,
    "braquette" INTEGER,
    "pied" INTEGER NOT NULL,
    "nDePoches" INTEGER NOT NULL,
    "prendreMesureId" UUID NOT NULL,
    "dateCreate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateUpdate" TIMESTAMP(3) NOT NULL,
    "isDelete" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "mesureBass_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "produits" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "libelle" TEXT NOT NULL,
    "Qte" INTEGER NOT NULL,
    "stockId" UUID NOT NULL,
    "dateCreate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateUpdate" TIMESTAMP(3) NOT NULL,
    "isDelete" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "produits_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stocks" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "nameStock" TEXT NOT NULL,
    "libelle" TEXT NOT NULL,
    "qteStock" INTEGER NOT NULL,
    "dateCreate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateUpdate" TIMESTAMP(3) NOT NULL,
    "isDelete" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "stocks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "commandes" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "libelle" TEXT NOT NULL,
    "status" "etatCommande" DEFAULT 'EN_ATTENTE',
    "prendreMesureId" UUID,
    "modeleId" UUID NOT NULL,
    "produitId" UUID NOT NULL,
    "clientId" UUID NOT NULL,
    "employerId" UUID NOT NULL,
    "montVerse" INTEGER NOT NULL,
    "montRestant" INTEGER NOT NULL,
    "dateStart" TIMESTAMP(3) NOT NULL,
    "dateEnd" TIMESTAMP(3) NOT NULL,
    "dateCreate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateUpdate" TIMESTAMP(3) NOT NULL,
    "isDelete" BOOLEAN DEFAULT false,

    CONSTRAINT "commandes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_phoneNumberU_key" ON "users"("phoneNumberU");

-- CreateIndex
CREATE UNIQUE INDEX "users_mail_key" ON "users"("mail");

-- AddForeignKey
ALTER TABLE "clients" ADD CONSTRAINT "clients_userCreated_fkey" FOREIGN KEY ("userCreated") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employers" ADD CONSTRAINT "employers_userCreated_fkey" FOREIGN KEY ("userCreated") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "catalogues" ADD CONSTRAINT "catalogues_userCreated_fkey" FOREIGN KEY ("userCreated") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "modeles" ADD CONSTRAINT "modeles_catalogueId_fkey" FOREIGN KEY ("catalogueId") REFERENCES "catalogues"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "prendreMesures" ADD CONSTRAINT "prendreMesures_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "prendreMesures" ADD CONSTRAINT "prendreMesures_employerId_fkey" FOREIGN KEY ("employerId") REFERENCES "employers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mesureHauts" ADD CONSTRAINT "mesureHauts_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mesureHauts" ADD CONSTRAINT "mesureHauts_employerId_fkey" FOREIGN KEY ("employerId") REFERENCES "employers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mesureHauts" ADD CONSTRAINT "mesureHauts_prendreMesureId_fkey" FOREIGN KEY ("prendreMesureId") REFERENCES "prendreMesures"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mesureBass" ADD CONSTRAINT "mesureBass_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mesureBass" ADD CONSTRAINT "mesureBass_employerId_fkey" FOREIGN KEY ("employerId") REFERENCES "employers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mesureBass" ADD CONSTRAINT "mesureBass_prendreMesureId_fkey" FOREIGN KEY ("prendreMesureId") REFERENCES "prendreMesures"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "produits" ADD CONSTRAINT "produits_stockId_fkey" FOREIGN KEY ("stockId") REFERENCES "stocks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "commandes" ADD CONSTRAINT "commandes_prendreMesureId_fkey" FOREIGN KEY ("prendreMesureId") REFERENCES "prendreMesures"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "commandes" ADD CONSTRAINT "commandes_modeleId_fkey" FOREIGN KEY ("modeleId") REFERENCES "modeles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "commandes" ADD CONSTRAINT "commandes_produitId_fkey" FOREIGN KEY ("produitId") REFERENCES "produits"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "commandes" ADD CONSTRAINT "commandes_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "commandes" ADD CONSTRAINT "commandes_employerId_fkey" FOREIGN KEY ("employerId") REFERENCES "employers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
