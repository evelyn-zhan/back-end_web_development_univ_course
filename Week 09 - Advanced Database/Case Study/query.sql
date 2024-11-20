CREATE DATABASE crud_db;

CREATE TABLE product (
	product_id INT AUTO_INCREMENT PRIMARY KEY,
    product_name VARCHAR(30) NOT NULL,
    product_price INT NOT NULL
);