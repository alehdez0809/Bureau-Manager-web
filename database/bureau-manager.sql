CREATE DATABASE  IF NOT EXISTS `bureau-manager` /*!40100 DEFAULT CHARACTER SET utf8 */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `bureau-manager`;
-- MySQL dump 10.13  Distrib 8.0.28, for Win64 (x86_64)
--
-- Host: localhost    Database: bureau-manager
-- ------------------------------------------------------
-- Server version	8.0.28

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
  `descripcion_adeudos` varchar(45) NOT NULL,
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
  `contraseña_administrador` varchar(20) NOT NULL,
  PRIMARY KEY (`id_administrador`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `administrador`
--

LOCK TABLES `administrador` WRITE;
/*!40000 ALTER TABLE `administrador` DISABLE KEYS */;
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
  PRIMARY KEY (`id_condominio`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `condominio`
--

LOCK TABLES `condominio` WRITE;
/*!40000 ALTER TABLE `condominio` DISABLE KEYS */;
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
  `id_inquilino` int NOT NULL,
  `numero_departamento` varchar(10) NOT NULL,
  PRIMARY KEY (`id_departamento`),
  KEY `id_edificio_idx` (`id_edificio`),
  KEY `id_inquilino_idx` (`id_inquilino`),
  CONSTRAINT `id_edificio` FOREIGN KEY (`id_edificio`) REFERENCES `edificio` (`id_edificio`) ON UPDATE CASCADE,
  CONSTRAINT `id_inquilino` FOREIGN KEY (`id_inquilino`) REFERENCES `inquilino` (`id_inquilino`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `departamento`
--

LOCK TABLES `departamento` WRITE;
/*!40000 ALTER TABLE `departamento` DISABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `edificio`
--

LOCK TABLES `edificio` WRITE;
/*!40000 ALTER TABLE `edificio` DISABLE KEYS */;
/*!40000 ALTER TABLE `edificio` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fecha de pago`
--

DROP TABLE IF EXISTS `fecha de pago`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fecha de pago` (
  `id_fecha` int NOT NULL AUTO_INCREMENT,
  `dia_fecha` int NOT NULL,
  `mes_fecha` varchar(15) NOT NULL,
  `año_fecha` int NOT NULL,
  PRIMARY KEY (`id_fecha`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fecha de pago`
--

LOCK TABLES `fecha de pago` WRITE;
/*!40000 ALTER TABLE `fecha de pago` DISABLE KEYS */;
/*!40000 ALTER TABLE `fecha de pago` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `inquilino`
--

DROP TABLE IF EXISTS `inquilino`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `inquilino` (
  `id_inquilino` int NOT NULL AUTO_INCREMENT,
  `nombre_inquilino` varchar(45) NOT NULL,
  `apellino_paterno_inquilino` varchar(45) NOT NULL,
  `apellino_materno_inquilino` varchar(45) NOT NULL,
  `correo_inquilino` varchar(45) NOT NULL,
  PRIMARY KEY (`id_inquilino`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inquilino`
--

LOCK TABLES `inquilino` WRITE;
/*!40000 ALTER TABLE `inquilino` DISABLE KEYS */;
/*!40000 ALTER TABLE `inquilino` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `recibo`
--

DROP TABLE IF EXISTS `recibo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `recibo` (
  `id_recibo` int NOT NULL AUTO_INCREMENT,
  `id_condominio` int NOT NULL,
  `id_departamento` int NOT NULL,
  `id_inquilino` int NOT NULL,
  `id_fecha` int NOT NULL,
  `id_concepto` int NOT NULL,
  `id_ordinaria` int NOT NULL,
  `id_extraordinaria` int NOT NULL,
  `id_penalizacion` int NOT NULL,
  `id_reserva` int NOT NULL,
  `id_adeudos` int NOT NULL,
  `id_total` int NOT NULL,
  `id_administrador` int NOT NULL,
  PRIMARY KEY (`id_recibo`),
  KEY `id_condominio_idx` (`id_condominio`),
  KEY `id_departamento_idx` (`id_departamento`),
  KEY `id_inquilino_idx` (`id_inquilino`),
  KEY `id_fecha_idx` (`id_fecha`),
  KEY `id_concepto_idx` (`id_concepto`),
  KEY `id_ordinaria_idx` (`id_ordinaria`),
  KEY `id_extraordinaria_idx` (`id_extraordinaria`),
  KEY `id_penalizacion_idx` (`id_penalizacion`),
  KEY `id_reserva_idx` (`id_reserva`),
  KEY `id_adeudos_idx` (`id_adeudos`),
  KEY `id_total_idx` (`id_total`),
  KEY `id_administrador_idx` (`id_administrador`),
  CONSTRAINT `adeudos` FOREIGN KEY (`id_adeudos`) REFERENCES `adeudos anteriores` (`id_adeudos`) ON UPDATE CASCADE,
  CONSTRAINT `administrador` FOREIGN KEY (`id_administrador`) REFERENCES `administrador` (`id_administrador`) ON UPDATE CASCADE,
  CONSTRAINT `concepto` FOREIGN KEY (`id_concepto`) REFERENCES `concepto de pago` (`id_concepto`) ON UPDATE CASCADE,
  CONSTRAINT `condominio` FOREIGN KEY (`id_condominio`) REFERENCES `condominio` (`id_condominio`) ON UPDATE CASCADE,
  CONSTRAINT `departamento` FOREIGN KEY (`id_departamento`) REFERENCES `departamento` (`id_departamento`) ON UPDATE CASCADE,
  CONSTRAINT `extraordinaria` FOREIGN KEY (`id_extraordinaria`) REFERENCES `cuota extraordinaria` (`id_extraordinaria`) ON UPDATE CASCADE,
  CONSTRAINT `fecha` FOREIGN KEY (`id_fecha`) REFERENCES `fecha de pago` (`id_fecha`) ON UPDATE CASCADE,
  CONSTRAINT `inquilino` FOREIGN KEY (`id_inquilino`) REFERENCES `inquilino` (`id_inquilino`) ON UPDATE CASCADE,
  CONSTRAINT `ordinaria` FOREIGN KEY (`id_ordinaria`) REFERENCES `cuota ordinaria` (`id_ordinaria`) ON UPDATE CASCADE,
  CONSTRAINT `penalizacion` FOREIGN KEY (`id_penalizacion`) REFERENCES `cuota de penalización` (`id_penalizacion`) ON UPDATE CASCADE,
  CONSTRAINT `reserva` FOREIGN KEY (`id_reserva`) REFERENCES `cuota de fondo de reserva` (`id_reserva`) ON UPDATE CASCADE,
  CONSTRAINT `total` FOREIGN KEY (`id_total`) REFERENCES `total pagado` (`id_total`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `recibo`
--

LOCK TABLES `recibo` WRITE;
/*!40000 ALTER TABLE `recibo` DISABLE KEYS */;
/*!40000 ALTER TABLE `recibo` ENABLE KEYS */;
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

-- Dump completed on 2023-04-14 16:09:34

