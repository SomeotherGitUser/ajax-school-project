/*
SQLyog Community v13.0.1 (64 bit)
MySQL - 10.1.31-MariaDB : Database - ajax_project
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`ajax_project` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_bin */;

USE `ajax_project`;

/*Table structure for table `playlists` */

DROP TABLE IF EXISTS `playlists`;

CREATE TABLE `playlists` (
  `playlist_id` int(255) NOT NULL AUTO_INCREMENT,
  `playlist_url` text COLLATE utf8_bin,
  `playlist_name` text COLLATE utf8_bin NOT NULL,
  `playlist_songs` text COLLATE utf8_bin,
  PRIMARY KEY (`playlist_id`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

/*Data for the table `playlists` */

insert  into `playlists`(`playlist_id`,`playlist_url`,`playlist_name`,`playlist_songs`) values 
(1,'www.gmail.com','a name name',NULL),
(2,'www.run.com','this is coming from the input',NULL),
(3,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQp7htEXYIfd-6aLDUliXv-fnEliDyA2qg8hJduGMmke9N3Or29sQ','porn playlist',NULL),
(4,'www.jojo.com','ta very jojoing playlist',NULL),
(6,'https://www.billboard.com/files/styles/900_wide/public/media/Public-Enemy-Fear-of-a-Black-Planet-album-covers-billboard-1000x1000.jpg','Dynamic Playlist','21,22,23,24'),
(11,'manual test playlist','manuel',NULL),
(12,'testing update exist','value is12',NULL),
(13,'max test playlist','maxed out',NULL),
(14,'max test playlist','maxed out',NULL),
(15,'max test playlist','maxed out',NULL),
(16,'max test playlist','maxed out',NULL),
(41,'max test playlist','maxed out',NULL),
(42,'www.gmail.com','a name name',NULL);

/*Table structure for table `songs` */

DROP TABLE IF EXISTS `songs`;

CREATE TABLE `songs` (
  `song_id` int(255) NOT NULL AUTO_INCREMENT,
  `song_name` text COLLATE utf8_bin,
  `song_url` text COLLATE utf8_bin,
  `song_playlist` int(255) DEFAULT NULL,
  PRIMARY KEY (`song_id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

/*Data for the table `songs` */

insert  into `songs`(`song_id`,`song_name`,`song_url`,`song_playlist`) values 
(1,'a test song','www.youtube.com',1),
(2,'another test song','my test song.html',2),
(9,'[object Object]','[object Object]',36),
(10,'[object Object]','[object Object]',37),
(11,'[object Object]','[object Object]',38),
(12,'[object Object]','[object Object]',38),
(13,'[object Object]','[object Object]',38),
(14,'[object Object]','[object Object]',38),
(15,'[object Object]','[object Object]',38),
(16,'[object Object]','[object Object]',38),
(17,'[object Object]','[object Object]',38),
(18,'[object Object]','[object Object]',38),
(19,'[object Object]','[object Object]',39),
(20,'a new song','www.deathstart.cumin',40),
(21,'update son','go go power rangers',12),
(22,'AC_ATI.mp3','https://archive.org/download/mythium/',NULL),
(23,'AC_ATKMTake_1.mp3','https://archive.org/download/mythium/',NULL),
(24,'AC_TSOWAfucked_up.mp3','https://archive.org/download/mythium/',NULL);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
