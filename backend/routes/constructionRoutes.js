const express = require("express");
const { PrismaClient } = require("@prisma/client");

const router = express.Router();
const prisma = new PrismaClient();

// GET all clients
router.get("/clients", async (req, res) => {
  try {
    const clients = await prisma.client.findMany({
      include: {
        projects: true
      }
    });

    res.json(clients);
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch clients"
    });
  }
});

// GET all suppliers
router.get("/suppliers", async (req, res) => {
  try {
    const suppliers = await prisma.supplier.findMany({
      include: {
        materials: true
      }
    });

    res.json(suppliers);
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch suppliers"
    });
  }
});

// GET all managers
router.get("/managers", async (req, res) => {
  try {
    const managers = await prisma.manager.findMany({
      include: {
        projects: true,
        tasks: true,
        assignments: {
          include: {
            worker: true
          }
        }
      }
    });

    res.json(managers);
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch managers"
    });
  }
});

// GET all workers
router.get("/workers", async (req, res) => {
  try {
    const workers = await prisma.worker.findMany({
      include: {
        assignments: {
          include: {
            manager: true
          }
        }
      }
    });

    res.json(workers);
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch workers"
    });
  }
});

// GET all projects
router.get("/projects", async (req, res) => {
  try {
    const projects = await prisma.project.findMany({
      include: {
        client: true,
        manager: true,
        tasks: true
      }
    });

    res.json(projects);
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch projects"
    });
  }
});

// GET one project by ID
router.get("/projects/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    const project = await prisma.project.findUnique({
      where: {
        projectId: id
      },
      include: {
        client: true,
        manager: true,
        tasks: {
          include: {
            manager: true,
            materials: {
              include: {
                material: true
              }
            }
          }
        }
      }
    });

    if (!project) {
      return res.status(404).json({
        error: "Project not found"
      });
    }

    res.json(project);
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch project"
    });
  }
});

// GET all tasks
router.get("/tasks", async (req, res) => {
  try {
    const tasks = await prisma.task.findMany({
      include: {
        project: true,
        manager: true,
        materials: {
          include: {
            material: true
          }
        }
      }
    });

    res.json(tasks);
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch tasks"
    });
  }
});

// GET all materials
router.get("/materials", async (req, res) => {
  try {
    const materials = await prisma.material.findMany({
      include: {
        supplier: true,
        tasks: {
          include: {
            task: true
          }
        }
      }
    });

    res.json(materials);
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch materials"
    });
  }
});

// GET dashboard statistics
router.get("/dashboard", async (req, res) => {
  try {
    const clients = await prisma.client.count();
    const projects = await prisma.project.count();
    const managers = await prisma.manager.count();
    const workers = await prisma.worker.count();
    const tasks = await prisma.task.count();
    const materials = await prisma.material.count();
    const suppliers = await prisma.supplier.count();

    const budgetResult = await prisma.project.aggregate({
      _sum: {
        totalBudget: true
      }
    });

    res.json({
      clients,
      projects,
      managers,
      workers,
      tasks,
      materials,
      suppliers,
      totalBudget: budgetResult._sum.totalBudget || 0
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch dashboard statistics"
    });
  }
});

// ADD PROJECT
router.post("/projects", async (req, res) => {
  try {
    const { projectName, totalBudget, clientId, managerId } = req.body;

    const project = await prisma.project.create({
      data: {
        projectName,
        totalBudget: Number(totalBudget),
        clientId: Number(clientId),
        managerId: Number(managerId)
      }
    });

    res.json(project);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to add project" });
  }
});


// UPDATE PROJECT
router.put("/projects/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { projectName, totalBudget, clientId, managerId } = req.body;

    const project = await prisma.project.update({
      where: {
        projectId: id
      },
      data: {
        projectName,
        totalBudget: Number(totalBudget),
        clientId: Number(clientId),
        managerId: Number(managerId)
      }
    });

    res.json(project);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update project" });
  }
});


// DELETE PROJECT
router.delete("/projects/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    await prisma.project.delete({
      where: {
        projectId: id
      }
    });

    res.json({ message: "Project deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete project" });
  }
});
// ADD CLIENT
router.post("/clients", async (req, res) => {
  try {
    const { name, phone, email } = req.body;

    const client = await prisma.client.create({
      data: {
        name,
        phone,
        email
      }
    });

    res.json(client);

  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to add client"
    });
  }
});


// UPDATE CLIENT
router.put("/clients/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { name, phone, email } = req.body;

    const client = await prisma.client.update({
      where: {
        clientId: id
      },

      data: {
        name,
        phone,
        email
      }
    });

    res.json(client);

  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to update client"
    });
  }
});


// DELETE CLIENT
router.delete("/clients/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    await prisma.client.delete({
      where: {
        clientId: id
      }
    });

    res.json({
      message: "Client deleted successfully"
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to delete client"
    });
  }
});

// ADD TASK
router.post("/tasks", async (req, res) => {
  try {
    const { taskName, status, projectId, managerId } = req.body;

    const task = await prisma.task.create({
      data: {
        taskName,
        status,
        projectId: Number(projectId),
        managerId: Number(managerId)
      }
    });

    res.json(task);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to add task"
    });
  }
});


