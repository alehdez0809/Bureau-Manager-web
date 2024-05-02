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
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `administrador`
--

LOCK TABLES `administrador` WRITE;
/*!40000 ALTER TABLE `administrador` DISABLE KEYS */;
INSERT INTO `administrador` VALUES (10,'Alejandra','Hernandez','Quinones','alesitahq@gmail.com','$2b$10$QZ6wNguGcOuYcDOjaKrB7uLBem8ablOBLnU8dXrZM.cEfYAVye5Da'),(11,'Emmanuel','Villarruel','Morales','villarruelmoralese@gmail.com','$2b$10$YvEr1B4pzdC3oxGh.ergieYSOD1i/VckjkGcSQUi59/D4/Mmh3Uam');
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
) ENGINE=InnoDB AUTO_INCREMENT=73 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `departamento`
--

LOCK TABLES `departamento` WRITE;
/*!40000 ALTER TABLE `departamento` DISABLE KEYS */;
INSERT INTO `departamento` VALUES (20,16,'H005'),(21,16,'H006'),(22,18,'102'),(23,19,'101'),(24,20,'A101'),(25,20,'A102'),(26,20,'A103'),(27,20,'A201'),(28,20,'A202'),(29,20,'A203'),(30,20,'A204'),(31,20,'A301'),(32,20,'A302'),(33,20,'A303'),(34,20,'A304'),(35,20,'A401'),(36,20,'A402'),(37,20,'A403'),(38,20,'A404'),(39,20,'A501'),(40,20,'A502'),(41,20,'A503'),(42,20,'A504'),(43,20,'A601'),(44,20,'A602'),(45,20,'A603'),(46,20,'A604'),(47,20,'B101'),(48,20,'B102'),(49,20,'B103'),(50,20,'B104'),(51,20,'B201'),(52,20,'B202'),(53,20,'B203'),(54,20,'B204'),(55,20,'B301'),(56,20,'B302'),(57,20,'B303'),(58,20,'B304'),(59,20,'B401'),(60,20,'B402'),(61,20,'B403'),(62,20,'B404'),(63,20,'B501'),(64,20,'B502'),(65,20,'B503'),(66,20,'B504'),(67,20,'B601'),(68,20,'B602'),(70,20,'B604'),(72,20,'B603');
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
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `edificio`
--

LOCK TABLES `edificio` WRITE;
/*!40000 ALTER TABLE `edificio` DISABLE KEYS */;
INSERT INTO `edificio` VALUES (16,13,'Edificio H'),(18,16,'2'),(19,16,'1'),(20,17,'Edificio 1');
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
) ENGINE=InnoDB AUTO_INCREMENT=714 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `infopagos`
--

