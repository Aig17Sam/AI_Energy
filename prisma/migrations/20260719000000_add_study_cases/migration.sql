CREATE TABLE "StudyCase" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "StudyCase_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "StudyCaseImage" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "studyCaseId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "StudyCaseImage_pkey" PRIMARY KEY ("id")
);

ALTER TABLE "StudyCaseImage" ADD CONSTRAINT "StudyCaseImage_studyCaseId_fkey" FOREIGN KEY ("studyCaseId") REFERENCES "StudyCase"("id") ON DELETE CASCADE ON UPDATE CASCADE;
