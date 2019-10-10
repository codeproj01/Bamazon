-- INSERT INTO DEPARTMENT --
INSERT INTO departments (department_name, over_head_costs)
VALUES ("Electronics", 1000), ("Clothing", 2000),("Kitchen Appliances", 3000),("Cosmetics", 4000),("School Supplies", 5000),("Shoes", 6000),("Automotive", 7000), ("Toys", 8000);

-- INSERT INTO PRODUCTS --
INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales )
VALUES ("Panasonic TV", "Electronics",750.00, 6, 3000), ("HP Office Printer", "Electronics", 250, 7, 4000);

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales )
VALUES ("Nike Shirt", "Clothing",120.00, 3, 4400), ("Designer Jeans", "Clothing", 175.00, 2, 4800);

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales )
VALUES ("Frigidaire Dual Ranges", "Kitchen Appliances", 350.00, 3, 5000), ("Microwave Oven", "Kitchen Appliances", 650.00, 2, 5400);

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales )
VALUES ("Nail Polish", "Cosmetics", 50.00, 6, 6000), ("Hair Care", "Cosmetics", 10.00, 7, 6400);

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales )
VALUES ("Lunchbox", "School Supplies",150.00, 6, 3000), ("Erasers", "School Supplies", 250, 7, 4000);

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales )
VALUES ("Jordan Sneakers", "Shoes",220.00, 3, 3400), ("Puma", "Shoes", 175.00, 2, 5200);

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales )
VALUES ("Jump-Starter", "Automotive", 350.00, 3, 8400), ("GPS", "Automotive", 150.00, 6, 8200);

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales )
VALUES ("Bicycles", "Toys", 50.00, 6, 9000), ("Balls and Bats", "Toys", 50.00, 3, 9300);