const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.requires.deleteMany();
  await prisma.assigns.deleteMany();
  await prisma.task.deleteMany();
  await prisma.material.deleteMany();
  await prisma.project.deleteMany();
  await prisma.worker.deleteMany();
  await prisma.manager.deleteMany();
  await prisma.supplier.deleteMany();
  await prisma.client.deleteMany();

  // Clients
  await prisma.client.createMany({
    data: [
      {
        clientId: 1,
        name: "Rajesh Builders",
        phone: "9876543210",
        email: "rajeshbuilders@gmail.com"
      },
      {
        clientId: 2,
        name: "Mehta Constructions",
        phone: "9823456710",
        email: "mehtaconstructions@gmail.com"
      },
      {
        clientId: 3,
        name: "Sharma Developers",
        phone: "9988776655",
        email: "sharmadevelopers@gmail.com"
      }
    ]
  });

  // Suppliers
  await prisma.supplier.createMany({
    data: [
      {
        supplierId: 1,
        supplierName: "Tata Building Supplies",
        phone: "9876501234"
      },
      {
        supplierId: 2,
        supplierName: "Mumbai Cement Depot",
        phone: "9822012345"
      },
      {
        supplierId: 3,
        supplierName: "Steel India Suppliers",
        phone: "9987012345"
      },
      {
        supplierId: 4,
        supplierName: "BuildMart Materials",
        phone: "9769012345"
      }
    ]
  });

  // Managers
  await prisma.manager.createMany({
    data: [
      {
        managerId: 1,
        name: "Amit Patil",
        speciality: "Structural Engineering",
        email: "amit.patil@gmail.com"
      },
      {
        managerId: 2,
        name: "Rohan Mehta",
        speciality: "Site Management",
        email: "rohan.mehta@gmail.com"
      },
      {
        managerId: 3,
        name: "Sneha Kulkarni",
        speciality: "Electrical and Plumbing",
        email: "sneha.kulkarni@gmail.com"
      }
    ]
  });

  // Workers
  await prisma.worker.createMany({
    data: [
      {
        workerId: 1,
        name: "Rahul Sharma",
        hourlyRate: 350
      },
      {
        workerId: 2,
        name: "Suresh Yadav",
        hourlyRate: 400
      },
      {
        workerId: 3,
        name: "Akash Patil",
        hourlyRate: 450
      },
      {
        workerId: 4,
        name: "Vijay More",
        hourlyRate: 375
      },
      {
        workerId: 5,
        name: "Karan Singh",
        hourlyRate: 500
      },
      {
        workerId: 6,
        name: "Mahesh Jadhav",
        hourlyRate: 425
      },
      {
        workerId: 7,
        name: "Ravi Kumar",
        hourlyRate: 380
      }
    ]
  });

  // Projects
  await prisma.project.createMany({
    data: [
      {
        projectId: 1,
        projectName: "Residential Tower A",
        totalBudget: 25000000,
        clientId: 1,
        managerId: 1
      },
      {
        projectId: 2,
        projectName: "Office Complex B",
        totalBudget: 18000000,
        clientId: 2,
        managerId: 2
      },
      {
        projectId: 3,
        projectName: "Shopping Mall C",
        totalBudget: 32000000,
        clientId: 3,
        managerId: 3
      },
      {
        projectId: 4,
        projectName: "Villa Project D",
        totalBudget: 12000000,
        clientId: 1,
        managerId: 2
      }
    ]
  });

  // Tasks
  await prisma.task.createMany({
    data: [
      {
        taskId: 1,
        taskName: "Foundation Work",
        status: "Completed",
        projectId: 1,
        managerId: 1
      },
      {
        taskId: 2,
        taskName: "Column Construction",
        status: "In Progress",
        projectId: 1,
        managerId: 1
      },
      {
        taskId: 3,
        taskName: "Brickwork",
        status: "Pending",
        projectId: 1,
        managerId: 1
      },
      {
        taskId: 4,
        taskName: "Electrical Installation",
        status: "In Progress",
        projectId: 2,
        managerId: 3
      },
      {
        taskId: 5,
        taskName: "Plumbing",
        status: "Pending",
        projectId: 2,
        managerId: 3
      },
      {
        taskId: 6,
        taskName: "Interior Work",
        status: "In Progress",
        projectId: 2,
        managerId: 2
      },
      {
        taskId: 7,
        taskName: "Foundation Work",
        status: "Completed",
        projectId: 3,
        managerId: 3
      },
      {
        taskId: 8,
        taskName: "Painting",
        status: "Pending",
        projectId: 3,
        managerId: 3
      },
      {
        taskId: 9,
        taskName: "Roof Construction",
        status: "In Progress",
        projectId: 4,
        managerId: 2
      }
    ]
  });

  // Materials
  await prisma.material.createMany({
    data: [
      {
        materialId: 1,
        materialName: "Cement",
        unitCost: 450,
        supplierId: 2
      },
      {
        materialId: 2,
        materialName: "Steel Rods",
        unitCost: 65000,
        supplierId: 3
      },
      {
        materialId: 3,
        materialName: "Bricks",
        unitCost: 12,
        supplierId: 1
      },
      {
        materialId: 4,
        materialName: "Sand",
        unitCost: 1800,
        supplierId: 4
      },
      {
        materialId: 5,
        materialName: "Electrical Wire",
        unitCost: 85,
        supplierId: 4
      },
      {
        materialId: 6,
        materialName: "PVC Pipes",
        unitCost: 120,
        supplierId: 1
      },
      {
        materialId: 7,
        materialName: "Paint",
        unitCost: 650,
        supplierId: 4
      }
    ]
  });

  // Assigns relationship
  await prisma.assigns.createMany({
    data: [
      {
        managerId: 1,
        workerId: 1
      },
      {
        managerId: 1,
        workerId: 2
      },
      {
        managerId: 1,
        workerId: 3
      },
      {
        managerId: 2,
        workerId: 4
      },
      {
        managerId: 2,
        workerId: 5
      },
      {
        managerId: 2,
        workerId: 6
      },
      {
        managerId: 3,
        workerId: 7
      }
    ]
  });

  // Requires relationship
  await prisma.requires.createMany({
    data: [
      {
        taskId: 1,
        materialId: 1
      },
      {
        taskId: 1,
        materialId: 2
      },
      {
        taskId: 1,
        materialId: 4
      },
      {
        taskId: 2,
        materialId: 1
      },
      {
        taskId: 2,
        materialId: 2
      },
      {
        taskId: 3,
        materialId: 3
      },
      {
        taskId: 3,
        materialId: 1
      },
      {
        taskId: 4,
        materialId: 5
      },
      {
        taskId: 5,
        materialId: 6
      },
      {
        taskId: 6,
        materialId: 7
      },
      {
        taskId: 7,
        materialId: 1
      },
      {
        taskId: 8,
        materialId: 7
      },
      {
        taskId: 9,
        materialId: 1
      },
      {
        taskId: 9,
        materialId: 2
      }
    ]
  });

  console.log("Construction Project Manager database seeded successfully.");
}

main()
  .catch((error) => {
    console.error("Error while seeding database:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); prisma.$disconnect();