CREATE database quanlynhansu;

USE quanlynhansu;

CREATE TABLE Employee (
    Employee_ID VARCHAR(50) PRIMARY KEY,
    First_Name VARCHAR(50),
    Middle_Name VARCHAR(50),
    Last_Name VARCHAR(50),
    DOB DATE,
    Gender VARCHAR(10),
    Ethnicity VARCHAR(50),
    Political_Theory VARCHAR(100),
    Work_Status VARCHAR(50),
    Religion VARCHAR(50),
    ID_Card VARCHAR(20),
    Hometown VARCHAR(255),
    Current_Address VARCHAR(255),
    Party_Join_Date DATE,
    Phone VARCHAR(20),
    Email VARCHAR(100)
);

CREATE TABLE Department (
    Department_ID VARCHAR(50) PRIMARY KEY,
    Dept_Name VARCHAR(100),
    Email VARCHAR(100)
);

CREATE TABLE Position (
    Position_ID VARCHAR(50) PRIMARY KEY,
    Position_Level VARCHAR(50),
    Position_Name VARCHAR(100)
);

CREATE TABLE Decision (
    Decision_ID VARCHAR(50) PRIMARY KEY,
    Effective_Date DATE,
    Sign_Date DATE,
    Decision_Number VARCHAR(50),
    Decision_Type VARCHAR(100),
    Signer VARCHAR(100)
);

CREATE TABLE Salary_Rank (
    Salary_Rank_ID VARCHAR(50) PRIMARY KEY,
    Rank_Code VARCHAR(50),
    Rank_Name VARCHAR(100)
);

CREATE TABLE Insurance (
    Insurance_ID VARCHAR(50) PRIMARY KEY,
    Health_CardID VARCHAR(50),
    Issued_Date DATE,
    Expiration_Date DATE,
    Issued_Place VARCHAR(100),
    Employee_ID VARCHAR(50),
    FOREIGN KEY (Employee_ID) REFERENCES Employee(Employee_ID)
);

CREATE TABLE Annual_Assessment (
    Assessment_ID VARCHAR(50) PRIMARY KEY,
    Issued_Date DATE,
    On_Period VARCHAR(50),
    Rating VARCHAR(50),
    Employee_ID VARCHAR(50),
    FOREIGN KEY (Employee_ID) REFERENCES Employee(Employee_ID)
);

CREATE TABLE Qualification (
    Qualification_ID VARCHAR(50) PRIMARY KEY,
    Issued_By VARCHAR(100),
    Issued_Date DATE,
    Quali_Type VARCHAR(50),
    Employee_ID VARCHAR(50),
    FOREIGN KEY (Employee_ID) REFERENCES Employee(Employee_ID)
);

CREATE TABLE Relative (
    Relative_ID VARCHAR(50) PRIMARY KEY,
    First_Name VARCHAR(50),
    Middle_Name VARCHAR(50),
    Last_Name VARCHAR(50),
    DOB DATE,
    ID_Card VARCHAR(20) UNIQUE,
    Occupation VARCHAR(100),
    Current_Address VARCHAR(255)
);

CREATE TABLE Employee_Relative (
    Employee_ID VARCHAR(50),
    Relative_ID VARCHAR(50),
    Relationship VARCHAR(50),
    PRIMARY KEY (Employee_ID, Relative_ID),
    FOREIGN KEY (Employee_ID) REFERENCES Employee(Employee_ID) ON DELETE CASCADE,
    FOREIGN KEY (Relative_ID) REFERENCES Relative(Relative_ID) ON DELETE CASCADE
);

CREATE TABLE Salary_Step (
    Step_ID VARCHAR(50) PRIMARY KEY,
    Coefficient DECIMAL(5, 2),
    Salary_Rank_ID VARCHAR(50),
    FOREIGN KEY (Salary_Rank_ID) REFERENCES Salary_Rank(Salary_Rank_ID)
);

CREATE TABLE Reward_Discipline (
    Reward_Discipline_ID VARCHAR(50) PRIMARY KEY,
    In_Form VARCHAR(100),
    Issued_Date DATE,
    Which_Type VARCHAR(50),
    Reason TEXT,
    Decision_ID VARCHAR(50),
    Employee_ID VARCHAR(50),
    FOREIGN KEY (Decision_ID) REFERENCES Decision(Decision_ID),
    FOREIGN KEY (Employee_ID) REFERENCES Employee(Employee_ID)
);

CREATE TABLE Degree (
    D_Qualification_ID VARCHAR(50) PRIMARY KEY,
    Degree_Name VARCHAR(100),
    Major VARCHAR(100),
    Grade VARCHAR(50),
    FOREIGN KEY (D_Qualification_ID) REFERENCES Qualification(Qualification_ID)
);

CREATE TABLE Training (
    T_Qualification_ID VARCHAR(50) PRIMARY KEY,
    Trainning_Name VARCHAR(100),
    Start_Date DATE,
    End_Date DATE,
    Location VARCHAR(255),
    FOREIGN KEY (T_Qualification_ID) REFERENCES Qualification(Qualification_ID)
);

CREATE TABLE WorkHistory (
    WorkHistory_ID VARCHAR(50) PRIMARY KEY,
    Start_Date DATE,
    End_Date DATE,
    Employee_ID VARCHAR(50),
    Department_ID VARCHAR(50),
    Decision_ID VARCHAR(50),
    Position_ID VARCHAR(50),
    FOREIGN KEY (Employee_ID) REFERENCES Employee(Employee_ID),
    FOREIGN KEY (Department_ID) REFERENCES Department(Department_ID),
    FOREIGN KEY (Decision_ID) REFERENCES Decision(Decision_ID),
    FOREIGN KEY (Position_ID) REFERENCES Position (Position_ID)
);

CREATE TABLE Salary_History (
    Salary_History_ID VARCHAR(50) PRIMARY KEY,
    Start_Date DATE,
    End_Date DATE,
    Step_ID VARCHAR(50),
    Employee_ID VARCHAR(50),
    Decision_ID VARCHAR(50),
    FOREIGN KEY (Step_ID) REFERENCES Salary_Step(Step_ID),
    FOREIGN KEY (Employee_ID) REFERENCES Employee(Employee_ID),
    FOREIGN KEY (Decision_ID) REFERENCES Decision(Decision_ID)
);
