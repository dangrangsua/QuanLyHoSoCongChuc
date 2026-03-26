-- MySQL dump 10.13  Distrib 8.0.45, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: quanlynhansu
-- ------------------------------------------------------
-- Server version	8.0.45

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `annual_assessment`
--

DROP TABLE IF EXISTS `annual_assessment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `annual_assessment` (
  `Assessment_ID` varchar(50) NOT NULL,
  `Issued_Date` date DEFAULT NULL,
  `On_Period` varchar(50) DEFAULT NULL,
  `Rating` varchar(50) DEFAULT NULL,
  `Employee_ID` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`Assessment_ID`),
  KEY `Employee_ID` (`Employee_ID`),
  CONSTRAINT `annual_assessment_ibfk_1` FOREIGN KEY (`Employee_ID`) REFERENCES `employee` (`Employee_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `annual_assessment`
--

LOCK TABLES `annual_assessment` WRITE;
/*!40000 ALTER TABLE `annual_assessment` DISABLE KEYS */;
INSERT INTO `annual_assessment` VALUES ('AA01','2023-12-30','2023','Xuất sắc','EMP001'),('AA02','2023-12-30','2023','Tốt','EMP002'),('AA03','2023-12-30','2023','Khá','EMP004');
/*!40000 ALTER TABLE `annual_assessment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `decision`
--

DROP TABLE IF EXISTS `decision`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `decision` (
  `Decision_ID` varchar(50) NOT NULL,
  `Effective_Date` date DEFAULT NULL,
  `Sign_Date` date DEFAULT NULL,
  `Decision_Number` varchar(50) DEFAULT NULL,
  `Decision_Type` varchar(100) DEFAULT NULL,
  `Signer` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`Decision_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `decision`
--

LOCK TABLES `decision` WRITE;
/*!40000 ALTER TABLE `decision` DISABLE KEYS */;
INSERT INTO `decision` VALUES ('DEC01','2023-01-01','2022-12-25','01/QD-NS','Tiếp nhận nhân sự','Giám đốc Nguyễn Văn A'),('DEC02','2023-06-01','2023-05-20','15/QD-NS','Bổ nhiệm chức vụ','Giám đốc Nguyễn Văn A'),('DEC03','2024-01-01','2023-12-20','05/QD-KL','Khen thưởng','Giám đốc Nguyễn Văn A'),('DEC04','2024-03-01','2024-02-28','10/QD-TL','Tăng lương','Phó Giám đốc Trần Thị B');
/*!40000 ALTER TABLE `decision` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `degree`
--

DROP TABLE IF EXISTS `degree`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `degree` (
  `D_Qualification_ID` varchar(50) NOT NULL,
  `Degree_Name` varchar(100) DEFAULT NULL,
  `Major` varchar(100) DEFAULT NULL,
  `Grade` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`D_Qualification_ID`),
  CONSTRAINT `degree_ibfk_1` FOREIGN KEY (`D_Qualification_ID`) REFERENCES `qualification` (`Qualification_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `degree`
--

LOCK TABLES `degree` WRITE;
/*!40000 ALTER TABLE `degree` DISABLE KEYS */;
INSERT INTO `degree` VALUES ('Q_DEG01','Cử nhân Đại học','Công nghệ Thông tin','Giỏi'),('Q_DEG02','Cử nhân Đại học','Quản trị Nhân sự','Khá');
/*!40000 ALTER TABLE `degree` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `department`
--

DROP TABLE IF EXISTS `department`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `department` (
  `Department_ID` varchar(50) NOT NULL,
  `Dept_Name` varchar(100) DEFAULT NULL,
  `Email` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`Department_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `department`
--

LOCK TABLES `department` WRITE;
/*!40000 ALTER TABLE `department` DISABLE KEYS */;
INSERT INTO `department` VALUES ('DEP01','Phòng Công nghệ Thông tin','it@company.vn'),('DEP02','Phòng Nhân sự','hr@company.vn'),('DEP03','Phòng Kế toán - Tài chính','finance@company.vn'),('DEP04','Phòng Kinh doanh','sales@company.vn');
/*!40000 ALTER TABLE `department` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employee`
--

DROP TABLE IF EXISTS `employee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employee` (
  `Employee_ID` varchar(50) NOT NULL,
  `First_Name` varchar(50) DEFAULT NULL,
  `Middle_Name` varchar(50) DEFAULT NULL,
  `Last_Name` varchar(50) DEFAULT NULL,
  `DOB` date DEFAULT NULL,
  `Gender` varchar(10) DEFAULT NULL,
  `Ethnicity` varchar(50) DEFAULT NULL,
  `Political_Theory` varchar(100) DEFAULT NULL,
  `Work_Status` varchar(50) DEFAULT NULL,
  `Religion` varchar(50) DEFAULT NULL,
  `ID_Card` varchar(20) DEFAULT NULL,
  `Hometown` varchar(255) DEFAULT NULL,
  `Current_Address` varchar(255) DEFAULT NULL,
  `Party_Join_Date` date DEFAULT NULL,
  `Phone` varchar(20) DEFAULT NULL,
  `Email` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`Employee_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee`
--

LOCK TABLES `employee` WRITE;
/*!40000 ALTER TABLE `employee` DISABLE KEYS */;
INSERT INTO `employee` VALUES ('EMP001','An','Bình','Nguyễn','1990-05-15','Nam','Kinh','Sơ cấp','Đang làm việc','Không','001090123456','Hà Nội','Đống Đa, Hà Nội','2015-02-03','0901234567','an.nguyen@company.vn'),('EMP002','Bảo','Ngọc','Trần','1992-08-20','Nữ','Kinh','Trung cấp','Đang làm việc','Không','079192654321','TP.HCM','Quận 1, TP.HCM',NULL,'0912345678','bao.tran@company.vn'),('EMP003','Cường','Mạnh','Lê','1985-11-10','Nam','Kinh','Cao cấp','Đang làm việc','Không','034085987654','Hải Phòng','Ngô Quyền, Hải Phòng','2010-05-19','0923456789','cuong.le@company.vn'),('EMP004','Dung','Thị','Phạm','1995-02-28','Nữ','Kinh','Chưa qua đào tạo','Đang làm việc','Phật giáo','040195112233','Nghệ An','Vinh, Nghệ An',NULL,'0934567890','dung.pham@company.vn'),('EMP005','Dương','Hải','Hoàng','1988-07-07','Nam','Tày','Sơ cấp','Nghỉ thai sản','Không','012088445566','Lạng Sơn','Cầu Giấy, Hà Nội','2018-09-02','0945678901','duong.hoang@company.vn'),('EMP006','Giang','Hương','Đặng','1993-12-12','Nữ','Kinh','Trung cấp','Đang làm việc','Không','026193778899','Bắc Ninh','Bắc Ninh, Bắc Ninh','2020-03-26','0956789012','giang.dang@company.vn'),('EMP007','Hiếu','Trọng','Bùi','1991-04-04','Nam','Kinh','Chưa qua đào tạo','Đang làm việc','Thiên Chúa giáo','030191332211','Hải Dương','Thanh Xuân, Hà Nội',NULL,'0967890123','hieu.bui@company.vn'),('EMP008','Khánh','Gia','Đỗ','1989-09-09','Nam','Kinh','Sơ cấp','Tạm hoãn','Không','015089665544','Yên Bái','Ba Đình, Hà Nội','2016-12-22','0978901234','khanh.do@company.vn'),('EMP009','Lan','Mai','Hồ','1996-01-01','Nữ','Kinh','Chưa qua đào tạo','Đang làm việc','Không','046196998877','Thừa Thiên Huế','Quận 3, TP.HCM',NULL,'0989012345','lan.ho@company.vn'),('EMP010','Minh','Nhật','Vũ','1987-06-18','Nam','Nùng','Cao cấp','Đang làm việc','Không','010087123987','Lào Cai','Bắc Từ Liêm, Hà Nội','2008-10-10','0990123456','minh.vu@company.vn'),('EMP011','Nga','Thanh','Dương','1994-10-25','Nữ','Kinh','Trung cấp','Đang làm việc','Phật giáo','044194456654','Quảng Bình','Đồng Hới, Quảng Bình','2021-05-01','0861234567','nga.duong@company.vn'),('EMP012','Phong','Thanh','Lý','1990-03-30','Nam','Kinh','Sơ cấp','Đang làm việc','Không','077090789987','Bà Rịa - Vũng Tàu','Vũng Tàu, BR-VT',NULL,'0872345678','phong.ly@company.vn'),('EMP013','Quỳnh','Như','Ngô','1997-11-11','Nữ','Kinh','Chưa qua đào tạo','Đang làm việc','Không','048197321123','Đà Nẵng','Hải Châu, Đà Nẵng',NULL,'0883456789','quynh.ngo@company.vn'),('EMP014','Sơn','Hồng','Đoàn','1986-02-14','Nam','Kinh','Trung cấp','Nghỉ ốm','Không','038086654456','Thanh Hóa','Hoàng Mai, Hà Nội','2012-07-27','0894567890','son.doan@company.vn'),('EMP015','Trâm','Bích','Trịnh','1998-08-08','Nữ','Kinh','Sơ cấp','Đang làm việc','Không','064198987789','Cần Thơ','Ninh Kiều, Cần Thơ','2022-11-20','0325678901','tram.trinh@company.vn'),('EMP016','Uyên','Thảo','Vương','1992-05-22','Nữ','Kinh','Chưa qua đào tạo','Đang làm việc','Không','075192112233','Đồng Nai','Biên Hòa, Đồng Nai',NULL,'0336789012','uyen.vuong@company.vn'),('EMP017','Việt','Quốc','Đinh','1984-09-05','Nam','Kinh','Cao cấp','Đang làm việc','Không','031084445566','Nam Định','Nam Từ Liêm, Hà Nội','2005-12-15','0347890123','viet.dinh@company.vn'),('EMP018','Xuân','Thanh','Phan','1995-12-25','Nữ','Kinh','Sơ cấp','Đang làm việc','Thiên Chúa giáo','042195778899','Hà Tĩnh','Tây Hồ, Hà Nội','2023-01-01','0358901234','xuan.phan@company.vn'),('EMP019','Yến','Kim','Trương','1991-03-08','Nữ','Hoa','Trung cấp','Đang làm việc','Phật giáo','079191332211','TP.HCM','Quận 5, TP.HCM','2019-06-15','0369012345','yen.truong@company.vn'),('EMP020','Tùng','Thanh','Mai','1999-10-10','Nam','Kinh','Chưa qua đào tạo','Thử việc','Không','001099665544','Hà Nội','Hai Bà Trưng, Hà Nội',NULL,'0370123456','tung.mai@company.vn');
/*!40000 ALTER TABLE `employee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employee_relative`
--

DROP TABLE IF EXISTS `employee_relative`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employee_relative` (
  `Employee_ID` varchar(50) NOT NULL,
  `Relative_ID` varchar(50) NOT NULL,
  `Relationship` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`Employee_ID`,`Relative_ID`),
  KEY `Relative_ID` (`Relative_ID`),
  CONSTRAINT `employee_relative_ibfk_1` FOREIGN KEY (`Employee_ID`) REFERENCES `employee` (`Employee_ID`) ON DELETE CASCADE,
  CONSTRAINT `employee_relative_ibfk_2` FOREIGN KEY (`Relative_ID`) REFERENCES `relative` (`Relative_ID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee_relative`
--

LOCK TABLES `employee_relative` WRITE;
/*!40000 ALTER TABLE `employee_relative` DISABLE KEYS */;
INSERT INTO `employee_relative` VALUES ('EMP001','REL01','Vợ'),('EMP002','REL02','Bố đẻ');
/*!40000 ALTER TABLE `employee_relative` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `insurance`
--

DROP TABLE IF EXISTS `insurance`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `insurance` (
  `Insurance_ID` varchar(50) NOT NULL,
  `Health_CardID` varchar(50) DEFAULT NULL,
  `Issued_Date` date DEFAULT NULL,
  `Expiration_Date` date DEFAULT NULL,
  `Issued_Place` varchar(100) DEFAULT NULL,
  `Employee_ID` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`Insurance_ID`),
  KEY `Employee_ID` (`Employee_ID`),
  CONSTRAINT `insurance_ibfk_1` FOREIGN KEY (`Employee_ID`) REFERENCES `employee` (`Employee_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `insurance`
--

LOCK TABLES `insurance` WRITE;
/*!40000 ALTER TABLE `insurance` DISABLE KEYS */;
INSERT INTO `insurance` VALUES ('INS01','HC123456789','2023-01-01','2024-12-31','BHXH Hà Nội','EMP001'),('INS02','HC987654321','2023-01-01','2024-12-31','BHXH TP.HCM','EMP002'),('INS03','HC456789123','2023-01-01','2024-12-31','BHXH Hà Nội','EMP003');
/*!40000 ALTER TABLE `insurance` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `position`
--

DROP TABLE IF EXISTS `position`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `position` (
  `Position_ID` varchar(50) NOT NULL,
  `Position_Level` varchar(50) DEFAULT NULL,
  `Position_Name` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`Position_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `position`
--

LOCK TABLES `position` WRITE;
/*!40000 ALTER TABLE `position` DISABLE KEYS */;
INSERT INTO `position` VALUES ('POS01','Quản lý','Trưởng phòng'),('POS02','Quản lý','Phó phòng'),('POS03','Chuyên viên','Chuyên viên Cao cấp'),('POS04','Chuyên viên','Chuyên viên'),('POS05','Nhân viên','Thực tập sinh');
/*!40000 ALTER TABLE `position` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `qualification`
--

DROP TABLE IF EXISTS `qualification`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `qualification` (
  `Qualification_ID` varchar(50) NOT NULL,
  `Issued_By` varchar(100) DEFAULT NULL,
  `Issued_Date` date DEFAULT NULL,
  `Quali_Type` varchar(50) DEFAULT NULL,
  `Employee_ID` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`Qualification_ID`),
  KEY `Employee_ID` (`Employee_ID`),
  CONSTRAINT `qualification_ibfk_1` FOREIGN KEY (`Employee_ID`) REFERENCES `employee` (`Employee_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `qualification`
--

LOCK TABLES `qualification` WRITE;
/*!40000 ALTER TABLE `qualification` DISABLE KEYS */;
INSERT INTO `qualification` VALUES ('Q_DEG01','Đại học Bách Khoa Hà Nội','2012-07-15','Bằng cấp','EMP001'),('Q_DEG02','Đại học Kinh tế Quốc dân','2014-08-20','Bằng cấp','EMP002'),('Q_TRN01','Trung tâm Đào tạo AWS','2023-05-10','Đào tạo','EMP001');
/*!40000 ALTER TABLE `qualification` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `relative`
--

DROP TABLE IF EXISTS `relative`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `relative` (
  `Relative_ID` varchar(50) NOT NULL,
  `First_Name` varchar(50) DEFAULT NULL,
  `Middle_Name` varchar(50) DEFAULT NULL,
  `Last_Name` varchar(50) DEFAULT NULL,
  `DOB` date DEFAULT NULL,
  `ID_Card` varchar(20) DEFAULT NULL,
  `Occupation` varchar(100) DEFAULT NULL,
  `Current_Address` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`Relative_ID`),
  UNIQUE KEY `ID_Card` (`ID_Card`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `relative`
--

LOCK TABLES `relative` WRITE;
/*!40000 ALTER TABLE `relative` DISABLE KEYS */;
INSERT INTO `relative` VALUES ('REL01','Hương','Thị','Lê','1992-05-10','001192123999','Giáo viên','Đống Đa, Hà Nội'),('REL02','Sơn','Thái','Trần','1965-02-15','079065432111','Nghỉ hưu','Quận 1, TP.HCM');
/*!40000 ALTER TABLE `relative` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reward_discipline`
--

DROP TABLE IF EXISTS `reward_discipline`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reward_discipline` (
  `Reward_Discipline_ID` varchar(50) NOT NULL,
  `In_Form` varchar(100) DEFAULT NULL,
  `Issued_Date` date DEFAULT NULL,
  `Which_Type` varchar(50) DEFAULT NULL,
  `Reason` text,
  `Decision_ID` varchar(50) DEFAULT NULL,
  `Employee_ID` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`Reward_Discipline_ID`),
  KEY `Decision_ID` (`Decision_ID`),
  KEY `Employee_ID` (`Employee_ID`),
  CONSTRAINT `reward_discipline_ibfk_1` FOREIGN KEY (`Decision_ID`) REFERENCES `decision` (`Decision_ID`),
  CONSTRAINT `reward_discipline_ibfk_2` FOREIGN KEY (`Employee_ID`) REFERENCES `employee` (`Employee_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reward_discipline`
--

LOCK TABLES `reward_discipline` WRITE;
/*!40000 ALTER TABLE `reward_discipline` DISABLE KEYS */;
INSERT INTO `reward_discipline` VALUES ('RD01','Bằng khen','2024-01-01','Khen thưởng','Hoàn thành xuất sắc dự án ERP','DEC03','EMP001');
/*!40000 ALTER TABLE `reward_discipline` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `salary_history`
--

DROP TABLE IF EXISTS `salary_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `salary_history` (
  `Salary_History_ID` varchar(50) NOT NULL,
  `Start_Date` date DEFAULT NULL,
  `End_Date` date DEFAULT NULL,
  `Step_ID` varchar(50) DEFAULT NULL,
  `Employee_ID` varchar(50) DEFAULT NULL,
  `Decision_ID` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`Salary_History_ID`),
  KEY `Step_ID` (`Step_ID`),
  KEY `Employee_ID` (`Employee_ID`),
  KEY `Decision_ID` (`Decision_ID`),
  CONSTRAINT `salary_history_ibfk_1` FOREIGN KEY (`Step_ID`) REFERENCES `salary_step` (`Step_ID`),
  CONSTRAINT `salary_history_ibfk_2` FOREIGN KEY (`Employee_ID`) REFERENCES `employee` (`Employee_ID`),
  CONSTRAINT `salary_history_ibfk_3` FOREIGN KEY (`Decision_ID`) REFERENCES `decision` (`Decision_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `salary_history`
--

LOCK TABLES `salary_history` WRITE;
/*!40000 ALTER TABLE `salary_history` DISABLE KEYS */;
INSERT INTO `salary_history` VALUES ('SH01','2023-01-01','2024-02-29','STEP_CV1','EMP001','DEC01'),('SH02','2024-03-01',NULL,'STEP_QL1','EMP001','DEC04'),('SH03','2023-01-01',NULL,'STEP_CV2','EMP002','DEC01');
/*!40000 ALTER TABLE `salary_history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `salary_rank`
--

DROP TABLE IF EXISTS `salary_rank`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `salary_rank` (
  `Salary_Rank_ID` varchar(50) NOT NULL,
  `Rank_Code` varchar(50) DEFAULT NULL,
  `Rank_Name` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`Salary_Rank_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `salary_rank`
--

LOCK TABLES `salary_rank` WRITE;
/*!40000 ALTER TABLE `salary_rank` DISABLE KEYS */;
INSERT INTO `salary_rank` VALUES ('SR01','QL01','Ngạch Quản lý'),('SR02','CV01','Ngạch Chuyên viên'),('SR03','NV01','Ngạch Nhân viên');
/*!40000 ALTER TABLE `salary_rank` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `salary_step`
--

DROP TABLE IF EXISTS `salary_step`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `salary_step` (
  `Step_ID` varchar(50) NOT NULL,
  `Coefficient` decimal(5,2) DEFAULT NULL,
  `Salary_Rank_ID` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`Step_ID`),
  KEY `Salary_Rank_ID` (`Salary_Rank_ID`),
  CONSTRAINT `salary_step_ibfk_1` FOREIGN KEY (`Salary_Rank_ID`) REFERENCES `salary_rank` (`Salary_Rank_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `salary_step`
--

LOCK TABLES `salary_step` WRITE;
/*!40000 ALTER TABLE `salary_step` DISABLE KEYS */;
INSERT INTO `salary_step` VALUES ('STEP_CV1',2.34,'SR02'),('STEP_CV2',2.67,'SR02'),('STEP_NV1',1.86,'SR03'),('STEP_QL1',4.00,'SR01'),('STEP_QL2',4.50,'SR01');
/*!40000 ALTER TABLE `salary_step` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `training`
--

DROP TABLE IF EXISTS `training`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `training` (
  `T_Qualification_ID` varchar(50) NOT NULL,
  `Trainning_Name` varchar(100) DEFAULT NULL,
  `Start_Date` date DEFAULT NULL,
  `End_Date` date DEFAULT NULL,
  `Location` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`T_Qualification_ID`),
  CONSTRAINT `training_ibfk_1` FOREIGN KEY (`T_Qualification_ID`) REFERENCES `qualification` (`Qualification_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `training`
--

LOCK TABLES `training` WRITE;
/*!40000 ALTER TABLE `training` DISABLE KEYS */;
INSERT INTO `training` VALUES ('Q_TRN01','AWS Certified Solutions Architect','2023-04-01','2023-05-01','Học trực tuyến');
/*!40000 ALTER TABLE `training` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `workhistory`
--

DROP TABLE IF EXISTS `workhistory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `workhistory` (
  `WorkHistory_ID` varchar(50) NOT NULL,
  `Start_Date` date DEFAULT NULL,
  `End_Date` date DEFAULT NULL,
  `Employee_ID` varchar(50) DEFAULT NULL,
  `Department_ID` varchar(50) DEFAULT NULL,
  `Decision_ID` varchar(50) DEFAULT NULL,
  `Position_ID` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`WorkHistory_ID`),
  KEY `Employee_ID` (`Employee_ID`),
  KEY `Department_ID` (`Department_ID`),
  KEY `Decision_ID` (`Decision_ID`),
  KEY `Position_ID` (`Position_ID`),
  CONSTRAINT `workhistory_ibfk_1` FOREIGN KEY (`Employee_ID`) REFERENCES `employee` (`Employee_ID`),
  CONSTRAINT `workhistory_ibfk_2` FOREIGN KEY (`Department_ID`) REFERENCES `department` (`Department_ID`),
  CONSTRAINT `workhistory_ibfk_3` FOREIGN KEY (`Decision_ID`) REFERENCES `decision` (`Decision_ID`),
  CONSTRAINT `workhistory_ibfk_4` FOREIGN KEY (`Position_ID`) REFERENCES `position` (`Position_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `workhistory`
--

LOCK TABLES `workhistory` WRITE;
/*!40000 ALTER TABLE `workhistory` DISABLE KEYS */;
INSERT INTO `workhistory` VALUES ('WH01','2023-01-01','2023-05-31','EMP001','DEP01','DEC01','POS04'),('WH02','2023-06-01',NULL,'EMP001','DEP01','DEC02','POS01'),('WH03','2023-01-01',NULL,'EMP002','DEP02','DEC01','POS03'),('WH04','2024-01-01',NULL,'EMP020','DEP04','DEC01','POS05');
/*!40000 ALTER TABLE `workhistory` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-03-26 23:56:17
