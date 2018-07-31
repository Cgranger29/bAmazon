CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
	item_id INTEGER(11) NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(30) NOT NULL,
    department_name VARCHAR(10) NOT NULL,
    price DECIMAL(20, 2) NOT NULL,
    stock_quantity INTEGER(20),
    PRIMARY KEY (item_id)
);

INSERT INTO products (item_id, product_name, department_name, price,stock_quantity)
	VALUES(1111,"Baseball","Sports",10.00,1000);
    