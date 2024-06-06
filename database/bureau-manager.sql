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
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin_cuotas`
--

LOCK TABLES `admin_cuotas` WRITE;
/*!40000 ALTER TABLE `admin_cuotas` DISABLE KEYS */;
INSERT INTO `admin_cuotas` VALUES (5,13,16,550,NULL),(6,13,21,700,800),(7,17,20,550,650),(8,13,22,800,NULL),(9,16,18,670,790);
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
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `administrador`
--

LOCK TABLES `administrador` WRITE;
/*!40000 ALTER TABLE `administrador` DISABLE KEYS */;
INSERT INTO `administrador` VALUES (10,'Alejandra','Hernandez','Quinones','alesitahq@gmail.com','$2b$10$QZ6wNguGcOuYcDOjaKrB7uLBem8ablOBLnU8dXrZM.cEfYAVye5Da'),(11,'Emmanuel','Villarruel','Morales','villarruelmoralese@gmail.com','$2b$10$YvEr1B4pzdC3oxGh.ergieYSOD1i/VckjkGcSQUi59/D4/Mmh3Uam'),(12,'Alejandra','Hernandez','Quinones','ale@gmail.com','$2b$10$4YM7szHe08NWDVfSwV.Qfe6rczrAknqwhUzEhY0cnTxiacqGKBJOa'),(13,'Edith','Quiñones','Bonilla','edithrqb@gmail.com','$2b$10$cUGSx5Kf5Rcs7ww1LFXKHuP80FgXao5l1B0wPmd8OQplmSDW5cYvy');
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
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `condominio`
--

LOCK TABLES `condominio` WRITE;
/*!40000 ALTER TABLE `condominio` DISABLE KEYS */;
INSERT INTO `condominio` VALUES (13,'Fuentes de Azcapotzalco','Av. Aquiles Serdán, No. 464, Col. Ángel Zimbrón, Azcapotzalco, CDMX','EDITH ROGELIA QUIÑONES BONILLA',10),(14,'Tlalpan','Calz De Tlalpan 2490 - 1, Avante, Coyoacan, C.p 04460, Df C.P 04460,','MÓNICA BERNAL MORALES',10),(15,'Cafetales','Xochimilco, 109','MÓNICA BERNAL MORALES',10),(16,'Rio Neva','Rio Neva 37','MÓNICA BERNAL MORALES',10),(17,'Simón Bolívar','Calle Simón Bolívar No. 820, Colonia Álamos, Alcaldía Benito Juárez, C.P. 03400, CDMX','EDITH ROGELIA QUIÑONES BONILLA',10),(18,'Xochimilco','Direccion 1','MÓNICA BERNAL MORALES',10),(19,'Fuentes de Azcapotzalco','Av. Aquiles Serdán, No. 464, Col. Ángel Zimbrón, Azcapotzalco, CDMX','EDITH ROGELIA QUIÑONES BONILLA',13),(20,'Simón Bolívar','Calle Simón Bolívar No. 820, Colonia Álamos, Alcaldía Benito Juárez, C.P. 03400, CDMX','EDITH ROGELIA QUIÑONES BONILLA',13),(21,'Condominio 1RO DE MAYO','Avenida Primero de Mayo #112, San Pedro de los Pinos, Benito Juarez, CDMX.','EDITH ROGELIA QUIÑONES BONILLA',13),(22,'Condominio Cafetales 270','Av. Cafetales No 270,  Granjas Coapa, Alcaldía Tlalpan, Código Postal 14330, CDMX','MÓNICA BERNAL MORALES',13),(23,'Condominio Lago Cuitzeo 60','Calle lago Cuitzeo No. 60, Colonia Anahuac, Alcaldía Miguel Hidalgo, C.P. 01320, CDMX','MÓNICA BERNAL MORALES',13),(24,'Condominio Olloqui 119','Jose Maria Olloqui 119 Colonia Del Valle Sur, Código Postal 0001, Alcaldía Benito Juárez','EDITH ROGELIA QUIÑONES BONILLA',13);
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
) ENGINE=InnoDB AUTO_INCREMENT=305 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `departamento`
--

LOCK TABLES `departamento` WRITE;
/*!40000 ALTER TABLE `departamento` DISABLE KEYS */;
INSERT INTO `departamento` VALUES (20,16,'H005'),(21,16,'H006'),(22,18,'102'),(23,19,'101'),(24,20,'A101'),(25,20,'A102'),(26,20,'A103'),(27,20,'A201'),(28,20,'A202'),(29,20,'A203'),(30,20,'A204'),(31,20,'A301'),(32,20,'A302'),(33,20,'A303'),(34,20,'A304'),(35,20,'A401'),(36,20,'A402'),(37,20,'A403'),(38,20,'A404'),(39,20,'A501'),(40,20,'A502'),(41,20,'A503'),(42,20,'A504'),(43,20,'A601'),(44,20,'A602'),(45,20,'A603'),(46,20,'A604'),(47,20,'B101'),(48,20,'B102'),(49,20,'B103'),(50,20,'B104'),(51,20,'B201'),(52,20,'B202'),(53,20,'B203'),(54,20,'B204'),(55,20,'B301'),(56,20,'B302'),(57,20,'B303'),(58,20,'B304'),(59,20,'B401'),(60,20,'B402'),(61,20,'B403'),(62,20,'B404'),(63,20,'B501'),(64,20,'B502'),(65,20,'B503'),(66,20,'B504'),(67,20,'B601'),(68,20,'B602'),(70,20,'B604'),(72,20,'B603'),(73,21,'J101'),(103,16,'H102'),(105,16,'H106'),(107,16,'H105'),(108,25,'001'),(109,25,'002'),(110,25,'003'),(111,25,'004'),(114,25,'101'),(115,25,'102'),(116,25,'103'),(117,25,'104'),(118,25,'201'),(119,25,'202'),(120,25,'203'),(121,25,'204'),(123,25,'301'),(124,25,'302'),(125,25,'303'),(126,25,'304'),(127,25,'401'),(128,25,'402'),(129,25,'403'),(130,25,'404'),(131,25,'501'),(132,25,'502'),(133,25,'503'),(134,25,'504'),(135,25,'601'),(136,25,'602'),(137,25,'603'),(138,25,'604'),(139,26,'A101'),(140,26,'A102'),(141,26,'A103'),(142,26,'A201'),(143,26,'A202'),(144,26,'A203'),(145,26,'A204'),(146,26,'A301'),(147,26,'A302'),(148,26,'A303'),(149,26,'A304'),(150,26,'A401'),(151,26,'A402'),(152,26,'A403'),(153,26,'A404'),(154,26,'A501'),(155,26,'A502'),(156,26,'A503'),(157,26,'A504'),(158,26,'A601'),(159,26,'A602'),(160,26,'A603'),(161,26,'A604'),(162,26,'B101'),(163,26,'B102'),(164,26,'B103'),(165,26,'B104'),(166,26,'B201'),(167,26,'B202'),(168,26,'B203'),(169,26,'B204'),(170,26,'B301'),(171,26,'B302'),(172,26,'B303'),(173,26,'B304'),(174,26,'B401'),(175,26,'B402'),(176,26,'B403'),(177,26,'B404'),(178,26,'B501'),(179,26,'B502'),(180,26,'B503'),(181,26,'B504'),(182,26,'B601'),(183,26,'B602'),(184,26,'B603'),(185,26,'B604'),(186,27,'101'),(187,27,'102'),(188,27,'103'),(189,27,'104'),(190,27,'105'),(191,27,'106'),(192,27,'201'),(193,27,'202'),(194,27,'203'),(195,27,'204'),(196,27,'205'),(197,27,'206'),(198,27,'301'),(199,27,'302'),(200,27,'303'),(201,27,'304'),(202,27,'305'),(203,27,'306'),(204,27,'401'),(205,27,'402'),(206,27,'403'),(207,27,'404'),(208,27,'405'),(209,27,'406'),(210,27,'501'),(211,27,'502'),(212,27,'503'),(213,27,'504'),(214,26,'505'),(215,27,'506'),(216,27,'PH1'),(217,27,'PH2'),(218,27,'PH3'),(219,27,'PH4'),(220,27,'PH5'),(221,27,'PH6'),(222,28,'101'),(223,28,'102'),(224,28,'103'),(225,28,'201'),(226,28,'202'),(227,28,'203'),(228,28,'301'),(229,28,'302'),(230,28,'303'),(231,28,'401'),(232,28,'402'),(233,28,'403'),(234,29,'001'),(235,29,'003'),(236,29,'004'),(237,29,'005'),(238,29,'006'),(239,29,'007'),(240,29,'008'),(241,29,'101'),(242,29,'102'),(243,29,'103'),(244,29,'104'),(245,29,'105'),(246,29,'106'),(247,29,'107'),(248,29,'108'),(249,29,'201'),(250,29,'202'),(251,29,'203'),(252,29,'204'),(253,29,'205'),(254,29,'206'),(255,29,'207'),(256,29,'208'),(257,29,'301'),(258,29,'302'),(259,29,'303'),(260,29,'304'),(261,29,'305'),(262,29,'306'),(263,29,'307'),(264,29,'308'),(265,29,'402'),(266,29,'401'),(267,29,'403'),(268,29,'404'),(269,29,'405'),(270,29,'406'),(271,29,'407'),(272,29,'408'),(273,29,'501'),(274,29,'502'),(275,29,'503'),(276,29,'504'),(277,29,'505'),(278,29,'506'),(279,29,'507'),(280,29,'508'),(281,30,'101'),(282,30,'102'),(283,30,'201'),(284,30,'202'),(285,30,'301'),(286,30,'302'),(287,30,'401'),(288,30,'402'),(289,30,'501'),(290,30,'502'),(291,30,'601'),(292,30,'602'),(293,30,'701'),(294,30,'702'),(295,30,'801'),(296,30,'802'),(297,30,'901'),(298,30,'902'),(299,30,'1001'),(300,30,'1002'),(301,30,'1101'),(302,30,'1102'),(303,30,'PH-A'),(304,30,'PH-B');
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
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `edificio`
--

LOCK TABLES `edificio` WRITE;
/*!40000 ALTER TABLE `edificio` DISABLE KEYS */;
INSERT INTO `edificio` VALUES (16,13,'Edificio H'),(18,16,'2'),(19,16,'1'),(20,17,'Edificio 1'),(21,13,'Edificio J'),(22,13,'Torre E'),(23,13,'Torre F'),(24,13,'Edificio K'),(25,19,'Torre E'),(26,20,'Edificio A-B'),(27,21,'Edificio 1'),(28,22,'Edificio 1'),(29,23,'Edificios A-B'),(30,24,'Edificio 1');
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
) ENGINE=InnoDB AUTO_INCREMENT=886 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `infopagos`
--

LOCK TABLES `infopagos` WRITE;
/*!40000 ALTER TABLE `infopagos` DISABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=150 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inquilino`
--

LOCK TABLES `inquilino` WRITE;
/*!40000 ALTER TABLE `inquilino` DISABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=507 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `recibocompleto`
--

LOCK TABLES `recibocompleto` WRITE;
/*!40000 ALTER TABLE `recibocompleto` DISABLE KEYS */;
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

-- Dump completed on 2024-06-06 13:07:57
