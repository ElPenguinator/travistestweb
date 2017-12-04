CREATE DATABASE IF NOT EXISTS `humus` DEFAULT CHARACTER SET utf8 COLLATE utf8_bin;
USE `humus`;

CREATE TABLE `Users` (
	`id`			bigint(20)		UNSIGNED	PRIMARY KEY		NOT NULL	AUTO_INCREMENT,
	`firstname`		varchar(50)									NOT NULL,
	`lastname`		varchar(50)									NOT NULL,
	`pseudo`		varchar(50)					UNIQUE			NOT NULL,
	`mail`			varchar(100)								NOT NULL,
	`password`		varbinary(255)								NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE utf8_bin;
