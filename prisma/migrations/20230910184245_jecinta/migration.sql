-- CreateTable
CREATE TABLE "authModel" (
    "id" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "roleID" TEXT NOT NULL,
    "avatar" TEXT,
    "avatarID" TEXT,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "token" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "authModel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "postModel" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "cost" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "image" TEXT,
    "imageID" TEXT,
    "userID" TEXT NOT NULL,
    "rating" INTEGER[],
    "rate" INTEGER NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "postModel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "commentModel" (
    "id" TEXT NOT NULL,
    "comment" TEXT NOT NULL,
    "cost" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "image" TEXT,
    "imageID" TEXT,
    "storeID" TEXT NOT NULL,
    "userID" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "commentModel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "replyModel" (
    "id" TEXT NOT NULL,
    "reply" TEXT NOT NULL,
    "commentID" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "replyModel_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "authModel_email_key" ON "authModel"("email");

-- AddForeignKey
ALTER TABLE "postModel" ADD CONSTRAINT "postModel_userID_fkey" FOREIGN KEY ("userID") REFERENCES "authModel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "commentModel" ADD CONSTRAINT "commentModel_storeID_fkey" FOREIGN KEY ("storeID") REFERENCES "postModel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "replyModel" ADD CONSTRAINT "replyModel_commentID_fkey" FOREIGN KEY ("commentID") REFERENCES "commentModel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