LOCK TABLES `infopagos` WRITE;
/*!40000 ALTER TABLE `infopagos` DISABLE KEYS */;
INSERT INTO `infopagos` VALUES (669,10,13,16,18,'001','650','0','2024-04-25'),(670,10,17,20,28,NULL,'0','-2200','2024-04-26'),(671,10,17,20,30,NULL,'0','84118','2024-04-26'),(672,10,17,20,33,NULL,'0','72664','2024-04-26'),(673,10,17,20,35,NULL,'0','12000','2024-04-26'),(674,10,17,20,39,NULL,'0','6020','2024-04-26'),(675,10,17,20,45,NULL,'0','5400','2024-04-26'),(676,10,17,20,46,NULL,'0','10300','2024-04-26'),(677,10,17,20,47,NULL,'0','13680','2024-04-26'),(678,10,17,20,53,NULL,'0','89475.5','2024-04-26'),(679,10,17,20,60,NULL,'0','77410','2024-04-26'),(680,10,17,20,61,NULL,'0','81200','2024-04-26'),(681,10,17,20,69,NULL,'0','55380','2024-04-26'),(682,10,17,20,24,'11551-11552','650','1300.0','2024-03-08'),(683,10,17,20,25,'11543','550','5515.0','2024-03-04'),(684,10,17,20,26,'11530','650','0','2024-03-01'),(685,10,17,20,27,'11560','650','15638.0','2024-03-10'),(686,10,17,20,31,'11555','550','0','2024-03-09'),(687,10,17,20,32,'11542','650','12050.0','2024-03-04'),(688,10,17,20,34,'11541','550','0','2024-03-04'),(689,10,17,20,36,'11529','650','62436.0','2024-02-29'),(690,10,17,20,37,'11535','550','0','2024-03-02'),(691,10,17,20,38,'11547','650','6254.0','2024-03-06'),(692,10,17,20,40,'11539','650','120.0','2024-03-04'),(693,10,17,20,41,'11556','550','0','2024-03-09'),(694,10,17,20,42,'11526','550','35650.0','2024-02-29'),(695,10,17,20,43,'11561','770.06','0.0','2024-03-15'),(696,10,17,20,44,'11537','550','0','2024-04-03'),(697,10,17,20,48,'11528','650','4950.0','2024-02-29'),(698,10,17,20,49,'11532','550.35','0','2024-03-01'),(699,10,17,20,50,'11558','550','650.0','2024-03-10'),(700,10,17,20,51,'11533','300','67610.0','2024-03-01'),(701,10,17,20,52,'11548','550','16052.0','2024-03-06'),(702,10,17,20,54,'11549','550','52030.0','2024-03-07'),(703,10,17,20,56,'11546','550','0','2024-03-05'),(704,10,17,20,57,'11531','550','5000.0','2024-03-01'),(705,10,17,20,58,'11536','550','550.0','2024-03-02'),(706,10,17,20,59,'11545','550','37950.0','2024-03-05'),(707,10,17,20,63,'11527','650','41800.0','2024-02-29'),(708,10,17,20,64,'11550','550','0','2024-03-07'),(709,10,17,20,65,'11534','550','37250.0','2024-03-01'),(710,10,17,20,66,'11554','550','350.0','2024-03-08'),(711,10,17,20,67,'11553','1550','55000.0','2024-03-08'),(712,10,17,20,68,'11557','650','1300.0','2024-03-09'),(713,10,17,20,71,'11544','650','0','2024-03-05');
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
  PRIMARY KEY (`id_inquilino`),
  KEY `id_departamento_idx` (`id_departamento`),
  CONSTRAINT `id_departamento` FOREIGN KEY (`id_departamento`) REFERENCES `departamento` (`id_departamento`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=72 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inquilino`
--

LOCK TABLES `inquilino` WRITE;
/*!40000 ALTER TABLE `inquilino` DISABLE KEYS */;
INSERT INTO `inquilino` VALUES (18,20,'Alejandra','Hernández','Quiñones','alejandrahernandeztelpuchcalli@gmail.com'),(21,21,'Ernesto Emmanuel','Villarruel','Morales','guzman.juarez.angel.moises@gmail.com'),(22,22,'Rodrigo','Morales','Roldan','villarruelmoralese@gmail.com'),(23,23,'Said','Morales','Hernandez',NULL),(24,24,'LAURA S.','ZAPATA','AGUILAR','alejandrahernandeztelpuchcalli@gmail.com'),(25,25,'AGUSTIN','DÍAZ','GORASTTIETA',NULL),(26,26,'ANTONIO CARLOS','PEDROZA','FREYRE','alejandrahernandeztelpuchcalli@gmail.com'),(27,27,'GLORIA','FABIAN','AYALA',NULL),(28,28,'CARMEN','LEMUS','MADRIGAL',NULL),(29,29,'LUZ MARIA','GOMEZ','JIMENEZ',NULL),(30,30,'VICTOR ISRAEL','ESPINOSA','RAMIREZ',NULL),(31,31,'PATRICIA','TORRES','LUGO',NULL),(32,32,'ERIKA PATRICIA','LARA','SÁNCHEZ',NULL),(33,33,'ARACELI','ANGELES','N',NULL),(34,34,'CLAUDIA','JIMENEZ','VAZQUEZ',NULL),(35,35,'LUIS','MACIAS','VILCHIS',NULL),(36,36,'SANDRA','ORTEGA','N',NULL),(37,37,'MARIO','CASTILLO','GARCÍA',NULL),(38,38,'MARTHA','ESPINOZA','SANCHEZ',NULL),(39,39,'KATIA','DE LASSE','MADRAZO',NULL),(40,40,'IRIS A.','MORENO','CAMARA',NULL),(41,41,'PATRICIA','BALBUENA','N',NULL),(42,42,'MARTHA','MALDONADO','A.',NULL),(43,43,'CINTHYA','SHIBATA','ARRAZOLA',NULL),(44,44,'FERNANDO ISRAEL','MADRID','CHARTT',NULL),(45,45,'ZANTI','HERNÁNDEZ','DE LA VEGA',NULL),(46,46,'AGUSTIN','DÍAZ','GORASTIETA',NULL),(47,47,'MA ELENA','VALERO','CRUZ',NULL),(48,48,'CESAR','VILLA','VELAZQUEZ',NULL),(49,49,'SALVADOR','ANGELES','NEGRETE',NULL),(50,50,'GLADYS','BARRIOS','VELASCO',NULL),(51,51,'LUIS LEOPOLDO','JUAREZ','DOMINGUEZ',NULL),(52,52,'JOSE MANUEL','SANCHEZ','DOMINGUEZ',NULL),(53,53,'ALMA','ANGELICA','ROSALES',NULL),(54,54,'PAOLA','CORDOVA','FUENTES',NULL),(55,55,'JUDITH','OLEA','MARTINEZ',NULL),(56,56,'ADIANA','ZÁRATE','MORALES',NULL),(57,57,'MA ELENA','VAZQUEZ','SANCHEZ',NULL),(58,58,'YESSICA','HERNANDEZ','N',NULL),(59,59,'ANA MARIA','LOPEZ','RAMIREZ',NULL),(60,60,'SANDRA','ROSALES','GARCIA',NULL),(61,61,'EVA','MEJIA','CERVANTES',NULL),(62,62,'SELENE','JIMENEZ','RODRIGUEZ',NULL),(63,63,'JUANA','HERNANDEZ','SANCHEZ',NULL),(64,64,'ANA FABIOLA','OBANDO','MARQUEZ',NULL),(65,65,'DAVID','HERNANDEZ','N',NULL),(66,66,'MARIBEL','VIVAR','N',NULL),(67,67,'ALICIA','TOPETE','CAMPOS',NULL),(68,68,'ROBERTO','AVILA','CHAVEZ',NULL),(69,70,'MARTHA MERCEDES','TIRADO','JUAREZ',NULL),(71,72,'GREGORIO EDUARDO','GARCIA','ZARCO',NULL);
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
) ENGINE=InnoDB AUTO_INCREMENT=433 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `recibocompleto`
--

LOCK TABLES `recibocompleto` WRITE;
/*!40000 ALTER TABLE `recibocompleto` DISABLE KEYS */;
INSERT INTO `recibocompleto` VALUES (400,13,16,20,18,'Alejandra Hernández Quiñones','2024-04-25','25-abr-24','ABRIL 2024','001','CUOTAS DE MANTENIMIENTO Y ADMINISTRACIÓN','130','130','130','130','130','650','SEISCIENTOS CINCUENTA PESOS 00/100 M.N.',10),(401,17,20,24,24,'LAURA S. ZAPATA AGUILAR','2024-03-08','08-mar-24','MARZO 2024','11551-11552','CUOTAS DE MANTENIMIENTO Y ADMINISTRACIÓN','650','','','','','650','SEISCIENTOS CINCUENTA PESOS 00/100 M.N.',10),(402,17,20,25,25,'AGUSTIN DÍAZ GORASTTIETA','2024-03-04','04-mar-24','MARZO 2024','11543','CUOTAS DE MANTENIMIENTO Y ADMINISTRACIÓN','550','','','','','550','QUINIENTOS CINCUENTA PESOS 00/100 M.N.',10),(403,17,20,26,26,'ANTONIO CARLOS PEDROZA FREYRE','2024-03-01','01-mar-24','MARZO 2024','11530','CUOTAS DE MANTENIMIENTO Y ADMINISTRACIÓN','650','','','','','650','SEISCIENTOS CINCUENTA PESOS 00/100 M.N.',10),(404,17,20,27,27,'GLORIA FABIAN AYALA','2024-03-10','10-mar-24','MARZO 2024','11560','CUOTAS DE MANTENIMIENTO Y ADMINISTRACIÓN','650','','','','','650','SEISCIENTOS CINCUENTA PESOS 00/100 M.N.',10),(405,17,20,31,31,'PATRICIA TORRES LUGO','2024-03-09','09-mar-24','MARZO 2024','11555','CUOTAS DE MANTENIMIENTO Y ADMINISTRACIÓN','550','','','','','550','QUINIENTOS CINCUENTA PESOS 00/100 M.N.',10),(406,17,20,32,32,'ERIKA PATRICIA LARA SÁNCHEZ','2024-03-04','04-mar-24','MARZO 2024','11542','CUOTAS DE MANTENIMIENTO Y ADMINISTRACIÓN','650','','','','','650','SEISCIENTOS CINCUENTA PESOS 00/100 M.N.',10),(407,17,20,34,34,'CLAUDIA JIMENEZ VAZQUEZ','2024-03-04','04-mar-24','MARZO 2024','11541','CUOTAS DE MANTENIMIENTO Y ADMINISTRACIÓN','550','','','','','550','QUINIENTOS CINCUENTA PESOS 00/100 M.N.',10),(408,17,20,36,36,'SANDRA ORTEGA N','2024-02-29','29-feb-24','MARZO 2024','11529','CUOTAS DE MANTENIMIENTO Y ADMINISTRACIÓN','650','','','','','650','SEISCIENTOS CINCUENTA PESOS 00/100 M.N.',10),(409,17,20,37,37,'MARIO CASTILLO GARCÍA','2024-03-02','02-mar-24','MARZO 2024','11535','CUOTAS DE MANTENIMIENTO Y ADMINISTRACIÓN','550','','','','','550','QUINIENTOS CINCUENTA PESOS 00/100 M.N.',10),(410,17,20,38,38,'MARTHA ESPINOZA SANCHEZ','2024-03-06','06-mar-24','MARZO 2024','11547','CUOTAS DE MANTENIMIENTO Y ADMINISTRACIÓN','650','','','','','650','SEISCIENTOS CINCUENTA PESOS 00/100 M.N.',10),(411,17,20,40,40,'IRIS A. MORENO CAMARA','2024-03-04','04-mar-24','MARZO 2024','11539','CUOTAS DE MANTENIMIENTO Y ADMINISTRACIÓN','650','','','','','650','SEISCIENTOS CINCUENTA PESOS 00/100 M.N.',10),(412,17,20,41,41,'PATRICIA BALBUENA N','2024-03-09','09-mar-24','MARZO 2024','11556','CUOTAS DE MANTENIMIENTO Y ADMINISTRACIÓN','550','','','','','550','QUINIENTOS CINCUENTA PESOS 00/100 M.N.',10),(413,17,20,42,42,'MARTHA MALDONADO A.','2024-02-29','29-feb-24','MARZO 2024','11526','CUOTAS DE MANTENIMIENTO Y ADMINISTRACIÓN','550','','','','','550','QUINIENTOS CINCUENTA PESOS 00/100 M.N.',10),(414,17,20,43,43,'CINTHYA SHIBATA ARRAZOLA','2024-03-15','15-mar-24','MARZO 2024','11561','CUOTAS DE MANTENIMIENTO Y ADMINISTRACIÓN','650','','','','120.1','770.06','SETECIENTOS SETENTA PESOS 6/100 M.N.',10),(415,17,20,44,44,'FERNANDO ISRAEL MADRID CHARTT','2024-04-03','03-abr-24','MARZO 2024','11537','CUOTAS DE MANTENIMIENTO Y ADMINISTRACIÓN','550','','','','','550','QUINIENTOS CINCUENTA PESOS 00/100 M.N.',10),(416,17,20,48,48,'CESAR VILLA VELAZQUEZ','2024-02-29','29-feb-24','MARZO 2024','11528','CUOTAS DE MANTENIMIENTO Y ADMINISTRACIÓN','550','','','','100.0','650','SEISCIENTOS CINCUENTA PESOS 00/100 M.N.',10),(417,17,20,49,49,'SALVADOR ANGELES NEGRETE','2024-03-01','01-mar-24','MARZO 2024','11532','CUOTAS DE MANTENIMIENTO Y ADMINISTRACIÓN','550','','','','0.4','550.35','QUINIENTOS CINCUENTA PESOS 35/100 M.N.',10),(418,17,20,50,50,'GLADYS BARRIOS VELASCO','2024-03-10','10-mar-24','MARZO 2024','11558','CUOTAS DE MANTENIMIENTO Y ADMINISTRACIÓN','550','','','','','550','QUINIENTOS CINCUENTA PESOS 00/100 M.N.',10),(419,17,20,51,51,'LUIS LEOPOLDO JUAREZ DOMINGUEZ','2024-03-01','01-mar-24','MARZO 2024','11533','CUOTAS DE MANTENIMIENTO Y ADMINISTRACIÓN','550','','','','-250.0','300','TRESCIENTOS PESOS 00/100 M.N.',10),(420,17,20,52,52,'JOSE MANUEL SANCHEZ DOMINGUEZ','2024-03-06','06-mar-24','MARZO 2024','11548','CUOTAS DE MANTENIMIENTO Y ADMINISTRACIÓN','550','','','','','550','QUINIENTOS CINCUENTA PESOS 00/100 M.N.',10),(421,17,20,54,54,'PAOLA CORDOVA FUENTES','2024-03-07','07-mar-24','MARZO 2024','11549','CUOTAS DE MANTENIMIENTO Y ADMINISTRACIÓN','550','','','','','550','QUINIENTOS CINCUENTA PESOS 00/100 M.N.',10),(422,17,20,56,56,'ADIANA ZÁRATE MORALES','2024-03-05','05-mar-24','MARZO 2024','11546','CUOTAS DE MANTENIMIENTO Y ADMINISTRACIÓN','550','','','','','550','QUINIENTOS CINCUENTA PESOS 00/100 M.N.',10),(423,17,20,57,57,'MA ELENA VAZQUEZ SANCHEZ','2024-03-01','01-mar-24','MARZO 2024','11531','CUOTAS DE MANTENIMIENTO Y ADMINISTRACIÓN','550','','','','','550','QUINIENTOS CINCUENTA PESOS 00/100 M.N.',10),(424,17,20,58,58,'YESSICA HERNANDEZ N','2024-03-02','02-mar-24','MARZO 2024','11536','CUOTAS DE MANTENIMIENTO Y ADMINISTRACIÓN','550','','','','','550','QUINIENTOS CINCUENTA PESOS 00/100 M.N.',10),(425,17,20,59,59,'ANA MARIA LOPEZ RAMIREZ','2024-03-05','05-mar-24','MARZO 2024','11545','CUOTAS DE MANTENIMIENTO Y ADMINISTRACIÓN','550','','','','','550','QUINIENTOS CINCUENTA PESOS 00/100 M.N.',10),(426,17,20,63,63,'JUANA HERNANDEZ SANCHEZ','2024-02-29','29-feb-24','MARZO 2024','11527','CUOTAS DE MANTENIMIENTO Y ADMINISTRACIÓN','550','','','','100.0','650','SEISCIENTOS CINCUENTA PESOS 00/100 M.N.',10),(427,17,20,64,64,'ANA FABIOLA OBANDO MARQUEZ','2024-03-07','07-mar-24','MARZO 2024','11550','CUOTAS DE MANTENIMIENTO Y ADMINISTRACIÓN','550','','','','','550','QUINIENTOS CINCUENTA PESOS 00/100 M.N.',10),(428,17,20,65,65,'DAVID HERNANDEZ N','2024-03-01','01-mar-24','MARZO 2024','11534','CUOTAS DE MANTENIMIENTO Y ADMINISTRACIÓN','550','','','','','550','QUINIENTOS CINCUENTA PESOS 00/100 M.N.',10),(429,17,20,66,66,'MARIBEL VIVAR N','2024-03-08','08-mar-24','MARZO 2024','11554','CUOTAS DE MANTENIMIENTO Y ADMINISTRACIÓN','550','','','','','550','QUINIENTOS CINCUENTA PESOS 00/100 M.N.',10),(430,17,20,67,67,'ALICIA TOPETE CAMPOS','2024-03-08','08-mar-24','MARZO 2024','11553','CUOTAS DE MANTENIMIENTO Y ADMINISTRACIÓN','550','','','','1000.0','1550','MIL QUINIENTOS CINCUENTA PESOS 00/100 M.N.',10),(431,17,20,68,68,'ROBERTO AVILA CHAVEZ','2024-03-09','09-mar-24','MARZO 2024','11557','CUOTAS DE MANTENIMIENTO Y ADMINISTRACIÓN','650','','','','','650','SEISCIENTOS CINCUENTA PESOS 00/100 M.N.',10),(432,17,20,72,71,'GREGORIO EDUARDO GARCIA ZARCO','2024-03-05','05-mar-24','MARZO 2024','11544','CUOTAS DE MANTENIMIENTO Y ADMINISTRACIÓN','650','','','','','650','SEISCIENTOS CINCUENTA PESOS 00/100 M.N.',10);
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

-- Dump completed on 2024-04-25 22:51:59
