# 🏗️ Construction Project Manager

A DBMS mini project for managing construction projects, clients, managers, workers, tasks, materials and suppliers. It pairs a relational database design (with SQL queries, joins, views and normalization) with a full-stack web application.

**Group 4 | Batch C4**

| 1 | Nidhi Shah  2025300219 
| 2 | Ashika Shahdadpuri  2025300225 
| 3 | Pranav Sawant  2025300211 

---

🌐 **Live Link:** https://frontend-production-6c8e.up.railway.app

---

## 📌 Features

- Manage clients, project managers, workers and suppliers
- Create projects with budgets, linked to a client and a manager
- Track tasks per project with status (Pending / In Progress / Completed)
- Maintain materials with unit cost and supplier details
- Assign workers to managers
- Map the materials required for each task
- Reports and analytics using aggregates, joins, subqueries and views

---

## 🛠️ Tech Stack

| Database | MySQL |
| Backend | Node.js, Express.js, Prisma ORM |
| Frontend | Vite + JavaScript/React |
| Tools | MySQL Workbench, VS Code, Git |

---

## 🗄️ Database Design

### Entities

| Table | Columns |
|-------|---------|
| **Client** | Client_id (PK), Name, Phone, Email |
| **Supplier** | SupplierID (PK), SupplierName, Phone |
| **Manager** | Managerid (PK), Name, Speciality, Email |
| **Worker** | WorkerID (PK), Name, HourlyRate |
| **Project** | Project_id (PK), ProjectName, Budget, Client_id (FK), Managerid (FK) |
| **Task** | Task_id (PK), Task_name, ProjectID (FK), Status, Managerid (FK) |
| **Material** | MaterialID (PK), MaterialName, UnitCost, SupplierID (FK) |
| **Assigns** | (Managerid, WorkerID) composite PK, both FKs |
| **Requires** | (Task_id, MaterialID) composite PK, both FKs |

### Relationships

- A **Client** can have many **Projects**
- A **Manager** manages many **Projects** and **Tasks**
- A **Project** has many **Tasks**
- A **Supplier** supplies many **Materials**
- **Manager ↔ Worker** is many-to-many via `Assigns`
- **Task ↔ Material** is many-to-many via `Requires`

---

## 📐 Normalization

- **1NF:** All columns hold atomic values, there are no repeating groups, and every row is identified by a primary key.
- **2NF:** There are no partial dependencies. The `Assigns` and `Requires` tables use composite keys and store only the relationship.
- **3NF:** There are no transitive dependencies. Manager and supplier details are stored in their own tables and referenced only by foreign keys.

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v20.19 or above
- A MySQL database (local MySQL server or a hosted one such as Railway)
- Git

### 1. Clone the repository

```bash
git clone https://github.com/ashika-shahdadpuri-25/construction-management.git
cd construction-management
```

### 2. Set up the backend

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` folder:

```env
DATABASE_URL="mysql://<user>:<password>@<host>:3306/<database_name>"
```

For a local MySQL server, this looks like:

```env
DATABASE_URL="mysql://root:yourpassword@localhost:3306/ConstructionProjectManager"
```

Optional variables:

| Variable       | Description                           | Default                 |
|----------------|---------------------------------------|-------------------------|
| `PORT`         | Port the backend runs on              | `5000`                  |
| `FRONTEND_URL` | Extra frontend origin allowed by CORS | none                    |

Create the tables from the Prisma schema and generate the Prisma client:

```bash
npx prisma generate
npx prisma db push
```

(Optional) Load the sample data:

```bash
node seed.js
```

Start the backend server:

```bash
# development (auto-restart with nodemon)
npm run dev

# or production (generates client, syncs schema, starts server)
npm start
```

The API runs at `http://localhost:5000`. Open it in a browser to see the message "Construction Project Manager API is running".

### 3. Set up the frontend

Open a new terminal:

```bash
cd frontend
npm install
npm run dev
```

The app will be available at `http://localhost:5173`.

By default the frontend calls the API at `http://localhost:5000`. To point it at a different backend, create `frontend/.env`:

```env
VITE_API_URL=https://your-backend-url
```

### Other frontend scripts

| Command | Description |
|---------|-------------|
| `npm run build` | Create a production build |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Lint the code with oxlint |

---

## ☁️ Deployment

The project is deployed on [Railway](https://railway.app/) with three services: MySQL database, backend API and frontend.

- Backend: set `DATABASE_URL` and `FRONTEND_URL` in the service variables
- Frontend: set `VITE_API_URL` to the deployed backend URL

---

## 🌱 Sample Data

`seed.js` populates the database with:

- 5 clients
- 5 suppliers
- 5 managers
- 6 workers
- 5 projects (Skyline Apartments, Green Valley Mall, City Hospital, Tech Park Building, Residential Complex)
- 6 tasks
- 5 materials (Cement, Steel, Bricks, Wood, Paint)
- Manager–Worker assignments and Task–Material requirements