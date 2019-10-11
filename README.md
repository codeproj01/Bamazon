# Bamazon
Amazon-like storefront with the MySQL

Node.js & MySQL

Overview

https://bamazon-2019.herokuapp.com/

Create an Amazon-like storefront with the MySQL skills you learned this unit. The app will take in orders from customers and deplete stock from the store's inventory. As a bonus task, you can program your app to track product sales across your store's departments and then provide a summary of the highest-grossing departments in the store.
Make sure you save and require the MySQL and Inquirer npm packages in your homework files--your app will need them for data input and storage.
__________________________________________________

Challenge #1: Customer View (Minimum Requirement)
__________________________________________________
Create a MySQL Database called bamazon.

Then create a Table inside of that database called products.

The products table should have each of the following columns:

item_id (unique id for each product)

product_name (Name of product)

department_name

price (cost to customer)

stock_quantity (how much of the product is available in stores)


__________________________________________________

Challenge #2: Manager View (Next Level)
__________________________________________________
If a manager selects View Products for Sale, the app should list every available item: the item IDs, names, prices, and quantities.

If a manager selects View Low Inventory, then it should list all items with an inventory count lower than five.

If a manager selects Add to Inventory, your app should display a prompt that will let the manager "add more" of any item currently in the store.

If a manager selects Add New Product, it should allow the manager to add a completely new product to the store.

__________________________________________________

Challenge #3: Supervisor View (Final Level)
__________________________________________________
Create a new MySQL table called departments. Your table should include the following columns:

department_id

department_name

over_head_costs (A dummy number you set for each department)