/* If database already exsits drop it and overwrite it */
DROP DATABASE IF EXISTS burgers_db;

/* Creating and using database */
CREATE DATABASE burgers_db;
USE burgers_db;

/* New tables with primary keys that auto-increments and ids that refer to other tables */
CREATE TABLE burgers (
  id INT NOT NULL AUTO_INCREMENT,
  burger VARCHAR(100) NOT NULL,
  devoured BOOLEAN DEFAULT false,
  PRIMARY KEY (id)
);