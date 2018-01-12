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

-- Dumping structure for procedure pegasus.getJobWithTime
DELIMITER //
CREATE DEFINER=`mullan`@`%` PROCEDURE `getJobWithTime`(
	IN `department` INT





)
BEGIN

select                                                                   
		j.id,                                                              
		DATE_FORMAT(j.pulled_date, '%d-%m-%Y %H:%i:%S') as 'start_date' ,   
		DATE_FORMAT(j.due_date, '%d-%m-%Y') as 'due_date', 
        j.end_date, 
        j.bin,      
        j.id_dept,  
        j.finished,     
        j.orders,
		j.colour_in,
		j.colour_out,
		j.note,   
		concat(SEC_TO_TIME(SUM(TIME_TO_SEC(a.time1))), '|', SEC_TO_TIME(SUM( TIME_TO_SEC( a.time2))), '|', SEC_TO_TIME(SUM( TIME_TO_SEC( a.time3)))) as 'estimated_time'
				                                                                                                                                      
from job_card j inner join (                                                                                                                      
	select                                                                                                                                         
			ac.id_job as id,                                                                                                                         
			ac.qty,                                                                                                                                  
			sec_to_time(cast(TIME_TO_SEC( SUBSTRING_INDEX(c.processTime , '|' , 1))* ac.qty as UNSIGNED)) as time1,                                  
			sec_to_time(cast(TIME_TO_SEC(SUBSTRING_INDEX(SUBSTRING_INDEX(c.processTime , '|' , 2), '|' , -1))* ac.qty as UNSIGNED)) as time2,        
			sec_to_time(cast(TIME_TO_SEC(SUBSTRING_INDEX(c.processTime , '|' , -1))* ac.qty as UNSIGNED)) as time3                                   
	from assoc_component ac                                                                                                                        
	inner join component c on ac.id_component = c.id                                                                                               
) a                                                                                                                                               
on j.id = a.id
where id_dept = department
and j.end_date is null                                                                                                                           
group by j.id;                                                                                                                                    
                            
END//
DELIMITER ;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
                                                                                                                            