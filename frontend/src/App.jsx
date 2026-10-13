import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';


function App() {
  const [page, setPage] = useState("dashboard");
  const [loading, setLoading] = useState(true);

  const [clients, setClients] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [managers, setManagers] = useState([]);
  const [workers, setWorkers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [dashboard, setDashboard] = useState(null);

  const [showProjectForm, setShowProjectForm] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [projectName, setProjectName] = useState("");
  const [totalBudget, setTotalBudget] = useState("");
  const [projectClientId, setProjectClientId] = useState("");
  const [projectManagerId, setProjectManagerId] = useState("");

  const [showClientForm, setShowClientForm] = useState(false);
  const [editingClient, setEditingClient] = useState(null);
  const [clientName, setClientName] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [clientEmail, setClientEmail] = useState("");

  const [showTaskForm, setShowTaskForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [taskName, setTaskName] = useState("");
  const [taskStatus, setTaskStatus] = useState("Pending");
  const [taskProjectId, setTaskProjectId] = useState("");
  const [taskManagerId, setTaskManagerId] = useState("");

  const [showManagerForm, setShowManagerForm] = useState(false);
  const [editingManagerId, setEditingManagerId] = useState(null);
  const [managerName, setManagerName] = useState("");
  const [managerSpeciality, setManagerSpeciality] = useState("");
  const [managerEmail, setManagerEmail] = useState("");

  const [showWorkerForm, setShowWorkerForm] = useState(false);
  const [editingWorkerId, setEditingWorkerId] = useState(null);
  const [workerName, setWorkerName] = useState("");
  const [workerHourlyRate, setWorkerHourlyRate] = useState("");

  const [showMaterialForm, setShowMaterialForm] = useState(false);
  const [editingMaterialId, setEditingMaterialId] = useState(null);
  const [materialName, setMaterialName] = useState("");
  const [materialUnitCost, setMaterialUnitCost] = useState("");
  const [materialSupplierId, setMaterialSupplierId] = useState("");

  const [showSupplierForm, setShowSupplierForm] = useState(false);
  const [editingSupplierId, setEditingSupplierId] = useState(null);
  const [supplierName, setSupplierName] = useState("");
  const [supplierPhone, setSupplierPhone] = useState("");

  const [showAssignForm, setShowAssignForm] = useState(false);
  const [assignManagerId, setAssignManagerId] = useState("");
  const [assignWorkerId, setAssignWorkerId] = useState("");

  const [showRequireForm, setShowRequireForm] = useState(false);
  const [requireTaskId, setRequireTaskId] = useState("");
  const [requireMaterialId, setRequireMaterialId] = useState("");

  const formatCurrency = (value) => {
    return `₹${Number(value || 0).toLocaleString("en-IN")}`;
  };

  const fetchAllData = async () => {
    try {
      const [
        clientsRes,
        suppliersRes,
        managersRes,
        workersRes,
        projectsRes,
        tasksRes,
        materialsRes,
        dashboardRes
      ] = await Promise.all([
axios.get(`${API_URL}/api/clients`),
axios.get(`${API_URL}/api/suppliers`),
axios.get(`${API_URL}/api/managers`),
axios.get(`${API_URL}/api/workers`),
axios.get(`${API_URL}/api/projects`),
axios.get(`${API_URL}/api/tasks`),
axios.get(`${API_URL}/api/materials`),
axios.get(`${API_URL}/api/dashboard`)

      ]);

      setClients(clientsRes.data);
      setSuppliers(suppliersRes.data);
      setManagers(managersRes.data);
      setWorkers(workersRes.data);
      setProjects(projectsRes.data);
      setTasks(tasksRes.data);
      setMaterials(materialsRes.data);
      setDashboard(dashboardRes.data);
    } catch (error) {
      console.error(error);
      alert("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  // ================= PROJECT CRUD =================

  const saveProject = async (event) => {
    event.preventDefault();

    if (
      !projectName.trim() ||
      !totalBudget ||
      !projectClientId ||
      !projectManagerId
    ) {
      alert("Please fill all fields.");
      return;
    }

    if (Number(totalBudget) <= 0) {
      alert("Budget must be greater than 0.");
      return;
    }

    try {
      const data = {
        projectName: projectName.trim(),
        totalBudget: Number(totalBudget),
        clientId: Number(projectClientId),
        managerId: Number(projectManagerId)
      };

      if (editingProject) {
        await axios.put(
          `${API_URL}/api/projects/${editingProject.projectId}`,
          data
        );
        alert("Project updated successfully!");
      } else {
        await axios.post(
          `${API_URL}/api/projects`,
          data
        );
        alert("Project added successfully!");
      }

      resetProjectForm();
      fetchAllData();
    } catch (error) {
      console.error(error);
      alert("Failed to save project");
    }
  };

  const resetProjectForm = () => {
    setProjectName("");
    setTotalBudget("");
    setProjectClientId("");
    setProjectManagerId("");
    setEditingProject(null);
    setShowProjectForm(false);
  };

  const editProject = (project) => {
    setEditingProject(project);
    setProjectName(project.projectName);
    setTotalBudget(project.totalBudget);
    setProjectClientId(project.clientId);
    setProjectManagerId(project.managerId);
    setShowProjectForm(true);
  };

  const deleteProject = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?")) {
      return;
    }

    try {
      await axios.delete(
        `${API_URL}/api/projects/${id}`
      );

      alert("Project deleted successfully!");
      fetchAllData();
    } catch (error) {
      console.error(error);
      alert("Failed to delete project");
    }
  };

  // ================= CLIENT CRUD =================

  const saveClient = async (event) => {
    event.preventDefault();

    if (!clientName.trim()) {
      alert("Please enter client name.");
      return;
    }

    try {
      const data = {
        name: clientName.trim(),
        phone: clientPhone.trim(),
        email: clientEmail.trim()
      };

      if (editingClient) {
        await axios.put(
          `${API_URL}/api/clients/${editingClient.clientId}`,
          data
        );
        alert("Client updated successfully!");
      } else {
        await axios.post(
          `${API_URL}/api/clients`,
          data
        );
        alert("Client added successfully!");
      }

      resetClientForm();
      fetchAllData();
    } catch (error) {
      console.error(error);
      alert("Failed to save client");
    }
  };

  const resetClientForm = () => {
    setClientName("");
    setClientPhone("");
    setClientEmail("");
    setEditingClient(null);
    setShowClientForm(false);
  };

  const editClient = (client) => {
    setEditingClient(client);
    setClientName(client.name);
    setClientPhone(client.phone || "");
    setClientEmail(client.email || "");
    setShowClientForm(true);
  };

  const deleteClient = async (id) => {
    if (!window.confirm("Are you sure you want to delete this client?")) {
      return;
    }

    try {
      await axios.delete(
        `${API_URL}/api/clients/${id}`
      );

      alert("Client deleted successfully!");
      fetchAllData();
    } catch (error) {
      console.error(error);
      alert(
        "Failed to delete client. Make sure this client has no projects."
      );
    }
  };

  // ================= TASK CRUD =================

  const saveTask = async (event) => {
    event.preventDefault();

    if (
      !taskName.trim() ||
      !taskProjectId ||
      !taskManagerId
    ) {
      alert("Please fill all fields.");
      return;
    }

    try {
      const data = {
        taskName: taskName.trim(),
        status: taskStatus,
        projectId: Number(taskProjectId),
        managerId: Number(taskManagerId)
      };

      if (editingTask) {
        await axios.put(
          `${API_URL}/api/tasks/${editingTask.taskId}`,
          data
        );
        alert("Task updated successfully!");
      } else {
        await axios.post(
          `${API_URL}/api/tasks`,
          data
        );
        alert("Task added successfully!");
      }

      resetTaskForm();
      fetchAllData();
    } catch (error) {
      console.error(error);
      alert("Failed to save task");
    }
  };

  const resetTaskForm = () => {
    setTaskName("");
    setTaskStatus("Pending");
    setTaskProjectId("");
    setTaskManagerId("");
    setEditingTask(null);
    setShowTaskForm(false);
  };

  const editTask = (task) => {
    setEditingTask(task);
    setTaskName(task.taskName);
    setTaskStatus(task.status);
    setTaskProjectId(task.projectId);
    setTaskManagerId(task.managerId);
    setShowTaskForm(true);
  };

  const deleteTask = async (id) => {
    if (!window.confirm("Are you sure you want to delete this task?")) {
      return;
    }

    try {
      await axios.delete(
        `${API_URL}/api/tasks/${id}`
      );

      alert("Task deleted successfully!");
      fetchAllData();
    } catch (error) {
      console.error(error);
      alert("Failed to delete task");
    }
  };

  // ================= ASSIGNMENT CRUD =================

  const saveAssignment = async (event) => {
    event.preventDefault();

    if (!assignManagerId || !assignWorkerId) {
      alert("Please select both manager and worker.");
      return;
    }

    try {
      await axios.post(
        `${API_URL}/api/assigns`,
        {
          managerId: Number(assignManagerId),
          workerId: Number(assignWorkerId)
        }
      );

      alert("Worker assigned successfully!");

      setAssignManagerId("");
      setAssignWorkerId("");
      setShowAssignForm(false);

      fetchAllData();
    } catch (error) {
      console.error(error);
      alert(
        "Failed to assign worker. This assignment may already exist."
      );
    }
  };

  const deleteAssignment = async (managerId, workerId) => {
    if (
      !window.confirm(
        "Are you sure you want to remove this assignment?"
      )
    ) {
      return;
    }

    try {
      await axios.delete(
        `${API_URL}/api/assigns/${managerId}/${workerId}`
      );

      alert("Assignment removed successfully!");
      fetchAllData();
    } catch (error) {
      console.error(error);
      alert("Failed to remove assignment");
    }
  };

  // ================= REQUIREMENT CRUD =================

  const saveRequirement = async (event) => {
    event.preventDefault();

    if (!requireTaskId || !requireMaterialId) {
      alert("Please select both task and material.");
      return;
    }

    try {
      await axios.post(
        `${API_URL}/api/requires`,
        {
          taskId: Number(requireTaskId),
          materialId: Number(requireMaterialId)
        }
      );

      alert("Material added to task successfully!");

      setRequireTaskId("");
      setRequireMaterialId("");
      setShowRequireForm(false);

      fetchAllData();
    } catch (error) {
      console.error(error);

      if (error.response && error.response.status === 500) {
        alert("This material is already assigned to this task.");
      } else {
        alert("Failed to add material to task");
      }
    }
  };

  const deleteRequirement = async (taskId, materialId) => {
    if (
      !window.confirm(
        "Are you sure you want to remove this material from the task?"
      )
    ) {
      return;
    }

    try {
      await axios.delete(
        `${API_URL}/api/requires/${taskId}/${materialId}`
      );

      alert("Material removed from task successfully!");
      fetchAllData();
    } catch (error) {
      console.error(error);
      alert("Failed to remove material from task");
    }
  };
    // ================= MANAGER CRUD =================

  const saveManager = async (event) => {
    event.preventDefault();

    if (!managerName.trim()) {
      alert("Please enter manager name.");
      return;
    }

    try {
      const data = {
        name: managerName.trim(),
        speciality: managerSpeciality.trim(),
        email: managerEmail.trim()
      };

      if (editingManagerId) {
        await axios.put(
          `${API_URL}/api/managers/${editingManagerId}`,
          data
        );
        alert("Manager updated successfully!");
      } else {
        await axios.post(
          `${API_URL}/api/managers`,
          data
        );
        alert("Manager added successfully!");
      }

      resetManagerForm();
      fetchAllData();
    } catch (error) {
      console.error(error);
      alert("Failed to save manager");
    }
  };

  const resetManagerForm = () => {
    setManagerName("");
    setManagerSpeciality("");
    setManagerEmail("");
    setEditingManagerId(null);
    setShowManagerForm(false);
  };

  const editManager = (manager) => {
    setEditingManagerId(manager.managerId);
    setManagerName(manager.name);
    setManagerSpeciality(manager.speciality || "");
    setManagerEmail(manager.email || "");
    setShowManagerForm(true);
  };

  const deleteManager = async (id) => {
    if (!window.confirm("Are you sure you want to delete this manager?")) {
      return;
    }

    try {
      await axios.delete(
        `${API_URL}/api/managers/${id}`
      );

      alert("Manager deleted successfully!");
      fetchAllData();
    } catch (error) {
      console.error(error);
      alert(
        "Cannot delete this manager because they may be linked to projects, tasks, or workers."
      );
    }
  };

  // ================= WORKER CRUD =================

  const saveWorker = async (event) => {
    event.preventDefault();

    if (!workerName.trim() || !workerHourlyRate) {
      alert("Please fill all fields.");
      return;
    }

    if (Number(workerHourlyRate) <= 0) {
      alert("Hourly rate must be greater than 0.");
      return;
    }

    try {
      const data = {
        name: workerName.trim(),
        hourlyRate: Number(workerHourlyRate)
      };

      if (editingWorkerId) {
        await axios.put(
          `${API_URL}/api/workers/${editingWorkerId}`,
          data
        );
        alert("Worker updated successfully!");
      } else {
        await axios.post(
          `${API_URL}/api/workers`,
          data
        );
        alert("Worker added successfully!");
      }

      resetWorkerForm();
      fetchAllData();
    } catch (error) {
      console.error(error);
      alert("Failed to save worker");
    }
  };

  const resetWorkerForm = () => {
    setWorkerName("");
    setWorkerHourlyRate("");
    setEditingWorkerId(null);
    setShowWorkerForm(false);
  };

  const editWorker = (worker) => {
    setEditingWorkerId(worker.workerId);
    setWorkerName(worker.name);
    setWorkerHourlyRate(worker.hourlyRate);
    setShowWorkerForm(true);
  };

  const deleteWorker = async (id) => {
    if (!window.confirm("Are you sure you want to delete this worker?")) {
      return;
    }

    try {
      await axios.delete(
        `${API_URL}/api/workers/${id}`
      );

      alert("Worker deleted successfully!");
      fetchAllData();
    } catch (error) {
      console.error(error);
      alert(
        "Cannot delete this worker because they may be assigned to a manager."
      );
    }
  };

  // ================= MATERIAL CRUD =================

  const saveMaterial = async (event) => {
    event.preventDefault();

    if (
      !materialName.trim() ||
      !materialUnitCost ||
      !materialSupplierId
    ) {
      alert("Please fill all fields.");
      return;
    }

    if (Number(materialUnitCost) <= 0) {
      alert("Unit cost must be greater than 0.");
      return;
    }

    try {
      const data = {
        materialName: materialName.trim(),
        unitCost: Number(materialUnitCost),
        supplierId: Number(materialSupplierId)
      };

      if (editingMaterialId) {
        await axios.put(
          `${API_URL}/api/materials/${editingMaterialId}`,
          data
        );
        alert("Material updated successfully!");
      } else {
        await axios.post(
          `${API_URL}/api/materials`,
          data
        );
        alert("Material added successfully!");
      }

      resetMaterialForm();
      fetchAllData();
    } catch (error) {
      console.error(error);
      alert("Failed to save material");
    }
  };

  const resetMaterialForm = () => {
    setMaterialName("");
    setMaterialUnitCost("");
    setMaterialSupplierId("");
    setEditingMaterialId(null);
    setShowMaterialForm(false);
  };

  const editMaterial = (material) => {
    setEditingMaterialId(material.materialId);
    setMaterialName(material.materialName);
    setMaterialUnitCost(material.unitCost);
    setMaterialSupplierId(material.supplierId);
    setShowMaterialForm(true);
  };

  const deleteMaterial = async (id) => {
    if (!window.confirm("Are you sure you want to delete this material?")) {
      return;
    }

    try {
      await axios.delete(
        `${API_URL}/api/materials/${id}`
      );

      alert("Material deleted successfully!");
      fetchAllData();
    } catch (error) {
      console.error(error);
      alert(
        "Cannot delete this material because it may be required by a task."
      );
    }
  };

  // ================= SUPPLIER CRUD =================

  const saveSupplier = async (event) => {
    event.preventDefault();

    if (!supplierName.trim()) {
      alert("Please enter supplier name.");
      return;
    }

    try {
      const data = {
        supplierName: supplierName.trim(),
        phone: supplierPhone.trim()
      };

      if (editingSupplierId) {
        await axios.put(
          `${API_URL}/api/suppliers/${editingSupplierId}`,
          data
        );
        alert("Supplier updated successfully!");
      } else {
        await axios.post(
          `${API_URL}/api/suppliers`,
          data
        );
        alert("Supplier added successfully!");
      }

      resetSupplierForm();
      fetchAllData();
    } catch (error) {
      console.error(error);
      alert("Failed to save supplier");
    }
  };

  const resetSupplierForm = () => {
    setSupplierName("");
    setSupplierPhone("");
    setEditingSupplierId(null);
    setShowSupplierForm(false);
  };

  const editSupplier = (supplier) => {
    setEditingSupplierId(supplier.supplierId);
    setSupplierName(supplier.supplierName);
    setSupplierPhone(supplier.phone || "");
    setShowSupplierForm(true);
  };

  const deleteSupplier = async (id) => {
    if (!window.confirm("Are you sure you want to delete this supplier?")) {
      return;
    }

    try {
      await axios.delete(
        `${API_URL}/api/suppliers/${id}`
      );

      alert("Supplier deleted successfully!");
      fetchAllData();
    } catch (error) {
      console.error(error);
      alert(
        "Cannot delete this supplier because materials may be linked to them."
      );
    }
  };

  const navigation = [
    { id: "dashboard", icon: "▦", label: "Dashboard" },
    { id: "projects", icon: "▰", label: "Projects" },
    { id: "tasks", icon: "✓", label: "Tasks" },
    { id: "clients", icon: "●", label: "Clients" },
    { id: "managers", icon: "◆", label: "Managers" },
    { id: "workers", icon: "♟", label: "Workers" },
    { id: "materials", icon: "▤", label: "Materials" },
    { id: "suppliers", icon: "⌂", label: "Suppliers" },
    { id: "assignments", icon: "↔", label: "Assignments" }
  ];

  const getPageTitle = () => {
    const current = navigation.find((item) => item.id === page);
    return current ? current.label : "Dashboard";
  };

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-box">
          <div className="loading-logo">🏗️</div>
          <h2>Construction Project Manager</h2>
          <p>Loading project data...</p>
          <div className="loading-bar">
            <span></span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app-layout">

      <aside className="sidebar">
        <div className="brand">
          <div className="brand-icon">🏗️</div>
          <div>
            <h1>BuildPro</h1>
            <span>Project Manager</span>
          </div>
        </div>

        <div className="sidebar-section">
          <span className="sidebar-heading">MAIN MENU</span>

          <nav className="sidebar-nav">
            {navigation.map((item) => (
              <button
                key={item.id}
                className={page === item.id ? "nav-item active" : "nav-item"}
                onClick={() => setPage(item.id)}
              >
                <span className="nav-icon">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="sidebar-footer">
          <div className="group-badge">
            <span>DBMS MINI PROJECT</span>
            <strong>GROUP 4</strong>
          </div>
        </div>
      </aside>

      <div className="main-area">

        <header className="topbar">
          <div>
            <div className="breadcrumb">
              Construction / <strong>{getPageTitle()}</strong>
            </div>
            <h2>{getPageTitle()}</h2>
          </div>

          <div className="topbar-right">
            <div className="system-status">
              <span className="status-dot"></span>
              System Online
            </div>

            <div className="team-info">
              <div className="avatar">G4</div>
              <div>
                <strong>Group 4</strong>
                <span>Project Team</span>
              </div>
            </div>
          </div>
        </header>

        <main className="content">

          {/* ================= DASHBOARD ================= */}

          {page === "dashboard" && (
            <>
              <div className="welcome-banner">
                <div>
                  <span className="eyebrow">PROJECT OVERVIEW</span>
                  <h1>Good to see you! 👋</h1>
                  <p>
                    Monitor your construction projects, workforce,
                    materials and tasks from one place.
                  </p>
                </div>

                <div className="banner-icon">🏗️</div>
              </div>

              <div className="stats-grid">

                <div className="stat-card">
                  <div className="stat-icon blue">●</div>
                  <div className="stat-content">
                    <span>Clients</span>
                    <strong>{dashboard?.clients ?? 0}</strong>
                    <small>Registered clients</small>
                  </div>
                </div>

                <div className="stat-card">
                  <div className="stat-icon orange">▰</div>
                  <div className="stat-content">
                    <span>Projects</span>
                    <strong>{dashboard?.projects ?? 0}</strong>
                    <small>Construction projects</small>
                  </div>
                </div>

                <div className="stat-card">
                  <div className="stat-icon purple">◆</div>
                  <div className="stat-content">
                    <span>Managers</span>
                    <strong>{dashboard?.managers ?? 0}</strong>
                    <small>Project managers</small>
                  </div>
                </div>

                <div className="stat-card">
                  <div className="stat-icon green">♟</div>
                  <div className="stat-content">
                    <span>Workers</span>
                    <strong>{dashboard?.workers ?? 0}</strong>
                    <small>Available workers</small>
                  </div>
                </div>

                <div className="stat-card">
                  <div className="stat-icon teal">✓</div>
                  <div className="stat-content">
                    <span>Tasks</span>
                    <strong>{dashboard?.tasks ?? 0}</strong>
                    <small>Project tasks</small>
                  </div>
                </div>

                <div className="stat-card">
                  <div className="stat-icon yellow">▤</div>
                  <div className="stat-content">
                    <span>Materials</span>
                    <strong>{dashboard?.materials ?? 0}</strong>
                    <small>Inventory items</small>
                  </div>
                </div>

                <div className="stat-card">
                  <div className="stat-icon red">⌂</div>
                  <div className="stat-content">
                    <span>Suppliers</span>
                    <strong>{dashboard?.suppliers ?? 0}</strong>
                    <small>Registered suppliers</small>
                  </div>
                </div>

                <div className="stat-card budget-card">
                  <div className="stat-icon orange">₹</div>
                  <div className="stat-content">
                    <span>Total Budget</span>
                    <strong>
                      {formatCurrency(dashboard?.totalBudget)}
                    </strong>
                    <small>Across all projects</small>
                  </div>
                </div>

              </div>

              <div className="section-header">
                <div>
                  <span className="eyebrow">CURRENT WORK</span>
                  <h2>Active Projects</h2>
                </div>

                <button
                  className="secondary-button"
                  onClick={() => setPage("projects")}
                >
                  View All Projects →
                </button>
              </div>

              <div className="project-grid">
                {projects.length > 0 ? (
                  projects.map((project) => (
                    <div
                      className="project-overview-card"
                      key={project.projectId}
                    >
                      <div className="project-card-top">
                        <span className="project-id">
                          PROJECT #{project.projectId}
                        </span>
                        <span className="project-status">
                          ACTIVE
                        </span>
                      </div>

                      <h3>{project.projectName}</h3>

                      <div className="project-detail">
                        <span>Client</span>
                        <strong>
                          {project.client?.name || "-"}
                        </strong>
                      </div>

                      <div className="project-detail">
                        <span>Manager</span>
                        <strong>
                          {project.manager?.name || "-"}
                        </strong>
                      </div>

                      <div className="project-bottom">
                        <div>
                          <span>Budget</span>
                          <strong>
                            {formatCurrency(project.totalBudget)}
                          </strong>
                        </div>

                        <div>
                          <span>Tasks</span>
                          <strong>
                            {project.tasks?.length || 0}
                          </strong>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="empty-state">
                    <div>🏗️</div>
                    <h3>No projects found</h3>
                    <p>Add your first construction project.</p>
                  </div>
                )}
              </div>
            </>
          )}
                    {/* ================= PROJECTS ================= */}

          {page === "projects" && (
            <>
              <div className="page-heading">
                <div>
                  <span className="eyebrow">PROJECT MANAGEMENT</span>
                  <h1>Projects</h1>
                  <p>Manage all construction projects and budgets.</p>
                </div>

                <button
                  className="primary-button"
                  onClick={() => {
                    if (showProjectForm) {
                      resetProjectForm();
                    } else {
                      setEditingProject(null);
                      setProjectName("");
                      setTotalBudget("");
                      setProjectClientId("");
                      setProjectManagerId("");
                      setShowProjectForm(true);
                    }
                  }}
                >
                  {showProjectForm ? "✕ Close Form" : "+ Add Project"}
                </button>
              </div>

              {showProjectForm && (
                <form className="form-card" onSubmit={saveProject}>
                  <div className="form-header">
                    <div>
                      <span className="eyebrow">PROJECT DETAILS</span>
                      <h3>
                        {editingProject
                          ? "Edit Project"
                          : "Create New Project"}
                      </h3>
                    </div>
                  </div>

                  <div className="form-grid">

                    <div className="field">
                      <label>Project Name</label>
                      <input
                        value={projectName}
                        onChange={(e) =>
                          setProjectName(e.target.value)
                        }
                        placeholder="Enter project name"
                        required
                      />
                    </div>

                    <div className="field">
                      <label>Total Budget</label>
                      <input
                        type="number"
                        min="1"
                        value={totalBudget}
                        onChange={(e) =>
                          setTotalBudget(e.target.value)
                        }
                        placeholder="Enter budget"
                        required
                      />
                    </div>

                    <div className="field">
                      <label>Client</label>
                      <select
                        value={projectClientId}
                        onChange={(e) =>
                          setProjectClientId(e.target.value)
                        }
                        required
                      >
                        <option value="">Select Client</option>

                        {clients.map((client) => (
                          <option
                            key={client.clientId}
                            value={client.clientId}
                          >
                            {client.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="field">
                      <label>Project Manager</label>
                      <select
                        value={projectManagerId}
                        onChange={(e) =>
                          setProjectManagerId(e.target.value)
                        }
                        required
                      >
                        <option value="">Select Manager</option>

                        {managers.map((manager) => (
                          <option
                            key={manager.managerId}
                            value={manager.managerId}
                          >
                            {manager.name}
                          </option>
                        ))}
                      </select>
                    </div>

                  </div>

                  <div className="form-actions">
                    <button
                      type="submit"
                      className="primary-button"
                    >
                      {editingProject
                        ? "Update Project"
                        : "Save Project"}
                    </button>

                    <button
                      type="button"
                      className="cancel-button"
                      onClick={resetProjectForm}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}

              <div className="table-card">
                <div className="table-header">
                  <div>
                    <h3>All Projects</h3>
                    <span>
                      {projects.length} project
                      {projects.length !== 1 ? "s" : ""}
                    </span>
                  </div>
                </div>

                <div className="table-wrapper">
                  <table>
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Project</th>
                        <th>Budget</th>
                        <th>Client</th>
                        <th>Manager</th>
                        <th>Tasks</th>
                        <th>Actions</th>
                      </tr>
                    </thead>

                    <tbody>
                      {projects.map((project) => (
                        <tr key={project.projectId}>
                          <td>
                            <span className="id-badge">
                              #{project.projectId}
                            </span>
                          </td>

                          <td>
                            <strong>{project.projectName}</strong>
                          </td>

                          <td className="money">
                            {formatCurrency(project.totalBudget)}
                          </td>

                          <td>
                            {project.client?.name || "-"}
                          </td>

                          <td>
                            {project.manager?.name || "-"}
                          </td>

                          <td>
                            <span className="count-badge">
                              {project.tasks?.length || 0}
                            </span>
                          </td>

                          <td>
                            <div className="action-buttons">
                              <button
                                className="edit-button"
                                onClick={() =>
                                  editProject(project)
                                }
                              >
                                Edit
                              </button>

                              <button
                                className="delete-button"
                                onClick={() =>
                                  deleteProject(
                                    project.projectId
                                  )
                                }
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}

                      {projects.length === 0 && (
                        <tr>
                          <td
                            colSpan="7"
                            className="no-data"
                          >
                            No projects found.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {/* ================= TASKS ================= */}

          {page === "tasks" && (
            <>
              <div className="page-heading">
                <div>
                  <span className="eyebrow">WORK MANAGEMENT</span>
                  <h1>Tasks</h1>
                  <p>
                    Track project tasks and required materials.
                  </p>
                </div>

                <button
                  className="primary-button"
                  onClick={() => {
                    if (showTaskForm) {
                      resetTaskForm();
                    } else {
                      setEditingTask(null);
                      setTaskName("");
                      setTaskStatus("Pending");
                      setTaskProjectId("");
                      setTaskManagerId("");
                      setShowTaskForm(true);
                    }
                  }}
                >
                  {showTaskForm ? "✕ Close Form" : "+ Add Task"}
                </button>
              </div>

              {showTaskForm && (
                <form className="form-card" onSubmit={saveTask}>
                  <div className="form-header">
                    <div>
                      <span className="eyebrow">TASK DETAILS</span>
                      <h3>
                        {editingTask
                          ? "Edit Task"
                          : "Create New Task"}
                      </h3>
                    </div>
                  </div>

                  <div className="form-grid">

                    <div className="field">
                      <label>Task Name</label>
                      <input
                        value={taskName}
                        onChange={(e) =>
                          setTaskName(e.target.value)
                        }
                        placeholder="Enter task name"
                        required
                      />
                    </div>

                    <div className="field">
                      <label>Status</label>
                      <select
                        value={taskStatus}
                        onChange={(e) =>
                          setTaskStatus(e.target.value)
                        }
                      >
                        <option value="Pending">Pending</option>
                        <option value="In Progress">
                          In Progress
                        </option>
                        <option value="Completed">
                          Completed
                        </option>
                      </select>
                    </div>

                    <div className="field">
                      <label>Project</label>
                      <select
                        value={taskProjectId}
                        onChange={(e) =>
                          setTaskProjectId(e.target.value)
                        }
                        required
                      >
                        <option value="">Select Project</option>

                        {projects.map((project) => (
                          <option
                            key={project.projectId}
                            value={project.projectId}
                          >
                            {project.projectName}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="field">
                      <label>Manager</label>
                      <select
                        value={taskManagerId}
                        onChange={(e) =>
                          setTaskManagerId(e.target.value)
                        }
                        required
                      >
                        <option value="">Select Manager</option>

                        {managers.map((manager) => (
                          <option
                            key={manager.managerId}
                            value={manager.managerId}
                          >
                            {manager.name}
                          </option>
                        ))}
                      </select>
                    </div>

                  </div>

                  <div className="form-actions">
                    <button
                      type="submit"
                      className="primary-button"
                    >
                      {editingTask
                        ? "Update Task"
                        : "Save Task"}
                    </button>

                    <button
                      type="button"
                      className="cancel-button"
                      onClick={resetTaskForm}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}

              <div className="table-card">
                <div className="table-header">
                  <div>
                    <h3>All Tasks</h3>
                    <span>
                      {tasks.length} task
                      {tasks.length !== 1 ? "s" : ""}
                    </span>
                  </div>
                </div>

                <div className="table-wrapper">
                  <table>
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Task</th>
                        <th>Status</th>
                        <th>Project</th>
                        <th>Manager</th>
                        <th>Materials</th>
                        <th>Actions</th>
                      </tr>
                    </thead>

                    <tbody>
                      {tasks.map((task) => (
                        <tr key={task.taskId}>
                          <td>
                            <span className="id-badge">
                              #{task.taskId}
                            </span>
                          </td>

                          <td>
                            <strong>{task.taskName}</strong>
                          </td>

                          <td>
                            <span
                              className={`task-status ${
                                task.status === "Completed"
                                  ? "completed"
                                  : task.status === "In Progress"
                                  ? "progress"
                                  : "pending"
                              }`}
                            >
                              {task.status}
                            </span>
                          </td>

                          <td>
                            {task.project?.projectName || "-"}
                          </td>

                          <td>
                            {task.manager?.name || "-"}
                          </td>

                          <td>
                            <span className="count-badge">
                              {task.materials?.length || 0}
                            </span>
                          </td>

                          <td>
                            <div className="action-buttons">
                              <button
                                className="edit-button"
                                onClick={() => editTask(task)}
                              >
                                Edit
                              </button>

                              <button
                                className="delete-button"
                                onClick={() =>
                                  deleteTask(task.taskId)
                                }
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}

                      {tasks.length === 0 && (
                        <tr>
                          <td
                            colSpan="7"
                            className="no-data"
                          >
                            No tasks found.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
                            {/* TASK MATERIAL REQUIREMENTS */}

              <div className="section-header inner-section">
                <div>
                  <span className="eyebrow">RESOURCE MANAGEMENT</span>
                  <h2>Task-Material Requirements</h2>
                </div>

                <button
                  className="secondary-button"
                  onClick={() => {
                    if (showRequireForm) {
                      setShowRequireForm(false);
                      setRequireTaskId("");
                      setRequireMaterialId("");
                    } else {
                      setShowRequireForm(true);
                    }
                  }}
                >
                  {showRequireForm
                    ? "✕ Close Form"
                    : "+ Add Material"}
                </button>
              </div>

              {showRequireForm && (
                <form
                  className="form-card compact-form"
                  onSubmit={saveRequirement}
                >
                  <div className="form-grid">

                    <div className="field">
                      <label>Task</label>
                      <select
                        value={requireTaskId}
                        onChange={(e) =>
                          setRequireTaskId(e.target.value)
                        }
                        required
                      >
                        <option value="">Select Task</option>

                        {tasks.map((task) => (
                          <option
                            key={task.taskId}
                            value={task.taskId}
                          >
                            {task.taskName}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="field">
                      <label>Material</label>
                      <select
                        value={requireMaterialId}
                        onChange={(e) =>
                          setRequireMaterialId(e.target.value)
                        }
                        required
                      >
                        <option value="">Select Material</option>

                        {materials.map((material) => (
                          <option
                            key={material.materialId}
                            value={material.materialId}
                          >
                            {material.materialName}
                          </option>
                        ))}
                      </select>
                    </div>

                  </div>

                  <div className="form-actions">
                    <button
                      type="submit"
                      className="primary-button"
                    >
                      Add Material
                    </button>
                  </div>
                </form>
              )}

              <div className="table-card">
                <div className="table-header">
                  <div>
                    <h3>Assigned Materials</h3>
                    <span>
                      Materials required by each task
                    </span>
                  </div>
                </div>

                <div className="table-wrapper">
                  <table>
                    <thead>
                      <tr>
                        <th>Task</th>
                        <th>Material</th>
                        <th>Action</th>
                      </tr>
                    </thead>

                    <tbody>
                      {tasks.flatMap((task) =>
                        (task.materials || []).map(
                          (requirement) => (
                            <tr
                              key={`${task.taskId}-${requirement.materialId}`}
                            >
                              <td>
                                <strong>{task.taskName}</strong>
                              </td>

                              <td>
                                {requirement.material
                                  ?.materialName || "-"}
                              </td>

                              <td>
                                <button
                                  className="delete-button"
                                  onClick={() =>
                                    deleteRequirement(
                                      task.taskId,
                                      requirement.materialId
                                    )
                                  }
                                >
                                  Remove
                                </button>
                              </td>
                            </tr>
                          )
                        )
                      )}

                      {tasks.every(
                        (task) =>
                          !task.materials ||
                          task.materials.length === 0
                      ) && (
                        <tr>
                          <td
                            colSpan="3"
                            className="no-data"
                          >
                            No material requirements found.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {/* ================= CLIENTS ================= */}

          {page === "clients" && (
            <>
              <div className="page-heading">
                <div>
                  <span className="eyebrow">CLIENT MANAGEMENT</span>
                  <h1>Clients</h1>
                  <p>Manage construction project clients.</p>
                </div>

                <button
                  className="primary-button"
                  onClick={() => {
                    if (showClientForm) {
                      resetClientForm();
                    } else {
                      setEditingClient(null);
                      setClientName("");
                      setClientPhone("");
                      setClientEmail("");
                      setShowClientForm(true);
                    }
                  }}
                >
                  {showClientForm ? "✕ Close Form" : "+ Add Client"}
                </button>
              </div>

              {showClientForm && (
                <form className="form-card" onSubmit={saveClient}>
                  <div className="form-header">
                    <div>
                      <span className="eyebrow">CLIENT DETAILS</span>
                      <h3>
                        {editingClient
                          ? "Edit Client"
                          : "Add New Client"}
                      </h3>
                    </div>
                  </div>

                  <div className="form-grid">

                    <div className="field">
                      <label>Name</label>
                      <input
                        value={clientName}
                        onChange={(e) =>
                          setClientName(e.target.value)
                        }
                        placeholder="Client name"
                        required
                      />
                    </div>

                    <div className="field">
                      <label>Phone</label>
                      <input
                        value={clientPhone}
                        onChange={(e) =>
                          setClientPhone(e.target.value)
                        }
                        placeholder="Phone number"
                      />
                    </div>

                    <div className="field">
                      <label>Email</label>
                      <input
                        type="email"
                        value={clientEmail}
                        onChange={(e) =>
                          setClientEmail(e.target.value)
                        }
                        placeholder="Email address"
                      />
                    </div>

                  </div>

                  <div className="form-actions">
                    <button
                      type="submit"
                      className="primary-button"
                    >
                      {editingClient
                        ? "Update Client"
                        : "Save Client"}
                    </button>

                    <button
                      type="button"
                      className="cancel-button"
                      onClick={resetClientForm}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}

              <div className="table-card">
                <div className="table-header">
                  <div>
                    <h3>All Clients</h3>
                    <span>{clients.length} registered</span>
                  </div>
                </div>

                <div className="table-wrapper">
                  <table>
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th>Projects</th>
                        <th>Actions</th>
                      </tr>
                    </thead>

                    <tbody>
                      {clients.map((client) => (
                        <tr key={client.clientId}>
                          <td>
                            <span className="id-badge">
                              #{client.clientId}
                            </span>
                          </td>

                          <td>
                            <strong>{client.name}</strong>
                          </td>

                          <td>{client.phone || "-"}</td>
                          <td>{client.email || "-"}</td>

                          <td>
                            <span className="count-badge">
                              {client.projects?.length || 0}
                            </span>
                          </td>

                          <td>
                            <div className="action-buttons">
                              <button
                                className="edit-button"
                                onClick={() =>
                                  editClient(client)
                                }
                              >
                                Edit
                              </button>

                              <button
                                className="delete-button"
                                onClick={() =>
                                  deleteClient(
                                    client.clientId
                                  )
                                }
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}

                      {clients.length === 0 && (
                        <tr>
                          <td
                            colSpan="6"
                            className="no-data"
                          >
                            No clients found.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {/* ================= MANAGERS ================= */}

          {page === "managers" && (
            <>
              <div className="page-heading">
                <div>
                  <span className="eyebrow">TEAM MANAGEMENT</span>
                  <h1>Managers</h1>
                  <p>Manage project managers and their specialties.</p>
                </div>

                <button
                  className="primary-button"
                  onClick={() => {
                    if (showManagerForm) {
                      resetManagerForm();
                    } else {
                      setEditingManagerId(null);
                      setManagerName("");
                      setManagerSpeciality("");
                      setManagerEmail("");
                      setShowManagerForm(true);
                    }
                  }}
                >
                  {showManagerForm
                    ? "✕ Close Form"
                    : "+ Add Manager"}
                </button>
              </div>

              {showManagerForm && (
                <form className="form-card" onSubmit={saveManager}>
                  <div className="form-header">
                    <div>
                      <span className="eyebrow">MANAGER DETAILS</span>
                      <h3>
                        {editingManagerId
                          ? "Edit Manager"
                          : "Add New Manager"}
                      </h3>
                    </div>
                  </div>

                  <div className="form-grid">

                    <div className="field">
                      <label>Name</label>
                      <input
                        value={managerName}
                        onChange={(e) =>
                          setManagerName(e.target.value)
                        }
                        placeholder="Manager name"
                        required
                      />
                    </div>

                    <div className="field">
                      <label>Speciality</label>
                      <input
                        value={managerSpeciality}
                        onChange={(e) =>
                          setManagerSpeciality(e.target.value)
                        }
                        placeholder="e.g. Civil Engineering"
                      />
                    </div>

                    <div className="field">
                      <label>Email</label>
                      <input
                        type="email"
                        value={managerEmail}
                        onChange={(e) =>
                          setManagerEmail(e.target.value)
                        }
                        placeholder="Email address"
                      />
                    </div>

                  </div>

                  <div className="form-actions">
                    <button
                      type="submit"
                      className="primary-button"
                    >
                      {editingManagerId
                        ? "Update Manager"
                        : "Add Manager"}
                    </button>

                    <button
                      type="button"
                      className="cancel-button"
                      onClick={resetManagerForm}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}

              <div className="table-card">
                <div className="table-header">
                  <div>
                    <h3>All Managers</h3>
                    <span>{managers.length} registered</span>
                  </div>
                </div>

                <div className="table-wrapper">
                  <table>
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Speciality</th>
                        <th>Email</th>
                        <th>Actions</th>
                      </tr>
                    </thead>

                    <tbody>
                      {managers.map((manager) => (
                        <tr key={manager.managerId}>
                          <td>
                            <span className="id-badge">
                              #{manager.managerId}
                            </span>
                          </td>

                          <td>
                            <strong>{manager.name}</strong>
                          </td>

                          <td>
                            {manager.speciality || "-"}
                          </td>

                          <td>
                            {manager.email || "-"}
                          </td>

                          <td>
                            <div className="action-buttons">
                              <button
                                className="edit-button"
                                onClick={() =>
                                  editManager(manager)
                                }
                              >
                                Edit
                              </button>

                              <button
                                className="delete-button"
                                onClick={() =>
                                  deleteManager(
                                    manager.managerId
                                  )
                                }
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}

                      {managers.length === 0 && (
                        <tr>
                          <td
                            colSpan="5"
                            className="no-data"
                          >
                            No managers found.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}
                    {/* ================= WORKERS ================= */}

          {page === "workers" && (
            <>
              <div className="page-heading">
                <div>
                  <span className="eyebrow">WORKFORCE MANAGEMENT</span>
                  <h1>Workers</h1>
                  <p>Manage skilled workforce and hourly rates.</p>
                </div>

                <button
                  className="primary-button"
                  onClick={() => {
                    if (showWorkerForm) {
                      resetWorkerForm();
                    } else {
                      setEditingWorkerId(null);
                      setWorkerName("");
                      setWorkerHourlyRate("");
                      setShowWorkerForm(true);
                    }
                  }}
                >
                  {showWorkerForm
                    ? "✕ Close Form"
                    : "+ Add Worker"}
                </button>
              </div>

              {showWorkerForm && (
                <form className="form-card" onSubmit={saveWorker}>
                  <div className="form-header">
                    <div>
                      <span className="eyebrow">WORKER DETAILS</span>
                      <h3>
                        {editingWorkerId
                          ? "Edit Worker"
                          : "Add New Worker"}
                      </h3>
                    </div>
                  </div>

                  <div className="form-grid">

                    <div className="field">
                      <label>Name</label>
                      <input
                        value={workerName}
                        onChange={(e) =>
                          setWorkerName(e.target.value)
                        }
                        placeholder="Worker name"
                        required
                      />
                    </div>

                    <div className="field">
                      <label>Hourly Rate</label>
                      <input
                        type="number"
                        min="1"
                        value={workerHourlyRate}
                        onChange={(e) =>
                          setWorkerHourlyRate(e.target.value)
                        }
                        placeholder="Hourly rate"
                        required
                      />
                    </div>

                  </div>

                  <div className="form-actions">
                    <button
                      type="submit"
                      className="primary-button"
                    >
                      {editingWorkerId
                        ? "Update Worker"
                        : "Add Worker"}
                    </button>

                    <button
                      type="button"
                      className="cancel-button"
                      onClick={resetWorkerForm}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}

              <div className="table-card">
                <div className="table-header">
                  <div>
                    <h3>All Workers</h3>
                    <span>{workers.length} registered</span>
                  </div>
                </div>

                <div className="table-wrapper">
                  <table>
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Hourly Rate</th>
                        <th>Actions</th>
                      </tr>
                    </thead>

                    <tbody>
                      {workers.map((worker) => (
                        <tr key={worker.workerId}>
                          <td>
                            <span className="id-badge">
                              #{worker.workerId}
                            </span>
                          </td>

                          <td>
                            <strong>{worker.name}</strong>
                          </td>

                          <td className="money">
                            ₹{Number(
                              worker.hourlyRate || 0
                            ).toLocaleString("en-IN")}
                          </td>

                          <td>
                            <div className="action-buttons">
                              <button
                                className="edit-button"
                                onClick={() =>
                                  editWorker(worker)
                                }
                              >
                                Edit
                              </button>

                              <button
                                className="delete-button"
                                onClick={() =>
                                  deleteWorker(
                                    worker.workerId
                                  )
                                }
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}

                      {workers.length === 0 && (
                        <tr>
                          <td
                            colSpan="4"
                            className="no-data"
                          >
                            No workers found.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {/* ================= MATERIALS ================= */}

          {page === "materials" && (
            <>
              <div className="page-heading">
                <div>
                  <span className="eyebrow">INVENTORY MANAGEMENT</span>
                  <h1>Materials</h1>
                  <p>Manage construction materials and suppliers.</p>
                </div>

                <button
                  className="primary-button"
                  onClick={() => {
                    if (showMaterialForm) {
                      resetMaterialForm();
                    } else {
                      setEditingMaterialId(null);
                      setMaterialName("");
                      setMaterialUnitCost("");
                      setMaterialSupplierId("");
                      setShowMaterialForm(true);
                    }
                  }}
                >
                  {showMaterialForm
                    ? "✕ Close Form"
                    : "+ Add Material"}
                </button>
              </div>

              {showMaterialForm && (
                <form className="form-card" onSubmit={saveMaterial}>
                  <div className="form-header">
                    <div>
                      <span className="eyebrow">MATERIAL DETAILS</span>
                      <h3>
                        {editingMaterialId
                          ? "Edit Material"
                          : "Add New Material"}
                      </h3>
                    </div>
                  </div>

                  <div className="form-grid">

                    <div className="field">
                      <label>Material Name</label>
                      <input
                        value={materialName}
                        onChange={(e) =>
                          setMaterialName(e.target.value)
                        }
                        placeholder="Material name"
                        required
                      />
                    </div>

                    <div className="field">
                      <label>Unit Cost</label>
                      <input
                        type="number"
                        min="1"
                        value={materialUnitCost}
                        onChange={(e) =>
                          setMaterialUnitCost(e.target.value)
                        }
                        placeholder="Cost per unit"
                        required
                      />
                    </div>

                    <div className="field">
                      <label>Supplier</label>
                      <select
                        value={materialSupplierId}
                        onChange={(e) =>
                          setMaterialSupplierId(e.target.value)
                        }
                        required
                      >
                        <option value="">
                          Select Supplier
                        </option>

                        {suppliers.map((supplier) => (
                          <option
                            key={supplier.supplierId}
                            value={supplier.supplierId}
                          >
                            {supplier.supplierName}
                          </option>
                        ))}
                      </select>
                    </div>

                  </div>

                  <div className="form-actions">
                    <button
                      type="submit"
                      className="primary-button"
                    >
                      {editingMaterialId
                        ? "Update Material"
                        : "Add Material"}
                    </button>

                    <button
                      type="button"
                      className="cancel-button"
                      onClick={resetMaterialForm}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}

              <div className="table-card">
                <div className="table-header">
                  <div>
                    <h3>All Materials</h3>
                    <span>{materials.length} materials</span>
                  </div>
                </div>

                <div className="table-wrapper">
                  <table>
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Material</th>
                        <th>Unit Cost</th>
                        <th>Supplier</th>
                        <th>Actions</th>
                      </tr>
                    </thead>

                    <tbody>
                      {materials.map((material) => {
                        const supplier = suppliers.find(
                          (s) =>
                            s.supplierId ===
                            material.supplierId
                        );

                        return (
                          <tr key={material.materialId}>
                            <td>
                              <span className="id-badge">
                                #{material.materialId}
                              </span>
                            </td>

                            <td>
                              <strong>
                                {material.materialName}
                              </strong>
                            </td>

                            <td className="money">
                              {formatCurrency(
                                material.unitCost
                              )}
                            </td>

                            <td>
                              {supplier
                                ? supplier.supplierName
                                : "-"}
                            </td>

                            <td>
                              <div className="action-buttons">
                                <button
                                  className="edit-button"
                                  onClick={() =>
                                    editMaterial(material)
                                  }
                                >
                                  Edit
                                </button>

                                <button
                                  className="delete-button"
                                  onClick={() =>
                                    deleteMaterial(
                                      material.materialId
                                    )
                                  }
                                >
                                  Delete
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}

                      {materials.length === 0 && (
                        <tr>
                          <td
                            colSpan="5"
                            className="no-data"
                          >
                            No materials found.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {/* ================= SUPPLIERS ================= */}

          {page === "suppliers" && (
            <>
              <div className="page-heading">
                <div>
                  <span className="eyebrow">SUPPLY MANAGEMENT</span>
                  <h1>Suppliers</h1>
                  <p>Manage material suppliers and contacts.</p>
                </div>

                <button
                  className="primary-button"
                  onClick={() => {
                    if (showSupplierForm) {
                      resetSupplierForm();
                    } else {
                      setEditingSupplierId(null);
                      setSupplierName("");
                      setSupplierPhone("");
                      setShowSupplierForm(true);
                    }
                  }}
                >
                  {showSupplierForm
                    ? "✕ Close Form"
                    : "+ Add Supplier"}
                </button>
              </div>

              {showSupplierForm && (
                <form className="form-card" onSubmit={saveSupplier}>
                  <div className="form-header">
                    <div>
                      <span className="eyebrow">SUPPLIER DETAILS</span>
                      <h3>
                        {editingSupplierId
                          ? "Edit Supplier"
                          : "Add New Supplier"}
                      </h3>
                    </div>
                  </div>

                  <div className="form-grid">

                    <div className="field">
                      <label>Supplier Name</label>
                      <input
                        value={supplierName}
                        onChange={(e) =>
                          setSupplierName(e.target.value)
                        }
                        placeholder="Supplier name"
                        required
                      />
                    </div>

                    <div className="field">
                      <label>Phone</label>
                      <input
                        value={supplierPhone}
                        onChange={(e) =>
                          setSupplierPhone(e.target.value)
                        }
                        placeholder="Phone number"
                      />
                    </div>

                  </div>

                  <div className="form-actions">
                    <button
                      type="submit"
                      className="primary-button"
                    >
                      {editingSupplierId
                        ? "Update Supplier"
                        : "Add Supplier"}
                    </button>

                    <button
                      type="button"
                      className="cancel-button"
                      onClick={resetSupplierForm}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}

              <div className="table-card">
                <div className="table-header">
                  <div>
                    <h3>All Suppliers</h3>
                    <span>{suppliers.length} registered</span>
                  </div>
                </div>

                <div className="table-wrapper">
                  <table>
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Supplier</th>
                        <th>Phone</th>
                        <th>Actions</th>
                      </tr>
                    </thead>

                    <tbody>
                      {suppliers.map((supplier) => (
                        <tr key={supplier.supplierId}>
                          <td>
                            <span className="id-badge">
                              #{supplier.supplierId}
                            </span>
                          </td>

                          <td>
                            <strong>
                              {supplier.supplierName}
                            </strong>
                          </td>

                          <td>{supplier.phone || "-"}</td>

                          <td>
                            <div className="action-buttons">
                              <button
                                className="edit-button"
                                onClick={() =>
                                  editSupplier(supplier)
                                }
                              >
                                Edit
                              </button>

                              <button
                                className="delete-button"
                                onClick={() =>
                                  deleteSupplier(
                                    supplier.supplierId
                                  )
                                }
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}

                      {suppliers.length === 0 && (
                        <tr>
                          <td
                            colSpan="4"
                            className="no-data"
                          >
                            No suppliers found.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {/* ================= ASSIGNMENTS ================= */}

          {page === "assignments" && (
            <>
              <div className="page-heading">
                <div>
                  <span className="eyebrow">WORKFORCE ALLOCATION</span>
                  <h1>Assignments</h1>
                  <p>
                    Connect managers with their assigned workers.
                  </p>
                </div>

                <button
                  className="primary-button"
                  onClick={() => {
                    setShowAssignForm(!showAssignForm);

                    if (!showAssignForm) {
                      setAssignManagerId("");
                      setAssignWorkerId("");
                    }
                  }}
                >
                  {showAssignForm
                    ? "✕ Close Form"
                    : "+ Assign Worker"}
                </button>
              </div>

              {showAssignForm && (
                <form
                  className="form-card compact-form"
                  onSubmit={saveAssignment}
                >
                  <div className="form-grid">

                    <div className="field">
                      <label>Manager</label>
                      <select
                        value={assignManagerId}
                        onChange={(e) =>
                          setAssignManagerId(e.target.value)
                        }
                        required
                      >
                        <option value="">
                          Select Manager
                        </option>

                        {managers.map((manager) => (
                          <option
                            key={manager.managerId}
                            value={manager.managerId}
                          >
                            {manager.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="field">
                      <label>Worker</label>
                      <select
                        value={assignWorkerId}
                        onChange={(e) =>
                          setAssignWorkerId(e.target.value)
                        }
                        required
                      >
                        <option value="">
                          Select Worker
                        </option>

                        {workers.map((worker) => (
                          <option
                            key={worker.workerId}
                            value={worker.workerId}
                          >
                            {worker.name}
                          </option>
                        ))}
                      </select>
                    </div>

                  </div>

                  <div className="form-actions">
                    <button
                      type="submit"
                      className="primary-button"
                    >
                      Assign Worker
                    </button>
                  </div>
                </form>
              )}

              <div className="table-card">
                <div className="table-header">
                  <div>
                    <h3>Manager-Worker Assignments</h3>
                    <span>
                      Workforce allocation records
                    </span>
                  </div>
                </div>

                <div className="table-wrapper">
                  <table>
                    <thead>
                      <tr>
                        <th>Manager</th>
                        <th>Worker</th>
                        <th>Hourly Rate</th>
                        <th>Action</th>
                      </tr>
                    </thead>

                    <tbody>
                      {managers.flatMap((manager) =>
                        (manager.assignments || []).map(
                          (assignment) => {
                            const worker = workers.find(
                              (w) =>
                                w.workerId ===
                                assignment.workerId
                            );

                            return (
                              <tr
                                key={`${assignment.managerId}-${assignment.workerId}`}
                              >
                                <td>
                                  <strong>
                                    {manager.name}
                                  </strong>
                                </td>

                                <td>
                                  {worker?.name ||
                                    assignment.worker?.name ||
                                    "-"}
                                </td>

                                <td className="money">
                                  {worker
                                    ? formatCurrency(
                                        worker.hourlyRate
                                      )
                                    : "-"}
                                </td>

                                <td>
                                  <button
                                    className="delete-button"
                                    onClick={() =>
                                      deleteAssignment(
                                        assignment.managerId,
                                        assignment.workerId
                                      )
                                    }
                                  >
                                    Remove
                                  </button>
                                </td>
                              </tr>
                            );
                          }
                        )
                      )}

                      {managers.every(
                        (manager) =>
                          !manager.assignments ||
                          manager.assignments.length === 0
                      ) && (
                        <tr>
                          <td
                            colSpan="4"
                            className="no-data"
                          >
                            No assignments found.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

        </main>

        <footer className="footer">
          <span>
            Construction Project Manager
          </span>
          <span>
            DBMS Mini Project • Group 4
          </span>
        </footer>

      </div>
    </div>
  );
}

export default App;