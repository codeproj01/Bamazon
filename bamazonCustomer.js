const mysql = require("mysql");
const inquirer = require("inquirer");
let Table = require("cli-table");

let connection = mysql.createConnection({
    host: "localhost",
    port: 3307,
    user: "root",
    password: "root",
    database: "bamazon_db"
});

connection.connect(function(err) {
    if (err) throw err;
    ProductsInStock();
});

function ProductsInStock() {
    console.log("\nList of Items, Prices and Instock Quantity: \n");
    connection.query("SELECT item_id, product_name, price, stock_quantity FROM products", function(err, results) {
        if (err) throw err;
        let table = new Table(
            {
             head: ['Item ID', 'Item', 'Price', 'Stock Qnty'],
             colWidths: [10, 25, 8, 12]
            }
         );
         for (let i = 0; i < results.length; i++){
            table.push([results[i].item_id, results[i].product_name, results[i].price, results[i].stock_quantity])
        }
        console.log(table.toString());
        shopForProducts();
    });
};

function shopForProducts() {
    inquirer.prompt([
        {
            name: "itemID",
            type: "input",
            message: "Enter ID Number of the Item you want to purchase: ",
            validate: function (value) {
                if (isNaN(value) == false) {
                  return true;
                } else {
                  return false;
                }
              }
            
        },
        {
            name: "quantity",
            type: "input",
            message: "Enter the number of items you will like to purchase:",
            validate: function (value) {
                if (isNaN(value) == false) {
                  return true;
                } else {
                  return false;
                }
              }
        }
    ]).then(function(answer) {
        connection.query("SELECT item_id, product_name, stock_quantity, price FROM products WHERE ?", { item_id: answer.itemID }, function(err, results) {
            if (err) throw err;
            console.log(results[0].stock_quantity);
            if (results[0].stock_quantity >= answer.quantity) {
               let itemsLeft = results[0].stock_quantity - answer.quantity;
               let totalAmtPurchased = answer.quantity * results[0].price;
               connection.query(`UPDATE products SET stock_quantity=${itemsLeft} WHERE item_id=${answer.itemID}`, function(err, results) {
                    if (err) throw err;
                    console.log(`Your total is: ${totalAmtPurchased}`);
                    shopForMoreProducts();
                });
            } 
            else {
                console.log("Insufficient quantity!");
                shopForMoreProducts();
            }
        })
    })
}

function shopForMoreProducts () {
    inquirer.prompt([
        {
            name: "continue",
            type: "confirm",
            message: "Would you like to shop for more products? "
        }
    ]).then(function (answer) {
        if (answer.continue) {
            ProductsInStock();
        } else {
            connection.query("SELECT * FROM products", function(err, results) {
                if (err) throw err;
                let table = new Table(
                    {
                     head: ['Item ID', 'Product name', 'Dept Name', 'Price', 'Stock Qnty', 'Product Sales'],
                     colWidths: [10, 20, 25, 8, 15, 15]
                    }
                 );
                 for (let i = 0; i < results.length; i++){
                    table.push([results[i].item_id, results[i].product_name, results[i].department_name, results[i].price, results[i].stock_quantity, results[i].product_sales])
                }
                console.log(table.toString());
            });
            console.log("Inventory of Merchandize!");
	    console.log("Thank You!!  Good Bye!!!");
        }
    })
}