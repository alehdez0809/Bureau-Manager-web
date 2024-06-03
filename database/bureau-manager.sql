-- MySQL dump 10.13  Distrib 8.0.32, for Win64 (x86_64)
--
-- Host: localhost    Database: bureau-manager
-- ------------------------------------------------------
-- Server version	8.0.32

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
-- Table structure for table `adeudos anteriores`
--

DROP TABLE IF EXISTS `adeudos anteriores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `adeudos anteriores` (
  `id_adeudos` int NOT NULL AUTO_INCREMENT,
  `monto_adeudos` double NOT NULL,
  PRIMARY KEY (`id_adeudos`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `adeudos anteriores`
--

LOCK TABLES `adeudos anteriores` WRITE;
/*!40000 ALTER TABLE `adeudos anteriores` DISABLE KEYS */;
/*!40000 ALTER TABLE `adeudos anteriores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `admin_cuotas`
--

DROP TABLE IF EXISTS `admin_cuotas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin_cuotas` (
  `id_admin_cuotas` int NOT NULL AUTO_INCREMENT,
  `id_condominio` int NOT NULL,
  `id_edificio` int NOT NULL,
  `cuota_base` double NOT NULL,
  `cuota_extra` double DEFAULT NULL,
  PRIMARY KEY (`id_admin_cuotas`),
  KEY `id_condominio_admin_cuotas_idx` (`id_condominio`),
  KEY `id_edificio_admin_cuotas_idx` (`id_edificio`),
  CONSTRAINT `id_condominio_admin_cuotas` FOREIGN KEY (`id_condominio`) REFERENCES `condominio` (`id_condominio`),
  CONSTRAINT `id_edificio_admin_cuotas` FOREIGN KEY (`id_edificio`) REFERENCES `edificio` (`id_edificio`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin_cuotas`
--

LOCK TABLES `admin_cuotas` WRITE;
/*!40000 ALTER TABLE `admin_cuotas` DISABLE KEYS */;
INSERT INTO `admin_cuotas` VALUES (5,13,16,550,600),(6,13,21,700,800),(7,17,20,600,800);
/*!40000 ALTER TABLE `admin_cuotas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `administrador`
--

DROP TABLE IF EXISTS `administrador`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `administrador` (
  `id_administrador` int NOT NULL AUTO_INCREMENT,
  `nombre_administrador` varchar(30) NOT NULL,
  `apellido_paterno_administrador` varchar(30) NOT NULL,
  `apellido_materno_administrador` varchar(30) NOT NULL,
  `correo_administrador` varchar(45) NOT NULL,
  `contraseña_administrador` varchar(100) NOT NULL,
  PRIMARY KEY (`id_administrador`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `administrador`
--

LOCK TABLES `administrador` WRITE;
/*!40000 ALTER TABLE `administrador` DISABLE KEYS */;
INSERT INTO `administrador` VALUES (10,'Alejandra','Hernandez','Quinones','alesitahq@gmail.com','$2b$10$QZ6wNguGcOuYcDOjaKrB7uLBem8ablOBLnU8dXrZM.cEfYAVye5Da'),(11,'Emmanuel','Villarruel','Morales','villarruelmoralese@gmail.com','$2b$10$YvEr1B4pzdC3oxGh.ergieYSOD1i/VckjkGcSQUi59/D4/Mmh3Uam'),(12,'Alejandra','Hernandez','Quinones','ale@gmail.com','$2b$10$4YM7szHe08NWDVfSwV.Qfe6rczrAknqwhUzEhY0cnTxiacqGKBJOa');
/*!40000 ALTER TABLE `administrador` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `concepto de pago`
--

DROP TABLE IF EXISTS `concepto de pago`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `concepto de pago` (
  `id_concepto` int NOT NULL AUTO_INCREMENT,
  `descripcion_concepto` varchar(45) NOT NULL,
  PRIMARY KEY (`id_concepto`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `concepto de pago`
--

LOCK TABLES `concepto de pago` WRITE;
/*!40000 ALTER TABLE `concepto de pago` DISABLE KEYS */;
/*!40000 ALTER TABLE `concepto de pago` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `condominio`
--

DROP TABLE IF EXISTS `condominio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `condominio` (
  `id_condominio` int NOT NULL AUTO_INCREMENT,
  `nombre_condominio` varchar(45) NOT NULL,
  `direccion_condominio` varchar(100) NOT NULL,
  `admin_condominio` varchar(50) NOT NULL,
  `id_administrador` int NOT NULL,
  PRIMARY KEY (`id_condominio`),
  KEY `id_administrador_idx` (`id_administrador`),
  CONSTRAINT `id_administrador` FOREIGN KEY (`id_administrador`) REFERENCES `administrador` (`id_administrador`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `condominio`
--

LOCK TABLES `condominio` WRITE;
/*!40000 ALTER TABLE `condominio` DISABLE KEYS */;
INSERT INTO `condominio` VALUES (13,'Fuentes de Azcapotzalco','Av. Aquiles Serdán, No. 464, Col. Ángel Zimbrón, Azcapotzalco, CDMX','EDITH ROGELIA QUIÑONES BONILLA',10),(14,'Tlalpan','Calz De Tlalpan 2490 - 1, Avante, Coyoacan, C.p 04460, Df C.P 04460,','MÓNICA BERNAL MORALES',10),(15,'Cafetales','Xochimilco, 109','MÓNICA BERNAL MORALES',10),(16,'Rio Neva','Rio Neva 37','MÓNICA BERNAL MORALES',10),(17,'Simón Bolívar','Calle Simón Bolívar No. 820, Colonia Álamos, Alcaldía Benito Juárez, C.P. 03400, CDMX','EDITH ROGELIA QUIÑONES BONILLA',10);
/*!40000 ALTER TABLE `condominio` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cuota de fondo de reserva`
--

DROP TABLE IF EXISTS `cuota de fondo de reserva`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cuota de fondo de reserva` (
  `id_reserva` int NOT NULL AUTO_INCREMENT,
  `monto_reserva` double NOT NULL,
  `descripcion_reserva` varchar(45) NOT NULL,
  PRIMARY KEY (`id_reserva`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cuota de fondo de reserva`
--

LOCK TABLES `cuota de fondo de reserva` WRITE;
/*!40000 ALTER TABLE `cuota de fondo de reserva` DISABLE KEYS */;
/*!40000 ALTER TABLE `cuota de fondo de reserva` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cuota de penalización`
--

DROP TABLE IF EXISTS `cuota de penalización`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cuota de penalización` (
  `id_penalizacion` int NOT NULL AUTO_INCREMENT,
  `monto_penalizacion` double NOT NULL,
  PRIMARY KEY (`id_penalizacion`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cuota de penalización`
--

LOCK TABLES `cuota de penalización` WRITE;
/*!40000 ALTER TABLE `cuota de penalización` DISABLE KEYS */;
/*!40000 ALTER TABLE `cuota de penalización` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cuota extraordinaria`
--

DROP TABLE IF EXISTS `cuota extraordinaria`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cuota extraordinaria` (
  `id_extraordinaria` int NOT NULL AUTO_INCREMENT,
  `monto_extraordinaria` double NOT NULL,
  `descrpicion_extraordinaria` varchar(45) NOT NULL,
  PRIMARY KEY (`id_extraordinaria`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cuota extraordinaria`
--

LOCK TABLES `cuota extraordinaria` WRITE;
/*!40000 ALTER TABLE `cuota extraordinaria` DISABLE KEYS */;
/*!40000 ALTER TABLE `cuota extraordinaria` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cuota ordinaria`
--

DROP TABLE IF EXISTS `cuota ordinaria`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cuota ordinaria` (
  `id_ordinaria` int NOT NULL AUTO_INCREMENT,
  `monto_ordinaria` double NOT NULL,
  PRIMARY KEY (`id_ordinaria`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cuota ordinaria`
--

LOCK TABLES `cuota ordinaria` WRITE;
/*!40000 ALTER TABLE `cuota ordinaria` DISABLE KEYS */;
/*!40000 ALTER TABLE `cuota ordinaria` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `departamento`
--

DROP TABLE IF EXISTS `departamento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `departamento` (
  `id_departamento` int NOT NULL AUTO_INCREMENT,
  `id_edificio` int NOT NULL,
  `numero_departamento` varchar(10) NOT NULL,
  PRIMARY KEY (`id_departamento`),
  KEY `id_edificio_idx` (`id_edificio`),
  CONSTRAINT `id_edificio` FOREIGN KEY (`id_edificio`) REFERENCES `edificio` (`id_edificio`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=74 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `departamento`
--

LOCK TABLES `departamento` WRITE;
/*!40000 ALTER TABLE `departamento` DISABLE KEYS */;
INSERT INTO `departamento` VALUES (20,16,'H005'),(21,16,'H006'),(22,18,'102'),(23,19,'101'),(24,20,'A101'),(25,20,'A102'),(26,20,'A103'),(27,20,'A201'),(28,20,'A202'),(29,20,'A203'),(30,20,'A204'),(31,20,'A301'),(32,20,'A302'),(33,20,'A303'),(34,20,'A304'),(35,20,'A401'),(36,20,'A402'),(37,20,'A403'),(38,20,'A404'),(39,20,'A501'),(40,20,'A502'),(41,20,'A503'),(42,20,'A504'),(43,20,'A601'),(44,20,'A602'),(45,20,'A603'),(46,20,'A604'),(47,20,'B101'),(48,20,'B102'),(49,20,'B103'),(50,20,'B104'),(51,20,'B201'),(52,20,'B202'),(53,20,'B203'),(54,20,'B204'),(55,20,'B301'),(56,20,'B302'),(57,20,'B303'),(58,20,'B304'),(59,20,'B401'),(60,20,'B402'),(61,20,'B403'),(62,20,'B404'),(63,20,'B501'),(64,20,'B502'),(65,20,'B503'),(66,20,'B504'),(67,20,'B601'),(68,20,'B602'),(70,20,'B604'),(72,20,'B603'),(73,21,'J101');
/*!40000 ALTER TABLE `departamento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `direccion condominio`
--

DROP TABLE IF EXISTS `direccion condominio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `direccion condominio` (
  `id_direccion` int NOT NULL AUTO_INCREMENT,
  `numero_exterior_direccion` int NOT NULL,
  `calle_direccion` varchar(45) NOT NULL,
  `colonia_direccion` varchar(45) NOT NULL,
  `delegacion_direccion` varchar(45) NOT NULL,
  `cp_direccion` int NOT NULL,
  `ciudad_direccion` varchar(45) NOT NULL,
  `estado_direccion` varchar(45) NOT NULL,
  PRIMARY KEY (`id_direccion`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `direccion condominio`
--

LOCK TABLES `direccion condominio` WRITE;
/*!40000 ALTER TABLE `direccion condominio` DISABLE KEYS */;
/*!40000 ALTER TABLE `direccion condominio` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `edificio`
--

DROP TABLE IF EXISTS `edificio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `edificio` (
  `id_edificio` int NOT NULL AUTO_INCREMENT,
  `id_condominio` int NOT NULL,
  `nombre_edificio` varchar(20) NOT NULL,
  PRIMARY KEY (`id_edificio`),
  KEY `id_condominio_idx` (`id_condominio`),
  CONSTRAINT `id_condominio` FOREIGN KEY (`id_condominio`) REFERENCES `condominio` (`id_condominio`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `edificio`
--

LOCK TABLES `edificio` WRITE;
/*!40000 ALTER TABLE `edificio` DISABLE KEYS */;
INSERT INTO `edificio` VALUES (16,13,'Edificio H'),(18,16,'2'),(19,16,'1'),(20,17,'Edificio 1'),(21,13,'Edificio J');
/*!40000 ALTER TABLE `edificio` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `infopagos`
--

DROP TABLE IF EXISTS `infopagos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `infopagos` (
  `id_info_pagos` int NOT NULL AUTO_INCREMENT,
  `id_administrador` int NOT NULL,
  `id_condominio` int NOT NULL,
  `id_edificio` int NOT NULL,
  `id_inquilino` int NOT NULL,
  `no_recibo` varchar(45) DEFAULT NULL,
  `total_pagado` varchar(45) DEFAULT NULL,
  `adeudo` varchar(45) DEFAULT NULL,
  `fecha_pago` varchar(45) NOT NULL,
  PRIMARY KEY (`id_info_pagos`),
  KEY `inquilino_idx` (`id_inquilino`),
  KEY `condominio_idx` (`id_condominio`),
  KEY `edificio_idx` (`id_edificio`),
  KEY `id_administrador_info_pagos_idx` (`id_administrador`),
  CONSTRAINT `id_administrador_info_pagos` FOREIGN KEY (`id_administrador`) REFERENCES `administrador` (`id_administrador`),
  CONSTRAINT `id_condominio_info_pagos` FOREIGN KEY (`id_condominio`) REFERENCES `condominio` (`id_condominio`),
  CONSTRAINT `id_edificio_info_pagos` FOREIGN KEY (`id_edificio`) REFERENCES `edificio` (`id_edificio`),
  CONSTRAINT `id_inquilino_info_pagos` FOREIGN KEY (`id_inquilino`) REFERENCES `inquilino` (`id_inquilino`)
) ENGINE=InnoDB AUTO_INCREMENT=718 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `infopagos`
--

LOCK TABLES `infopagos` WRITE;
/*!40000 ALTER TABLE `infopagos` DISABLE KEYS */;
INSERT INTO `infopagos` VALUES (585,10,17,20,78,NULL,'0','-2200','2024-05-03'),(586,10,17,20,80,NULL,'0','84118','2024-05-03'),(587,10,17,20,83,NULL,'0','72664','2024-05-03'),(588,10,17,20,85,NULL,'0','12000','2024-05-03'),(589,10,17,20,89,NULL,'0','6020','2024-05-03'),(590,10,17,20,95,NULL,'0','5400','2024-05-03'),(591,10,17,20,96,NULL,'0','10300','2024-05-03'),(592,10,17,20,97,NULL,'0','13680','2024-05-03'),(593,10,17,20,103,NULL,'0','89475.5','2024-05-03'),(594,10,17,20,109,NULL,'0','77410','2024-05-03'),(595,10,17,20,110,NULL,'0','81200','2024-05-03'),(596,10,17,20,119,NULL,'0','55380','2024-05-03'),(630,10,17,20,78,NULL,'0','-2200','2024-05-30'),(631,10,17,20,80,NULL,'0','84118','2024-05-30'),(632,10,17,20,83,NULL,'0','72664','2024-05-30'),(633,10,17,20,85,NULL,'0','12000','2024-05-30'),(634,10,17,20,89,NULL,'0','6020','2024-05-30'),(635,10,17,20,95,NULL,'0','5400','2024-05-30'),(636,10,17,20,96,NULL,'0','10300','2024-05-30'),(637,10,17,20,97,NULL,'0','13680','2024-05-30'),(638,10,17,20,103,NULL,'0','89475.5','2024-05-30'),(639,10,17,20,109,NULL,'0','77410','2024-05-30'),(640,10,17,20,110,NULL,'0','81200','2024-05-30'),(641,10,17,20,119,NULL,'0','55380','2024-05-30'),(642,10,17,20,74,'11551-11552','650','1300.0','2024-03-08'),(643,10,17,20,75,'11543','550','5515.0','2024-03-04'),(644,10,17,20,76,'11530','650','0','2024-03-01'),(645,10,17,20,77,'11560','650','15638.0','2024-03-10'),(646,10,17,20,81,'11555','550','0','2024-03-09'),(647,10,17,20,82,'11542','650','12050.0','2024-03-04'),(648,10,17,20,84,'11541','550','0','2024-03-04'),(649,10,17,20,86,'11529','650','62436.0','2024-02-29'),(650,10,17,20,87,'11535','550','0','2024-03-02'),(651,10,17,20,88,'11547','650','6254.0','2024-03-06'),(652,10,17,20,90,'11539','650','120.0','2024-03-04'),(653,10,17,20,91,'11556','550','0','2024-03-09'),(654,10,17,20,92,'11526','550','35650.0','2024-02-29'),(655,10,17,20,93,'11561','770.06','0.0','2024-03-15'),(656,10,17,20,117,'11537','550','0','2024-04-03'),(657,10,17,20,98,'11528','650','4950.0','2024-02-29'),(658,10,17,20,99,'11532','550.35','0','2024-03-01'),(659,10,17,20,100,'11558','550','650.0','2024-03-10'),(660,10,17,20,101,'11533','300','67610.0','2024-03-01'),(661,10,17,20,102,'11548','550','16052.0','2024-03-06'),(662,10,17,20,104,'11549','550','52030.0','2024-03-07'),(663,10,17,20,106,'11546','550','0','2024-03-05'),(664,10,17,20,120,'11531','550','5000.0','2024-03-01'),(665,10,17,20,107,'11536','550','550.0','2024-03-02'),(666,10,17,20,108,'11545','550','37950.0','2024-03-05'),(667,10,17,20,112,'11527','650','41800.0','2024-02-29'),(668,10,17,20,113,'11550','550','0','2024-03-07'),(669,10,17,20,114,'11534','550','37250.0','2024-03-01'),(670,10,17,20,115,'11554','550','350.0','2024-03-08'),(671,10,17,20,116,'11553','1550','55000.0','2024-03-08'),(672,10,17,20,94,'11557','650','1300.0','2024-03-09'),(673,10,17,20,118,'11544','650','0','2024-03-05'),(674,10,17,20,75,NULL,'0','5515','2024-05-31'),(675,10,17,20,78,NULL,'0','-2750','2024-05-31'),(676,10,17,20,80,NULL,'0','83468','2024-05-31'),(677,10,17,20,83,NULL,'0','72014','2024-05-31'),(678,10,17,20,85,NULL,'0','11350','2024-05-31'),(679,10,17,20,89,NULL,'0','5250','2024-05-31'),(680,10,17,20,96,NULL,'0','9530','2024-05-31'),(681,10,17,20,97,NULL,'0','13030','2024-05-31'),(682,10,17,20,103,NULL,'0','88705.5','2024-05-31'),(683,10,17,20,105,NULL,'0','-650','2024-05-31'),(684,10,17,20,109,NULL,'0','76760','2024-05-31'),(685,10,17,20,110,NULL,'0','80550','2024-05-31'),(686,10,17,20,112,NULL,'0','41900','2024-05-31'),(687,10,17,20,119,NULL,'0','54610','2024-05-31'),(688,10,17,20,74,'11514','650','1300.0','2024-02-09'),(689,10,17,20,76,'11487','650','0','2024-02-01'),(690,10,17,20,77,'11518','650','15638.0','2024-02-10'),(691,10,17,20,81,'11511','550','0','2024-02-08'),(692,10,17,20,82,'11504','650','12050.0','2024-02-05'),(693,10,17,20,84,'11494','550','0','2024-02-01'),(694,10,17,20,86,'11483','650','62436.0','2024-01-31'),(695,10,17,20,87,'11486','550','0','2024-02-01'),(696,10,17,20,88,'11508','650','6254.0','2024-02-07'),(697,10,17,20,90,'11512','650','120.0','2024-02-08'),(698,10,17,20,92,'11493','550','35650.0','2024-02-01'),(699,10,17,20,93,'11498','650.06','0.0','2024-01-02'),(700,10,17,20,117,'11499','550','0','2024-02-02'),(701,10,17,20,98,'11485','650','5050.0','2024-01-31'),(702,10,17,20,99,'11495','550.35','0','2024-02-01'),(703,10,17,20,100,'11516','550','650.0','2024-02-10'),(704,10,17,20,101,'11497','300','67360.0','2024-01-02'),(705,10,17,20,102,'11515','550','16052.0','2024-02-09'),(706,10,17,20,104,'11505','550','52030.0','2024-02-06'),(707,10,17,20,106,'11503','550','0','2024-02-05'),(708,10,17,20,120,'11496','550','5000.0','2024-02-01'),(709,10,17,20,107,'11501','550','550.0','2024-02-03'),(710,10,17,20,108,'11506','550','37950.0','2024-02-06'),(711,10,17,20,111,'11502','550','17950.0','2024-02-04'),(712,10,17,20,113,'11507','550','0','2024-02-06'),(713,10,17,20,114,'11484','550','37250.0','2024-01-31'),(714,10,17,20,115,'11520','650','350.0','2024-02-20'),(715,10,17,20,94,'11513','650','1300.0','2024-02-09'),(716,10,17,20,118,'11509','650','0','2024-02-07'),(717,10,13,16,72,'001','450','0','2024-06-01');
/*!40000 ALTER TABLE `infopagos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `inquilino`
--

DROP TABLE IF EXISTS `inquilino`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `inquilino` (
  `id_inquilino` int NOT NULL AUTO_INCREMENT,
  `id_departamento` int NOT NULL,
  `nombre_inquilino` varchar(45) NOT NULL,
  `apellino_paterno_inquilino` varchar(45) NOT NULL,
  `apellino_materno_inquilino` varchar(45) NOT NULL,
  `correo_inquilino` varchar(45) DEFAULT NULL,
  `codigo_inquilino` varchar(45) NOT NULL,
  PRIMARY KEY (`id_inquilino`),
  KEY `id_departamento_idx` (`id_departamento`),
  CONSTRAINT `id_departamento` FOREIGN KEY (`id_departamento`) REFERENCES `departamento` (`id_departamento`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=121 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inquilino`
--

LOCK TABLES `inquilino` WRITE;
/*!40000 ALTER TABLE `inquilino` DISABLE KEYS */;
INSERT INTO `inquilino` VALUES (72,20,'Alejandra','Hernández','Quiñones','alejandrahernandeztelpuchcalli@gmail.com','n5OatFzF'),(73,21,'Ernesto Emmanuel','Villarruel','Morales',NULL,'xPDvNS7O'),(74,24,'LAURA','ZAPATA','AGUILAR','alejandrahernandeztelpuchcalli@gmail.com','Ob5aELp0'),(75,25,'AGUSTIN','DÍAZ','GORASTTIETA',NULL,'6dwSCfEk'),(76,26,'ANTONIO CARLOS','PEDROZA','FREYRE','alejandrahernandeztelpuchcalli@gmail.com','VOHMzD2m'),(77,27,'GLORIA','FABIAN','AYALA','','w2jZcRJp'),(78,28,'CARMEN','LEMUS','MADRIGAL',NULL,'XNLwIvfH'),(79,29,'LUZ MARIA','GOMEZ','JIMENEZ',NULL,'Yhw53MjT'),(80,30,'VICTOR ISRAEL','ESPINOSA','RAMIREZ',NULL,'ne3dcBQz'),(81,31,'PATRICIA','TORRES','LUGO',NULL,'HlHVhk30'),(82,32,'ERIKA PATRICIA','LARA','SÁNCHEZ',NULL,'712v9ihL'),(83,33,'ARACELI','ANGELES','N',NULL,'gVbe1XvO'),(84,34,'CLAUDIA','JIMENEZ','VAZQUEZ',NULL,'BXfJxUuU'),(85,35,'LUIS','MACIAS','VILCHIS',NULL,'8wOx6BNG'),(86,36,'SANDRA','ORTEGA','N',NULL,'c9owIzL2'),(87,37,'MARIO','CASTILLO','GARCÍA',NULL,'iUSD8QnY'),(88,38,'MARTHA','ESPINOZA','SANCHEZ',NULL,'hWWunTw9'),(89,39,'KATIA','DE LASSE','MADRAZO',NULL,'6hseKC2p'),(90,40,'IRIS A.','MORENO','CAMARA',NULL,'wa7R4Yoz'),(91,41,'PATRICIA','BALBUENA','N',NULL,'jTPVGe7d'),(92,42,'MARTHA','MALDONADO','A.',NULL,'7XZQK6mG'),(93,43,'CINTHYA','SHIBATA','ARRAZOLA',NULL,'tHEvnLlk'),(94,68,'ROBERTO','AVILA','CHAVEZ','','gYx5kjLv'),(95,45,'ZANTI','HERNÁNDEZ','DE LA VEGA',NULL,'F57q4PZF'),(96,46,'AGUSTIN','DÍAZ','GORASTIETA',NULL,'h4uvaHz1'),(97,47,'MA ELENA','VALERO','CRUZ',NULL,'e1Gxsbn3'),(98,48,'CESAR','VILLA','VELAZQUEZ',NULL,'bfjQhtCA'),(99,49,'SALVADOR','ANGELES','NEGRETE',NULL,'VDqXwW4r'),(100,50,'GLADYS','BARRIOS','VELASCO',NULL,'OwKleSld'),(101,51,'LUIS LEOPOLDO','JUAREZ','DOMINGUEZ',NULL,'0NDoiSbt'),(102,52,'JOSE MANUEL','SANCHEZ','DOMINGUEZ',NULL,'9UqnG106'),(103,53,'ALMA','ANGELICA','ROSALES',NULL,'BHanNrbh'),(104,54,'PAOLA','CORDOVA','FUENTES','alejandrahernandeztelpuchcalli@gmail.com','Xj9ENiSx'),(105,55,'JUDITH','OLEA','MARTINEZ',NULL,'fRPgMyHU'),(106,56,'ADRIANA','ZÁRATE','MORALES',NULL,'CIXwSVs1'),(107,58,'YESSICA','HERNANDEZ','N',NULL,'1qyhiiCE'),(108,59,'ANA MARIA','LOPEZ','RAMIREZ',NULL,'5LLfrPM6'),(109,60,'SANDRA','ROSALES','GARCIA',NULL,'ENXDtJsU'),(110,61,'EVA','MEJIA','CERVANTES',NULL,'xvJHqwZl'),(111,62,'SELENE','JIMENEZ','RODRIGUEZ',NULL,'xbKuVfwC'),(112,63,'JUANA','HERNANDEZ','SANCHEZ',NULL,'jYEfcET2'),(113,64,'ANA FABIOLA','OBANDO','MARQUEZ',NULL,'c5MLDzaH'),(114,65,'DAVID','HERNANDEZ','N',NULL,'sELWZg0N'),(115,66,'MARIBEL','VIVAR','N',NULL,'YdXgK91f'),(116,67,'ALICIA','TOPETE','CAMPOS',NULL,'oLYFIW4C'),(117,44,'FERNANDO ISRAEL','MADRID','CHARTT',NULL,'rmt6nOHB'),(118,72,'GREGORIO EDUARDO','GARCIA','ZARCO',NULL,'6DZBjcQL'),(119,70,'MARTHA MERCEDES','TIRADO','JUAREZ',NULL,'LXWOTZqC'),(120,57,'MA ELENA','VAZQUEZ','SANCHEZ',NULL,'PlW4hH1k');
/*!40000 ALTER TABLE `inquilino` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `recibocompleto`
--

DROP TABLE IF EXISTS `recibocompleto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `recibocompleto` (
  `id_recibo` int NOT NULL AUTO_INCREMENT,
  `id_condominio` int NOT NULL,
  `id_edificio` int NOT NULL,
  `id_departamento` int NOT NULL,
  `id_inquilino` int NOT NULL,
  `nombre_completo_inquilino` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `fecha` varchar(10) NOT NULL,
  `fecha_formateada` varchar(20) NOT NULL,
  `mes_pago` varchar(45) NOT NULL,
  `no_recibo` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `concepto_pago` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `cuota_ordinaria` varchar(100) NOT NULL,
  `cuota_penalizacion` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `cuota_extraordinaria` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `cuota_reserva` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `cuota_adeudos` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `total_pagar` varchar(15) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `total_pagar_letra` varchar(60) NOT NULL,
  `id_administrador` int NOT NULL,
  PRIMARY KEY (`id_recibo`),
  KEY `id_condominio_idx` (`id_condominio`),
  KEY `id_departamento_idx` (`id_departamento`),
  KEY `id_inquilino_idx` (`id_inquilino`),
  KEY `administrador_idx` (`id_administrador`),
  KEY `edificio_idx` (`id_edificio`),
  CONSTRAINT `administrador` FOREIGN KEY (`id_administrador`) REFERENCES `administrador` (`id_administrador`),
  CONSTRAINT `condominio` FOREIGN KEY (`id_condominio`) REFERENCES `condominio` (`id_condominio`) ON UPDATE CASCADE,
  CONSTRAINT `departamento` FOREIGN KEY (`id_departamento`) REFERENCES `departamento` (`id_departamento`) ON UPDATE CASCADE,
  CONSTRAINT `edificio` FOREIGN KEY (`id_edificio`) REFERENCES `edificio` (`id_edificio`),
  CONSTRAINT `inquilino` FOREIGN KEY (`id_inquilino`) REFERENCES `inquilino` (`id_inquilino`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=369 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `recibocompleto`
--

LOCK TABLES `recibocompleto` WRITE;
/*!40000 ALTER TABLE `recibocompleto` DISABLE KEYS */;
INSERT INTO `recibocompleto` VALUES (307,17,20,24,74,'LAURA ZAPATA AGUILAR','2024-03-08','08-mar-24','MARZO 2024','11551-11552','CUOTAS DE MANTENIMIENTO Y ADMINISTRACIÓN','650','','','','','650','SEISCIENTOS CINCUENTA PESOS 00/100 M.N.',10),(308,17,20,25,75,'AGUSTIN DÍAZ GORASTTIETA','2024-03-04','04-mar-24','MARZO 2024','11543','CUOTAS DE MANTENIMIENTO Y ADMINISTRACIÓN','550','','','','','550','QUINIENTOS CINCUENTA PESOS 00/100 M.N.',10),(309,17,20,26,76,'ANTONIO CARLOS PEDROZA FREYRE','2024-03-01','01-mar-24','MARZO 2024','11530','CUOTAS DE MANTENIMIENTO Y ADMINISTRACIÓN','650','','','','','650','SEISCIENTOS CINCUENTA PESOS 00/100 M.N.',10),(310,17,20,27,77,'GLORIA FABIAN AYALA','2024-03-10','10-mar-24','MARZO 2024','11560','CUOTAS DE MANTENIMIENTO Y ADMINISTRACIÓN','650','','','','','650','SEISCIENTOS CINCUENTA PESOS 00/100 M.N.',10),(311,17,20,31,81,'PATRICIA TORRES LUGO','2024-03-09','09-mar-24','MARZO 2024','11555','CUOTAS DE MANTENIMIENTO Y ADMINISTRACIÓN','550','','','','','550','QUINIENTOS CINCUENTA PESOS 00/100 M.N.',10),(312,17,20,32,82,'ERIKA PATRICIA LARA SÁNCHEZ','2024-03-04','04-mar-24','MARZO 2024','11542','CUOTAS DE MANTENIMIENTO Y ADMINISTRACIÓN','650','','','','','650','SEISCIENTOS CINCUENTA PESOS 00/100 M.N.',10),(313,17,20,34,84,'CLAUDIA JIMENEZ VAZQUEZ','2024-03-04','04-mar-24','MARZO 2024','11541','CUOTAS DE MANTENIMIENTO Y ADMINISTRACIÓN','550','','','','','550','QUINIENTOS CINCUENTA PESOS 00/100 M.N.',10),(314,17,20,36,86,'SANDRA ORTEGA N','2024-02-29','29-feb-24','MARZO 2024','11529','CUOTAS DE MANTENIMIENTO Y ADMINISTRACIÓN','650','','','','','650','SEISCIENTOS CINCUENTA PESOS 00/100 M.N.',10),(315,17,20,37,87,'MARIO CASTILLO GARCÍA','2024-03-02','02-mar-24','MARZO 2024','11535','CUOTAS DE MANTENIMIENTO Y ADMINISTRACIÓN','550','','','','','550','QUINIENTOS CINCUENTA PESOS 00/100 M.N.',10),(316,17,20,38,88,'MARTHA ESPINOZA SANCHEZ','2024-03-06','06-mar-24','MARZO 2024','11547','CUOTAS DE MANTENIMIENTO Y ADMINISTRACIÓN','650','','','','','650','SEISCIENTOS CINCUENTA PESOS 00/100 M.N.',10),(317,17,20,40,90,'IRIS A. MORENO CAMARA','2024-03-04','04-mar-24','MARZO 2024','11539','CUOTAS DE MANTENIMIENTO Y ADMINISTRACIÓN','650','','','','','650','SEISCIENTOS CINCUENTA PESOS 00/100 M.N.',10),(318,17,20,41,91,'PATRICIA BALBUENA N','2024-03-09','09-mar-24','MARZO 2024','11556','CUOTAS DE MANTENIMIENTO Y ADMINISTRACIÓN','550','','','','','550','QUINIENTOS CINCUENTA PESOS 00/100 M.N.',10),(319,17,20,42,92,'MARTHA MALDONADO A.','2024-02-29','29-feb-24','MARZO 2024','11526','CUOTAS DE MANTENIMIENTO Y ADMINISTRACIÓN','550','','','','','550','QUINIENTOS CINCUENTA PESOS 00/100 M.N.',10),(320,17,20,43,93,'CINTHYA SHIBATA ARRAZOLA','2024-03-15','15-mar-24','MARZO 2024','11561','CUOTAS DE MANTENIMIENTO Y ADMINISTRACIÓN','650','','','','120.1','770.06','SETECIENTOS SETENTA PESOS 6/100 M.N.',10),(321,17,20,44,117,'FERNANDO ISRAEL MADRID CHARTT','2024-04-03','03-abr-24','MARZO 2024','11537','CUOTAS DE MANTENIMIENTO Y ADMINISTRACIÓN','550','','','','','550','QUINIENTOS CINCUENTA PESOS 00/100 M.N.',10),(322,17,20,48,98,'CESAR VILLA VELAZQUEZ','2024-02-29','29-feb-24','MARZO 2024','11528','CUOTAS DE MANTENIMIENTO Y ADMINISTRACIÓN','550','','','','100.0','650','SEISCIENTOS CINCUENTA PESOS 00/100 M.N.',10),(323,17,20,49,99,'SALVADOR ANGELES NEGRETE','2024-03-01','01-mar-24','MARZO 2024','11532','CUOTAS DE MANTENIMIENTO Y ADMINISTRACIÓN','550','','','','0.4','550.35','QUINIENTOS CINCUENTA PESOS 35/100 M.N.',10),(324,17,20,50,100,'GLADYS BARRIOS VELASCO','2024-03-10','10-mar-24','MARZO 2024','11558','CUOTAS DE MANTENIMIENTO Y ADMINISTRACIÓN','550','','','','','550','QUINIENTOS CINCUENTA PESOS 00/100 M.N.',10),(325,17,20,51,101,'LUIS LEOPOLDO JUAREZ DOMINGUEZ','2024-03-01','01-mar-24','MARZO 2024','11533','CUOTAS DE MANTENIMIENTO Y ADMINISTRACIÓN','550','','','','-250.0','300','TRESCIENTOS PESOS 00/100 M.N.',10),(326,17,20,52,102,'JOSE MANUEL SANCHEZ DOMINGUEZ','2024-03-06','06-mar-24','MARZO 2024','11548','CUOTAS DE MANTENIMIENTO Y ADMINISTRACIÓN','550','','','','','550','QUINIENTOS CINCUENTA PESOS 00/100 M.N.',10),(327,17,20,54,104,'PAOLA CORDOVA FUENTES','2024-03-07','07-mar-24','MARZO 2024','11549','CUOTAS DE MANTENIMIENTO Y ADMINISTRACIÓN','550','','','','','550','QUINIENTOS CINCUENTA PESOS 00/100 M.N.',10),(328,17,20,56,106,'ADRIANA ZÁRATE MORALES','2024-03-05','05-mar-24','MARZO 2024','11546','CUOTAS DE MANTENIMIENTO Y ADMINISTRACIÓN','550','','','','','550','QUINIENTOS CINCUENTA PESOS 00/100 M.N.',10),(329,17,20,57,120,'MA ELENA VAZQUEZ SANCHEZ','2024-03-01','01-mar-24','MARZO 2024','11531','CUOTAS DE MANTENIMIENTO Y ADMINISTRACIÓN','550','','','','','550','QUINIENTOS CINCUENTA PESOS 00/100 M.N.',10),(330,17,20,58,107,'YESSICA HERNANDEZ N','2024-03-02','02-mar-24','MARZO 2024','11536','CUOTAS DE MANTENIMIENTO Y ADMINISTRACIÓN','550','','','','','550','QUINIENTOS CINCUENTA PESOS 00/100 M.N.',10),(331,17,20,59,108,'ANA MARIA LOPEZ RAMIREZ','2024-03-05','05-mar-24','MARZO 2024','11545','CUOTAS DE MANTENIMIENTO Y ADMINISTRACIÓN','550','','','','','550','QUINIENTOS CINCUENTA PESOS 00/100 M.N.',10),(332,17,20,63,112,'JUANA HERNANDEZ SANCHEZ','2024-02-29','29-feb-24','MARZO 2024','11527','CUOTAS DE MANTENIMIENTO Y ADMINISTRACIÓN','550','','','','100.0','650','SEISCIENTOS CINCUENTA PESOS 00/100 M.N.',10),(333,17,20,64,113,'ANA FABIOLA OBANDO MARQUEZ','2024-03-07','07-mar-24','MARZO 2024','11550','CUOTAS DE MANTENIMIENTO Y ADMINISTRACIÓN','550','','','','','550','QUINIENTOS CINCUENTA PESOS 00/100 M.N.',10),(334,17,20,65,114,'DAVID HERNANDEZ N','2024-03-01','01-mar-24','MARZO 2024','11534','CUOTAS DE MANTENIMIENTO Y ADMINISTRACIÓN','550','','','','','550','QUINIENTOS CINCUENTA PESOS 00/100 M.N.',10),(335,17,20,66,115,'MARIBEL VIVAR N','2024-03-08','08-mar-24','MARZO 2024','11554','CUOTAS DE MANTENIMIENTO Y ADMINISTRACIÓN','550','','','','','550','QUINIENTOS CINCUENTA PESOS 00/100 M.N.',10),(336,17,20,67,116,'ALICIA TOPETE CAMPOS','2024-03-08','08-mar-24','MARZO 2024','11553','CUOTAS DE MANTENIMIENTO Y ADMINISTRACIÓN','550','','','','1000.0','1550','MIL QUINIENTOS CINCUENTA PESOS 00/100 M.N.',10),(337,17,20,68,94,'ROBERTO AVILA CHAVEZ','2024-03-09','09-mar-24','MARZO 2024','11557','CUOTAS DE MANTENIMIENTO Y ADMINISTRACIÓN','650','','','','','650','SEISCIENTOS CINCUENTA PESOS 00/100 M.N.',10),(338,17,20,72,118,'GREGORIO EDUARDO GARCIA ZARCO','2024-03-05','05-mar-24','MARZO 2024','11544','CUOTAS DE MANTENIMIENTO Y ADMINISTRACIÓN','650','','','','','650','SEISCIENTOS CINCUENTA PESOS 00/100 M.N.',10),(339,17,20,24,74,'LAURA ZAPATA AGUILAR','2024-02-09','09-feb-24','FEBRERO 2024','11514','CUOTAS DE MANTENIMIENTO Y ADMINISTRACIÓN','650','','','','','650','SEISCIENTOS CINCUENTA PESOS 00/100 M.N.',10),(340,17,20,26,76,'ANTONIO CARLOS PEDROZA FREYRE','2024-02-01','01-feb-24','FEBRERO 2024','11487','CUOTAS DE MANTENIMIENTO Y ADMINISTRACIÓN','650','','','','','650','SEISCIENTOS CINCUENTA PESOS 00/100 M.N.',10),(341,17,20,27,77,'GLORIA FABIAN AYALA','2024-02-10','10-feb-24','FEBRERO 2024','11518','CUOTAS DE MANTENIMIENTO Y ADMINISTRACIÓN','650','','','','','650','SEISCIENTOS CINCUENTA PESOS 00/100 M.N.',10),(342,17,20,31,81,'PATRICIA TORRES LUGO','2024-02-08','08-feb-24','FEBRERO 2024','11511','CUOTAS DE MANTENIMIENTO Y ADMINISTRACIÓN','550','','','','','550','QUINIENTOS CINCUENTA PESOS 00/100 M.N.',10),(343,17,20,32,82,'ERIKA PATRICIA LARA SÁNCHEZ','2024-02-05','05-feb-24','FEBRERO 2024','11504','CUOTAS DE MANTENIMIENTO Y ADMINISTRACIÓN','650','','','','','650','SEISCIENTOS CINCUENTA PESOS 00/100 M.N.',10),(344,17,20,34,84,'CLAUDIA JIMENEZ VAZQUEZ','2024-02-01','01-feb-24','FEBRERO 2024','11494','CUOTAS DE MANTENIMIENTO Y ADMINISTRACIÓN','550','','','','','550','QUINIENTOS CINCUENTA PESOS 00/100 M.N.',10),(345,17,20,36,86,'SANDRA ORTEGA N','2024-01-31','31-ene-24','FEBRERO 2024','11483','CUOTAS DE MANTENIMIENTO Y ADMINISTRACIÓN','650','','','','','650','SEISCIENTOS CINCUENTA PESOS 00/100 M.N.',10),(346,17,20,37,87,'MARIO CASTILLO GARCÍA','2024-02-01','01-feb-24','FEBRERO 2024','11486','CUOTAS DE MANTENIMIENTO Y ADMINISTRACIÓN','550','','','','','550','QUINIENTOS CINCUENTA PESOS 00/100 M.N.',10),(347,17,20,38,88,'MARTHA ESPINOZA SANCHEZ','2024-02-07','07-feb-24','FEBRERO 2024','11508','CUOTAS DE MANTENIMIENTO Y ADMINISTRACIÓN','650','','','','','650','SEISCIENTOS CINCUENTA PESOS 00/100 M.N.',10),(348,17,20,40,90,'IRIS A. MORENO CAMARA','2024-02-08','08-feb-24','FEBRERO 2024','11512','CUOTAS DE MANTENIMIENTO Y ADMINISTRACIÓN','650','','','','','650','SEISCIENTOS CINCUENTA PESOS 00/100 M.N.',10),(349,17,20,42,92,'MARTHA MALDONADO A.','2024-02-01','01-feb-24','FEBRERO 2024','11493','CUOTAS DE MANTENIMIENTO Y ADMINISTRACIÓN','550','','','','','550','QUINIENTOS CINCUENTA PESOS 00/100 M.N.',10),(350,17,20,43,93,'CINTHYA SHIBATA ARRAZOLA','2024-01-02','02-ene-24','FEBRERO 2024','11498','CUOTAS DE MANTENIMIENTO Y ADMINISTRACIÓN','650','','','','0.1','650.06','SEISCIENTOS CINCUENTA PESOS 6/100 M.N.',10),(351,17,20,44,117,'FERNANDO ISRAEL MADRID CHARTT','2024-02-02','02-feb-24','FEBRERO 2024','11499','CUOTAS DE MANTENIMIENTO Y ADMINISTRACIÓN','550','','','','','550','QUINIENTOS CINCUENTA PESOS 00/100 M.N.',10),(352,17,20,48,98,'CESAR VILLA VELAZQUEZ','2024-01-31','31-ene-24','FEBRERO 2024','11485','CUOTAS DE MANTENIMIENTO Y ADMINISTRACIÓN','550','','','','100.0','650','SEISCIENTOS CINCUENTA PESOS 00/100 M.N.',10),(353,17,20,49,99,'SALVADOR ANGELES NEGRETE','2024-02-01','01-feb-24','FEBRERO 2024','11495','CUOTAS DE MANTENIMIENTO Y ADMINISTRACIÓN','550','','','','0.4','550.35','QUINIENTOS CINCUENTA PESOS 35/100 M.N.',10),(354,17,20,50,100,'GLADYS BARRIOS VELASCO','2024-02-10','10-feb-24','FEBRERO 2024','11516','CUOTAS DE MANTENIMIENTO Y ADMINISTRACIÓN','550','','','','','550','QUINIENTOS CINCUENTA PESOS 00/100 M.N.',10),(355,17,20,51,101,'LUIS LEOPOLDO JUAREZ DOMINGUEZ','2024-01-02','02-ene-24','FEBRERO 2024','11497','CUOTAS DE MANTENIMIENTO Y ADMINISTRACIÓN','550','','','','-250.0','300','TRESCIENTOS PESOS 00/100 M.N.',10),(356,17,20,52,102,'JOSE MANUEL SANCHEZ DOMINGUEZ','2024-02-09','09-feb-24','FEBRERO 2024','11515','CUOTAS DE MANTENIMIENTO Y ADMINISTRACIÓN','550','','','','','550','QUINIENTOS CINCUENTA PESOS 00/100 M.N.',10),(357,17,20,54,104,'PAOLA CORDOVA FUENTES','2024-02-06','06-feb-24','FEBRERO 2024','11505','CUOTAS DE MANTENIMIENTO Y ADMINISTRACIÓN','550','','','','','550','QUINIENTOS CINCUENTA PESOS 00/100 M.N.',10),(358,17,20,56,106,'ADRIANA ZÁRATE MORALES','2024-02-05','05-feb-24','FEBRERO 2024','11503','CUOTAS DE MANTENIMIENTO Y ADMINISTRACIÓN','550','','','','','550','QUINIENTOS CINCUENTA PESOS 00/100 M.N.',10),(359,17,20,57,120,'MA ELENA VAZQUEZ SANCHEZ','2024-02-01','01-feb-24','FEBRERO 2024','11496','CUOTAS DE MANTENIMIENTO Y ADMINISTRACIÓN','550','','','','','550','QUINIENTOS CINCUENTA PESOS 00/100 M.N.',10),(360,17,20,58,107,'YESSICA HERNANDEZ N','2024-02-03','03-feb-24','FEBRERO 2024','11501','CUOTAS DE MANTENIMIENTO Y ADMINISTRACIÓN','550','','','','','550','QUINIENTOS CINCUENTA PESOS 00/100 M.N.',10),(361,17,20,59,108,'ANA MARIA LOPEZ RAMIREZ','2024-02-06','06-feb-24','FEBRERO 2024','11506','CUOTAS DE MANTENIMIENTO Y ADMINISTRACIÓN','550','','','','','550','QUINIENTOS CINCUENTA PESOS 00/100 M.N.',10),(362,17,20,62,111,'SELENE JIMENEZ RODRIGUEZ','2024-02-04','04-feb-24','FEBRERO 2024','11502','CUOTAS DE MANTENIMIENTO Y ADMINISTRACIÓN','550','','','','','550','QUINIENTOS CINCUENTA PESOS 00/100 M.N.',10),(363,17,20,64,113,'ANA FABIOLA OBANDO MARQUEZ','2024-02-06','06-feb-24','FEBRERO 2024','11507','CUOTAS DE MANTENIMIENTO Y ADMINISTRACIÓN','550','','','','','550','QUINIENTOS CINCUENTA PESOS 00/100 M.N.',10),(364,17,20,65,114,'DAVID HERNANDEZ N','2024-01-31','31-ene-24','FEBRERO 2024','11484','CUOTAS DE MANTENIMIENTO Y ADMINISTRACIÓN','550','','','','','550','QUINIENTOS CINCUENTA PESOS 00/100 M.N.',10),(365,17,20,66,115,'MARIBEL VIVAR N','2024-02-20','20-feb-24','FEBRERO 2024','11520','CUOTAS DE MANTENIMIENTO Y ADMINISTRACIÓN','550','','','','100.0','650','SEISCIENTOS CINCUENTA PESOS 00/100 M.N.',10),(366,17,20,68,94,'ROBERTO AVILA CHAVEZ','2024-02-09','09-feb-24','FEBRERO 2024','11513','CUOTAS DE MANTENIMIENTO Y ADMINISTRACIÓN','650','','','','','650','SEISCIENTOS CINCUENTA PESOS 00/100 M.N.',10),(367,17,20,72,118,'GREGORIO EDUARDO GARCIA ZARCO','2024-02-07','07-feb-24','FEBRERO 2024','11509','CUOTAS DE MANTENIMIENTO Y ADMINISTRACIÓN','650','','','','','650','SEISCIENTOS CINCUENTA PESOS 00/100 M.N.',10),(368,13,16,20,72,'Alejandra Hernández Quiñones','2024-06-01','01-jun-24','MAYO 2024','001','CUOTAS DE MANTENIMIENTO Y ADMINISTRACIÓN','450','','','','','450','CUATROCIENTOS CINCUENTA PESOS 00/100 M.N.',10);
/*!40000 ALTER TABLE `recibocompleto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `total pagado`
--

DROP TABLE IF EXISTS `total pagado`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `total pagado` (
  `id_total` int NOT NULL AUTO_INCREMENT,
  `id_ordinaria` int NOT NULL,
  `id_extraordinaria` int NOT NULL,
  `id_penalizacion` int NOT NULL,
  `id_reserva` int NOT NULL,
  `id_adeudos` int NOT NULL,
  `monto_total` double NOT NULL,
  PRIMARY KEY (`id_total`),
  KEY `id_ordinaria_idx` (`id_ordinaria`),
  KEY `id_extraordinaria_idx` (`id_extraordinaria`),
  KEY `id_penalizacion_idx` (`id_penalizacion`),
  KEY `id_reserva_idx` (`id_reserva`),
  KEY `id_adeudos_idx` (`id_adeudos`),
  CONSTRAINT `id_adeudos` FOREIGN KEY (`id_adeudos`) REFERENCES `adeudos anteriores` (`id_adeudos`) ON UPDATE CASCADE,
  CONSTRAINT `id_extraordinaria` FOREIGN KEY (`id_extraordinaria`) REFERENCES `cuota extraordinaria` (`id_extraordinaria`) ON UPDATE CASCADE,
  CONSTRAINT `id_ordinaria` FOREIGN KEY (`id_ordinaria`) REFERENCES `cuota ordinaria` (`id_ordinaria`) ON UPDATE CASCADE,
  CONSTRAINT `id_penalizacion` FOREIGN KEY (`id_penalizacion`) REFERENCES `cuota de penalización` (`id_penalizacion`) ON UPDATE CASCADE,
  CONSTRAINT `id_reserva` FOREIGN KEY (`id_reserva`) REFERENCES `cuota de fondo de reserva` (`id_reserva`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `total pagado`
--

LOCK TABLES `total pagado` WRITE;
/*!40000 ALTER TABLE `total pagado` DISABLE KEYS */;
/*!40000 ALTER TABLE `total pagado` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-06-03  9:37:14
