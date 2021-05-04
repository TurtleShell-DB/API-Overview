-- ---
-- Globals
-- ---

-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;

-- ---
-- Table 'Product'
--
-- ---

DROP TABLE IF EXISTS `Product`;

CREATE TABLE `Product` (
  `id` INTEGER NOT NULL DEFAULT NULL,
  `Name` VARCHAR(255) NOT NULL DEFAULT 'NULL',
  `Price` INT(255) NOT NULL DEFAULT NULL,
  `Category` CHAR(30) NULL DEFAULT NULL,
  `Description` VARCHAR(255) NULL DEFAULT NULL,
  `Slogan` VARCHAR(255) NULL DEFAULT NULL,
  `Default Price` INT(255) NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'Styles'
--
-- ---

DROP TABLE IF EXISTS `Styles`;

CREATE TABLE `Styles` (
  `id` INTEGER NOT NULL DEFAULT NULL,
  `name` VARCHAR(255) NULL DEFAULT NULL,
  `OG price` INT NULL DEFAULT NULL,
  `Sale Price` INTEGER NULL DEFAULT NULL,
  `id` INTEGER NULL DEFAULT NULL,
  `default?` TINYINT(2) NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'Photos'
--
-- ---

DROP TABLE IF EXISTS `Photos`;

CREATE TABLE `Photos` (
  `id` INTEGER(255) NULL AUTO_INCREMENT DEFAULT NULL,
  `url` VARCHAR(255) NOT NULL DEFAULT 'NULL',
  `thumbnail_url` INTEGER NULL DEFAULT NULL,
  `styleID` INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'SKUs'
--
-- ---

DROP TABLE IF EXISTS `SKUs`;

CREATE TABLE `SKUs` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `quantity` INTEGER(255) NULL DEFAULT NULL,
  `size` CHAR(30) NULL DEFAULT NULL,
  `styleID` INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'Features'
--
-- ---

DROP TABLE IF EXISTS `Features`;

CREATE TABLE `Features` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `name` VARCHAR(255) NULL DEFAULT NULL,
  `value` VARCHAR(255) NULL DEFAULT NULL,
  `productID` INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Foreign Keys
-- ---

ALTER TABLE `Styles` ADD FOREIGN KEY (id) REFERENCES `Product` (`id`);
ALTER TABLE `Photos` ADD FOREIGN KEY (styleID) REFERENCES `Styles` (`id`);
ALTER TABLE `SKUs` ADD FOREIGN KEY (styleID) REFERENCES `Styles` (`id`);
ALTER TABLE `Features` ADD FOREIGN KEY (productID) REFERENCES `Product` (`id`);

-- ---
-- Table Properties
-- ---

-- ALTER TABLE `Product` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Styles` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Photos` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `SKUs` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Features` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---

-- INSERT INTO `Product` (`id`,`Name`,`Price`,`Category`,`Description`,`Slogan`,`Default Price`) VALUES
-- ('','','','','','','');
-- INSERT INTO `Styles` (`id`,`name`,`OG price`,`Sale Price`,`id`,`default?`) VALUES
-- ('','','','','','');
-- INSERT INTO `Photos` (`id`,`url`,`thumbnail_url`,`styleID`) VALUES
-- ('','','','');
-- INSERT INTO `SKUs` (`id`,`quantity`,`size`,`styleID`) VALUES
-- ('','','','');
-- INSERT INTO `Features` (`id`,`name`,`value`,`productID`) VALUES
-- ('','','','');