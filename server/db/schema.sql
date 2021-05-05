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
  `Category` CHAR(30) NULL DEFAULT NULL,
  `Description` VARCHAR(255) NULL DEFAULT NULL,
  `Slogan` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'Styles'
--
-- ---

DROP TABLE IF EXISTS `Styles`;

CREATE TABLE `Styles` (
  `styleID` INTEGER NOT NULL DEFAULT NULL,
  `name` VARCHAR(255) NULL DEFAULT NULL,
  `originalPrice` INT NULL DEFAULT NULL,
  `salePrice` INTEGER NULL DEFAULT NULL,
  `productID` INTEGER NULL DEFAULT NULL,
  `defaultStyle` TINYINT(2) NULL DEFAULT NULL,
  PRIMARY KEY (`styleID`)
);

-- ---
-- Table 'Photos'
--
-- ---

DROP TABLE IF EXISTS `Photos`;

CREATE TABLE `Photos` (
  `photoID` INTEGER(255) NULL AUTO_INCREMENT DEFAULT NULL,
  `url` VARCHAR(255) NOT NULL DEFAULT 'NULL',
  `thumbnailUrl` INTEGER NULL DEFAULT NULL,
  `styleID` INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (`photoID`)
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
-- Table 'Related'
--
-- ---

DROP TABLE IF EXISTS `Related`;

CREATE TABLE `Related` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `productID1` INTEGER NULL DEFAULT NULL,
  `productID2` INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Foreign Keys
-- ---

ALTER TABLE `Styles` ADD FOREIGN KEY (productID) REFERENCES `Product` (`id`);
ALTER TABLE `Photos` ADD FOREIGN KEY (styleID) REFERENCES `Styles` (`styleID`);
ALTER TABLE `SKUs` ADD FOREIGN KEY (styleID) REFERENCES `Styles` (`styleID`);
ALTER TABLE `Features` ADD FOREIGN KEY (productID) REFERENCES `Product` (`id`);
ALTER TABLE `Related` ADD FOREIGN KEY (productID1) REFERENCES `Product` (`id`);
ALTER TABLE `Related` ADD FOREIGN KEY (productID2) REFERENCES `Product` (`id`);

-- ---
-- Table Properties
-- ---

-- ALTER TABLE `Product` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Styles` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Photos` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `SKUs` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Features` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Related` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---

-- INSERT INTO `Product` (`id`,`Name`,`Category`,`Description`,`Slogan`) VALUES
-- ('','','','','');
-- INSERT INTO `Styles` (`styleID`,`name`,`originalPrice`,`salePrice`,`productID`,`defaultStyle`) VALUES
-- ('','','','','','');
-- INSERT INTO `Photos` (`photoID`,`url`,`thumbnailUrl`,`styleID`) VALUES
-- ('','','','');
-- INSERT INTO `SKUs` (`id`,`quantity`,`size`,`styleID`) VALUES
-- ('','','','');
-- INSERT INTO `Features` (`id`,`name`,`value`,`productID`) VALUES
-- ('','','','');
-- INSERT INTO `Related` (`id`,`productID1`,`productID2`) VALUES
-- ('','','');