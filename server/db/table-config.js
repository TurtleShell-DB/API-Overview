const Promise = require('bluebird');

module.exports = (db) => {
  if (!db.queryAsync) {
    db = Promise.promisifyAll(db);
  }
  return db.queryAsync(`
    CREATE TABLE IF NOT EXISTS Products (
      id INTEGER NOT NULL,
      name VARCHAR(255) NOT NULL,
      category CHAR(30) NULL DEFAULT NULL,
      description MEDIUMTEXT NULL DEFAULT NULL,
      slogan VARCHAR(255) NULL DEFAULT NULL,
      PRIMARY KEY (id)
    );`)
    .then(() => db.queryAsync(`
        CREATE TABLE IF NOT EXISTS Styles (
          styleID INTEGER NOT NULL,
          name VARCHAR(255) NULL DEFAULT NULL,
          originalPrice INT NULL DEFAULT NULL,
          salePrice INTEGER NULL DEFAULT NULL,
          productID INTEGER NULL DEFAULT NULL,
          defaultStyle TINYINT(2) NULL DEFAULT NULL,
          PRIMARY KEY (styleID)
        );
      `))
    .then(() => db.queryAsync(`
        CREATE TABLE IF NOT EXISTS Photos (
          photoID INTEGER(255) NOT NULL AUTO_INCREMENT,
          url VARCHAR(255) NOT NULL DEFAULT 'NULL',
          thumbnailUrl VARCHAR(255) NULL DEFAULT NULL,
          styleID INTEGER NULL DEFAULT NULL,
          PRIMARY KEY (photoID)
        );
      `))
    .then(() => db.queryAsync(`
        CREATE TABLE IF NOT EXISTS SKUs (
          id INTEGER NOT NULL AUTO_INCREMENT,
          quantity INTEGER(255) NULL DEFAULT NULL,
          size CHAR(30) NULL DEFAULT NULL,
          styleID INTEGER NULL DEFAULT NULL,
          PRIMARY KEY (id)
        );
      `))
    .then(() => db.queryAsync(`
        CREATE TABLE IF NOT EXISTS Features (
          id INTEGER NOT NULL,
          feature VARCHAR(255) NULL DEFAULT NULL,
          value VARCHAR(255) NULL DEFAULT NULL,
          productID INTEGER NOT NULL,
          PRIMARY KEY (id)
        );
      `))
    .then(() => db.queryAsync(`
        CREATE TABLE IF NOT EXISTS Related (
          id INTEGER NOT NULL,
          productID1 INTEGER NOT NULL,
          productID2 INTEGER NOT NULL,
          PRIMARY KEY (id)
        );
      `))
    .then(() => db.queryAsync(`
        SET FOREIGN_KEY_CHECKS=0;
    `))
    .then(() => db.queryAsync(`
        ALTER TABLE Features ADD FOREIGN KEY (productID) REFERENCES Products (id);
    `))
    .then(() => db.queryAsync(`
        ALTER TABLE Related ADD FOREIGN KEY (productID1) REFERENCES Products (id);
    `))
    .then(() => db.queryAsync(`
        ALTER TABLE Related ADD FOREIGN KEY (productID2) REFERENCES Products (id);
    `))
    .then(() => db.queryAsync(`
        ALTER TABLE Styles ADD FOREIGN KEY (productID) REFERENCES Products (id);
    `))
    .then(() => db.queryAsync(`
        ALTER TABLE Photos ADD FOREIGN KEY (styleID) REFERENCES Styles (styleID);
    `))
    .then(() => db.queryAsync(`
        ALTER TABLE SKUs ADD FOREIGN KEY (styleID) REFERENCES Styles (styleID);
    `))
    .catch((err) => console.log(err));
};

// -- ---
// -- Foreign Keys
// -- ---

// -- ---
// -- Table Properties
// -- ---

// ALTER TABLE `Product` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
// ALTER TABLE `Styles` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
// ALTER TABLE `Photos` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
// ALTER TABLE `SKUs` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
// ALTER TABLE `Features` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
// ALTER TABLE `Related` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

// -- ---
// -- Test Data
// -- ---

// -- INSERT INTO `Product` (`id`,`Name`,`Category`,`Description`,`Slogan`) VALUES
// -- ('','','','','');
// -- INSERT INTO `Styles` (`styleID`,`name`,`originalPrice`,`salePrice`,`productID`,`defaultStyle`) VALUES
// -- ('','','','','','');
// -- INSERT INTO `Photos` (`photoID`,`url`,`thumbnailUrl`,`styleID`) VALUES
// -- ('','','','');
// -- INSERT INTO `SKUs` (`id`,`quantity`,`size`,`styleID`) VALUES
// -- ('','','','');
// -- INSERT INTO `Features` (`id`,`name`,`value`,`productID`) VALUES
// -- ('','','','');
// -- INSERT INTO `Related` (`id`,`productID1`,`productID2`) VALUES
// -- ('','','');
