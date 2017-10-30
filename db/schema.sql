-- Drops the todolist if it exists currently --
DROP DATABASE IF EXISTS burgers_db;

-- Creates the "todolist" database --
CREATE DATABASE burgers_db;

USE burgers_db;

CREATE TABLE burgers
(
  id INT NOT NULL AUTO_INCREMENT,
  burger_name VARCHAR(50) NOT NULL,
  devoured BOOLEAN NOT NULL DEFAULT false,
  date DATETIME NOT NULL,
  PRIMARY KEY (id)
);
