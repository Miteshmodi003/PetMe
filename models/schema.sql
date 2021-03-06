DROP DATABASE IF EXISTS petmeshelter_db;

CREATE DATABASE petmeshelter_db;

USE petmeshelter_db;

CREATE TABLE pets (
	id INTEGER NOT NULL AUTO_INCREMENT,
    pet_type VARCHAR(255) NOT NULL,	
	age VARCHAR(255) NOT NULL,	
	breed VARCHAR(255) NOT NULL,
	zip_code VARCHAR(255) NOT NULL,
	pet_name VARCHAR(255),
    image LONGBLOB,
	adopted BOOLEAN NOT NULL DEFAULT FALSE,
	admin_id INTEGER NOT NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (admin_id) REFERENCES admin(id)
);

CREATE TABLE customers (
	id INTEGER NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(255) NOT NULL,	
	last_name VARCHAR(255) NOT NULL,	
	email VARCHAR(255) NOT NULL,
	password VARCHAR(255) NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE admin (
	id INTEGER NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(255) NOT NULL,	
	last_name VARCHAR(255) NOT NULL,	
	role VARCHAR(255) NOT NULL,
	PRIMARY KEY (id)
);