// UPDATE TASK
router.put("/tasks/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    const { taskName, status, projectId, managerId } = req.body;

    const task = await prisma.task.update({
      where: {
        taskId: id
      },

      data: {
        taskName,
        status,
        projectId: Number(projectId),
        managerId: Number(managerId)
      }
    });

    res.json(task);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to update task"
    });
  }
});


// DELETE TASK
router.delete("/tasks/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    await prisma.task.delete({
      where: {
        taskId: id
      }
    });

    res.json({
      message: "Task deleted successfully"
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to delete task"
    });
  }
});
// ================= ASSIGNS CRUD =================

// ADD ASSIGNMENT
router.post("/assigns", async (req, res) => {
  try {
    const { managerId, workerId } = req.body;

    const assignment = await prisma.assigns.create({
      data: {
        managerId: Number(managerId),
        workerId: Number(workerId)
      }
    });

    res.json(assignment);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to assign worker"
    });
  }
});


// DELETE ASSIGNMENT
router.delete("/assigns/:managerId/:workerId", async (req, res) => {
  try {
    const managerId = Number(req.params.managerId);
    const workerId = Number(req.params.workerId);

    await prisma.assigns.delete({
      where: {
        managerId_workerId: {
          managerId: managerId,
          workerId: workerId
        }
      }
    });

    res.json({
      message: "Assignment deleted successfully"
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to delete assignment"
    });
  }
});
// ================= REQUIRES CRUD =================

// ADD MATERIAL TO TASK
router.post("/requires", async (req, res) => {
  try {
    const { taskId, materialId } = req.body;

    const requirement = await prisma.requires.create({
      data: {
        taskId: Number(taskId),
        materialId: Number(materialId)
      }
    });

    res.json(requirement);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to add material to task"
    });
  }
});

// DELETE MATERIAL FROM TASK
router.delete("/requires/:taskId/:materialId", async (req, res) => {
  try {
    const taskId = Number(req.params.taskId);
    const materialId = Number(req.params.materialId);

    await prisma.requires.delete({
      where: {
        taskId_materialId: {
          taskId: taskId,
          materialId: materialId
        }
      }
    });

    res.json({
      message: "Material removed from task successfully"
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to remove material from task"
    });
  }
});
// ADD MANAGER
router.post("/managers", async (req, res) => {
  try {
    const { name, speciality, email } = req.body;

    const manager = await prisma.manager.create({
      data: {
        name,
        speciality,
        email
      }
    });

    res.json(manager);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to add manager"
    });
  }
});

// UPDATE MANAGER
router.put("/managers/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { name, speciality, email } = req.body;

    const manager = await prisma.manager.update({
      where: {
        managerId: id
      },
      data: {
        name,
        speciality,
        email
      }
    });

    res.json(manager);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to update manager"
    });
  }
});

// DELETE MANAGER
router.delete("/managers/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    await prisma.manager.delete({
      where: {
        managerId: id
      }
    });

    res.json({
      message: "Manager deleted successfully"
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to delete manager"
    });
  }
});
router.post("/workers", async (req, res) => {
  try {
    const { name, hourlyRate } = req.body;

    const worker = await prisma.worker.create({
      data: {
        name,
        hourlyRate: Number(hourlyRate)
      }
    });

    res.json(worker);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to add worker"
    });
  }
});

router.put("/workers/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { name, hourlyRate } = req.body;

    const worker = await prisma.worker.update({
      where: {
        workerId: id
      },
      data: {
        name,
        hourlyRate: Number(hourlyRate)
      }
    });

    res.json(worker);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to update worker"
    });
  }
});

router.delete("/workers/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    await prisma.worker.delete({
      where: {
        workerId: id
      }
    });

    res.json({
      message: "Worker deleted successfully"
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to delete worker"
    });
  }
});
router.post("/materials", async (req, res) => {
  try {
    const { materialName, unitCost, supplierId } = req.body;

    const material = await prisma.material.create({
      data: {
        materialName,
        unitCost: Number(unitCost),
        supplierId: Number(supplierId)
      }
    });

    res.json(material);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to add material"
    });
  }
});

router.put("/materials/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { materialName, unitCost, supplierId } = req.body;

    const material = await prisma.material.update({
      where: {
        materialId: id
      },
      data: {
        materialName,
        unitCost: Number(unitCost),
        supplierId: Number(supplierId)
      }
    });

    res.json(material);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to update material"
    });
  }
});

router.delete("/materials/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    await prisma.material.delete({
      where: {
        materialId: id
      }
    });

    res.json({
      message: "Material deleted successfully"
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to delete material"
    });
  }
});
router.post("/suppliers", async (req, res) => {
  try {
    const { supplierName, phone } = req.body;

    const supplier = await prisma.supplier.create({
      data: {
        supplierName,
        phone
      }
    });

    res.json(supplier);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to add supplier"
    });
  }
});

router.put("/suppliers/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { supplierName, phone } = req.body;

    const supplier = await prisma.supplier.update({
      where: {
        supplierId: id
      },
      data: {
        supplierName,
        phone
      }
    });

    res.json(supplier);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to update supplier"
    });
  }
});

router.delete("/suppliers/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    await prisma.supplier.delete({
      where: {
        supplierId: id
      }
    });

    res.json({
      message: "Supplier deleted successfully"
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to delete supplier"
    });
  }
});
module.exports = router;
