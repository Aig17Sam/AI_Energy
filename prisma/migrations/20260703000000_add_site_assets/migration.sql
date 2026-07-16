CREATE TABLE "SiteAsset" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "alt" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SiteAsset_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "SiteAsset_key_key" ON "SiteAsset"("key");
