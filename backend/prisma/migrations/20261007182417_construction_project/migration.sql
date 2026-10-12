/*
  Warnings:

  - You are about to drop the `Expense` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Expense";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Client" (
    "clientId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "phone" TEXT,
    "email" TEXT
);

-- CreateTable
CREATE TABLE "Supplier" (
    "supplierId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "supplierName" TEXT NOT NULL,
    "phone" TEXT
);

-- CreateTable
CREATE TABLE "Manager" (
    "managerId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "speciality" TEXT,
    "email" TEXT
);

-- CreateTable
CREATE TABLE "Worker" (
    "workerId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "hourlyRate" REAL NOT NULL
);

-- CreateTable
CREATE TABLE "Project" (
    "projectId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "projectName" TEXT NOT NULL,
    "totalBudget" REAL NOT NULL,
    "clientId" INTEGER NOT NULL,
    "managerId" INTEGER NOT NULL,
    CONSTRAINT "Project_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client" ("clientId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Project_managerId_fkey" FOREIGN KEY ("managerId") REFERENCES "Manager" ("managerId") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Task" (
    "taskId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "taskName" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "projectId" INTEGER NOT NULL,
    "managerId" INTEGER NOT NULL,
    CONSTRAINT "Task_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project" ("projectId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Task_managerId_fkey" FOREIGN KEY ("managerId") REFERENCES "Manager" ("managerId") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Material" (
    "materialId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "materialName" TEXT NOT NULL,
    "unitCost" REAL NOT NULL,
    "supplierId" INTEGER NOT NULL,
    CONSTRAINT "Material_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "Supplier" ("supplierId") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Assigns" (
    "managerId" INTEGER NOT NULL,
    "workerId" INTEGER NOT NULL,

    PRIMARY KEY ("managerId", "workerId"),
    CONSTRAINT "Assigns_managerId_fkey" FOREIGN KEY ("managerId") REFERENCES "Manager" ("managerId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Assigns_workerId_fkey" FOREIGN KEY ("workerId") REFERENCES "Worker" ("workerId") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Requires" (
    "taskId" INTEGER NOT NULL,
    "materialId" INTEGER NOT NULL,

    PRIMARY KEY ("taskId", "materialId"),
    CONSTRAINT "Requires_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task" ("taskId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Requires_materialId_fkey" FOREIGN KEY ("materialId") REFERENCES "Material" ("materialId") ON DELETE RESTRICT ON UPDATE CASCADE
);
