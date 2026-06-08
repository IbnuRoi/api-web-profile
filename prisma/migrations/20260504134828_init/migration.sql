-- CreateTable
CREATE TABLE "Projects" (
    "id" SERIAL NOT NULL,
    "projectId" VARCHAR NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "projectType" VARCHAR(100) NOT NULL,
    "shortDescription" TEXT NOT NULL,
    "decription" TEXT NOT NULL,
    "challenge" TEXT NOT NULL,
    "solution" TEXT NOT NULL,
    "imageUrl" VARCHAR NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Projects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KeyFeatures" (
    "id" SERIAL NOT NULL,
    "projectId" TEXT NOT NULL,
    "feature" TEXT NOT NULL,

    CONSTRAINT "KeyFeatures_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TechStacks" (
    "id" SERIAL NOT NULL,
    "projectId" TEXT NOT NULL,
    "category" VARCHAR(100) NOT NULL,
    "name" VARCHAR(100) NOT NULL,

    CONSTRAINT "TechStacks_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Projects_projectId_key" ON "Projects"("projectId");

-- AddForeignKey
ALTER TABLE "KeyFeatures" ADD CONSTRAINT "KeyFeatures_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Projects"("projectId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TechStacks" ADD CONSTRAINT "TechStacks_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Projects"("projectId") ON DELETE RESTRICT ON UPDATE CASCADE;
