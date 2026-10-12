-- 1. Client Table
CREATE TABLE Client (
Client_id INT PRIMARY KEY,
Name VARCHAR(100) NOT NULL,
Phone VARCHAR(20),
Email VARCHAR(100)
);
-- 2. Supplier Table
CREATE TABLE Supplier (
SupplierID INT PRIMARY KEY,
SupplierName VARCHAR(100) NOT NULL,
Phone VARCHAR(20)
);
-- 3. Manager Table
CREATE TABLE Manager (
Managerid INT PRIMARY KEY,
Name VARCHAR(100) NOT NULL,
Speciality VARCHAR(100),
Email VARCHAR(100)
);
-- 4. Worker Table
CREATE TABLE Worker (
WorkerID INT PRIMARY KEY,
Name VARCHAR(100) NOT NULL
HourlyRate DECIMAL(10, 2)
);
-- 5. Project Table (Linked to Client and supervised by Manager)
CREATE TABLE Project (
Project_id INT PRIMARY KEY,
ProjectName VARCHAR(100) NOT NULL,
Budget DECIMAL(15, 2),
Client_id INT,
Managerid INT,
FOREIGN KEY (Client_id) REFERENCES Client(Client_id),
FOREIGN KEY (Managerid) REFERENCES Manager(Managerid)
);
-- 6. Task Table (Linked to Project and Manager)
CREATE TABLE Task (
Task_id INT PRIMARY KEY,
Task_name VARCHAR(100) NOT NULL,
ProjectID INT,
Status VARCHAR(50),
Managerid INT,
FOREIGN KEY (ProjectID) REFERENCES Project(Project_id),
FOREIGN KEY (Managerid) REFERENCES Manager(Managerid)
);
-- 7. Material Table (Supplied by Supplier)
CREATE TABLE Material (
MaterialID INT PRIMARY KEY,
MaterialName VARCHAR(100) NOT NULL,
UnitCost DECIMAL(10, 2),
SupplierID INT,
FOREIGN KEY (SupplierID) REFERENCES Supplier(SupplierID)
);
-- 8. Assigns Relationship Table (Manager assigns Workers)
CREATE TABLE Assigns (
Managerid INT,
WorkerID INT,
PRIMARY KEY (Managerid, WorkerID),
FOREIGN KEY (Managerid) REFERENCES Manager(Managerid),
FOREIGN KEY (WorkerID) REFERENCES Worker(WorkerID)
);
-- 9. Requires Relationship Table (Task requires Material)
CREATE TABLE Requires (
Task_id INT,
MaterialID INT,
PRIMARY KEY (Task_id, MaterialID)
FOREIGN KEY (Task_id) REFERENCES Task(Task_id),
FOREIGN KEY (MaterialID) REFERENCES Material(MaterialID)
);
INSERT INTO Client VALUES
(1, 'Aarav Sharma', '9876543210', 'aarav@gmail.com'),
(2, 'Riya Patel', '9876543211', 'riya@gmail.com'),
(3, 'Rohan Mehta', '9876543212', 'rohan@gmail.com'),
(4, 'Sneha Desai', '9876543213', 'sneha@gmail.com'),
(5, 'Aditya Joshi', '9876543214', 'aditya@gmail.com');
INSERT INTO Supplier VALUES
(1, 'ABC Cement Suppliers', '9876500010'),
(2, 'Steel World', '9876500011'),
(3, 'BuildMart', '9876500012'),
(4, 'Wood House', '9876500013'),
(5, 'Paint Plus', '9876500014');
INSERT INTO Manager VALUES
(1, 'Raj Sharma', 'Civil Engineering', 'raj@company.com'),
(2, 'Pooja Patil', 'Construction', 'pooja@company.com'),
(3, 'Amit Shah', 'Structural Engineering', 'amit@company.com'),
(4, 'Neha Joshi', 'Project Management', 'neha@company.com'),
(5, 'Vikram Singh', 'Civil Engineering', 'vikram@company.com');
INSERT INTO Worker VALUES
(1, 'Rahul Kumar', 500.00),
(2, 'Suresh Patil', 450.00),
(3, 'Akash Sharma', 600.00),
(4, 'Manoj Singh', 550.00),
(5, 'Kiran Joshi', 480.00),
(6, 'Ramesh More', 520.00);
INSERT INTO Project VALUES
(1, 'Skyline Apartments', 5000000.00, 1, 1),
(2, 'Green Valley Mall', 8000000.00, 2, 2),
(3, 'City Hospital', 12000000.00, 3, 3),
(4, 'Tech Park Building', 7000000.00, 4, 4),
(5, 'Residential Complex', 4500000.00, 5, 5);
INSERT INTO Task VALUES
(1, 'Foundation Work', 1, 'Completed', 1),
(2, 'Building Structure', 1, 'In Progress', 1),
(3, 'Electrical Work', 2, 'In Progress', 2),
(4, 'Plumbing Work', 3, 'Pending', 3),
(5, 'Painting Work', 4, 'Completed', 4),
(6, 'Flooring Work', 5, 'Pending', 5);
INSERT INTO Material VALUES
(1, 'Cement', 450.00, 1),
(2, 'Steel', 65000.00, 2),
(3, 'Bricks', 8.00, 3),
(4, 'Wood', 1200.00, 4),
(5, 'Paint', 350.00, 5);
INSERT INTO Assigns VALUES
(1, 1),
(1, 2),
(2, 3),
(2, 4),
(3, 5),
(4, 6);
INSERT INTO Requires VALUES
(1, 1),
(1, 2),
(2, 2),
(3, 3),
(4, 4),
(5, 5),
(6, 4);