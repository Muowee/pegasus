-- --------------------------------------------------------
-- Host:                         192.168.1.150
-- Server version:               10.1.28-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win32
-- HeidiSQL Version:             9.4.0.5125
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Dumping database structure for pegasus
CREATE DATABASE IF NOT EXISTS `pegasus` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `pegasus`;

-- Dumping structure for table pegasus.assoc_component
CREATE TABLE IF NOT EXISTS `assoc_component` (
  `id_component` int(11) NOT NULL,
  `qty` int(11) NOT NULL,
  `description` varchar(500) DEFAULT NULL,
  `id_job` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table pegasus.assoc_component: ~9 rows (approximately)
DELETE FROM `assoc_component`;
/*!40000 ALTER TABLE `assoc_component` DISABLE KEYS */;
INSERT INTO `assoc_component` (`id_component`, `qty`, `description`, `id_job`) VALUES
	(0, 156, '2', 0),
	(0, 156, 'jygtfjkhguitfuiombhjkl', 3),
	(2, 5, '400mm x 42 mm Wall Plate with Strap', 4),
	(1, 16, '140mm x 42 mm Wall Plate with Strap', 5),
	(4, 52, '600mm Ring for Leighlan', 6),
	(6, 25, '280mm Floor Lamp Base', 6),
	(1, 35, '140mm x 42 mm Wall Plate with Strap', 6),
	(4, 65, '600mm Ring for Leighlan', 7),
	(6, 12, '280mm Floor Lamp Base', 7);
/*!40000 ALTER TABLE `assoc_component` ENABLE KEYS */;

-- Dumping structure for table pegasus.assoc_dept
CREATE TABLE IF NOT EXISTS `assoc_dept` (
  `id_job` int(11) NOT NULL,
  `status` int(11) DEFAULT NULL,
  `id_dept` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table pegasus.assoc_dept: ~0 rows (approximately)
DELETE FROM `assoc_dept`;
/*!40000 ALTER TABLE `assoc_dept` DISABLE KEYS */;
/*!40000 ALTER TABLE `assoc_dept` ENABLE KEYS */;

-- Dumping structure for table pegasus.component
CREATE TABLE IF NOT EXISTS `component` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(250) DEFAULT NULL,
  `Description` varchar(500) NOT NULL,
  `processTime` varchar(100) NOT NULL DEFAULT '''00:00:00|00:00:00|00:00:00''',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=latin1 COMMENT='processTime : Antiquing:Powdercoating:Polishing';

-- Dumping data for table pegasus.component: ~7 rows (approximately)
DELETE FROM `component`;
/*!40000 ALTER TABLE `component` DISABLE KEYS */;
INSERT INTO `component` (`id`, `Name`, `Description`, `processTime`) VALUES
	(1, 'INTE-140WALLPLATE ', '140mm x 42 mm Wall Plate with Strap', '00:01:00|00:00:30|00:00:00'),
	(2, 'INTE-400WALLPLATE', '400mm x 42 mm Wall Plate with Strap', '00:02:30|00:02:30|00:00:00'),
	(3, 'INTE-400RING ', '400mm Ring for Leighlan', '00:01:00|00:01:00|00:00:00'),
	(4, 'INTE-600RING ', '600mm Ring for Leighlan', '00:00:30|00:00:00|00:00:00'),
	(5, 'INTE-200TABLEBASE ', '200 mm Table Lamp Base', '00:00:45|00:00:00|00:00:00'),
	(6, 'INTE-280FLOORBASE ', '280mm Floor Lamp Base', '00:05:00|00:00:00|00:00:00'),
	(7, 'INTE-360PICTURETUBE', '360mm Picture Light Tube with Side Caps', '00:06:00|00:00:00|00:00:00');
/*!40000 ALTER TABLE `component` ENABLE KEYS */;

-- Dumping structure for table pegasus.department
CREATE TABLE IF NOT EXISTS `department` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` tinytext NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

-- Dumping data for table pegasus.department: ~3 rows (approximately)
DELETE FROM `department`;
/*!40000 ALTER TABLE `department` DISABLE KEYS */;
INSERT INTO `department` (`id`, `name`) VALUES
	(1, 'Polishing'),
	(2, 'Antiquing'),
	(3, 'Powder Coating');
/*!40000 ALTER TABLE `department` ENABLE KEYS */;

-- Dumping structure for table pegasus.job_card
CREATE TABLE IF NOT EXISTS `job_card` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `start_date` date NOT NULL,
  `dispatched_date` date NOT NULL,
  `end_date` date DEFAULT NULL,
  `bin` varchar(50) DEFAULT NULL,
  `id_dept` int(11) NOT NULL,
  `components` varchar(500) NOT NULL,
  `type` varchar(50) NOT NULL,
  `orders` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;

-- Dumping data for table pegasus.job_card: ~6 rows (approximately)
DELETE FROM `job_card`;
/*!40000 ALTER TABLE `job_card` DISABLE KEYS */;
INSERT INTO `job_card` (`id`, `start_date`, `dispatched_date`, `end_date`, `bin`, `id_dept`, `components`, `type`, `orders`) VALUES
	(2, '2017-12-14', '2017-12-15', NULL, '5651', 2, '', '651', '5656265|651|531'),
	(3, '2017-12-14', '2017-12-15', NULL, '5651', 2, '', '651', '5656265|651|531'),
	(4, '2017-12-14', '2017-12-28', NULL, '465164', 3, '2', 'antique silver', '84545'),
	(5, '2017-12-15', '2017-12-16', NULL, '5151', 2, '1', 'antique silver', '1354'),
	(6, '2017-12-15', '2017-12-22', NULL, 'ML/25', 2, '4|6|1', 'ANT/BRASS', '19965'),
	(7, '2017-12-15', '2017-12-21', NULL, '351', 3, '4|6', 'black', '156');
/*!40000 ALTER TABLE `job_card` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
