const mysql = require('mysql');
const inquirer = require('inquirer');
const Table = require("cli-table");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3307,
    user: "root",
    password: "root",
    database: "bamazon_db"
});

connection.connect(function (err) {
    if (err) throw err;
});


function initManagerChoices() {
    inquirer.prompt([
        {
            type: "list",
            name: "option",
            message: "Select from your menu choices",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product", "Quit"]

        }
    ]).then(function (answer) {
        switch (answer.option) {
            case "View Products for Sale":
                choice.viewProductsForSale();
                break;
            case "View Low Inventory":
                choice.viewLowInventory();
                break;
            case "Add to Inventory":
                choice.showInventory();
                break;
            case "Add New Product":
                choice.addProduct();
                break;
            default:
                console.log("Exiting!");
                connection.end();
                break;
        }
    })
};

let choice = {
    viewProductsForSale: function () {
        connection.query("SELECT * FROM products", function (err, res) {
            if (err) throw err;
            
            let table = new Table({
                head: ["item_id", "product_name", "price"]
            });

            for (let i = 0; i < res.length; i++){
                table.push([res[i].item_id, res[i].product_name, res[i].price])
            };
            console.log(table.toString());
        });
    },
    viewLowInventory: function (){
        connection.query("SELECT * FROM products WHERE stock_quantity < 3", function (err, res) {
            if (err) throw err;

            let table = new Table({
               head: ["item_id", "product_name", "department_name", "stock_quantity"]
            });

            for (let i = 0; i < res.length; i++){
                table.push([res[i].item_id, res[i].product_name, res[i].department_name, res[i].stock_quantity])
            };
            console.log(table.toString());

            })
    },
    addProduct: function () {
        inquirer.prompt([
            {
                name: "item",
                message: "What new product would you like to add?"
            },
            {
                name: "dept",
                message: "What department does this belong in?"
            },
            {
                name: "price",
                message: "What is the price of this item?"
            },
            {
                name: "quantity",
                message: "How many would you like to order?"
            }
        ]).then(function (answer) {
            connection.query("INSERT INTO products SET ?",
                {
                    product_name: answer.item,
                    department_name: answer.dept,
                    price: answer.price,
                    stock_quantity: answer.quantity,
                    product_sales: 0
                }, function (err, res) {
                    if (err) throw err;
                    console.log("Product Inserted Successfully!");
                })
        })
    },
    addInventory: function () {


        inquirer.prompt([
            {
                name: "product",
                message: "For which product would you like to order more inventory?"
            },
            {
                name: "quantityFromUserInput",
                message: "How many more would you like to order?",
                validate: function(value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                    }
            }
        ]).then(function (answer) {
            connection.query("SELECT * FROM products WHERE ?", [{item_id: answer.product}], function (err, res) {
                if (err) throw err;
            
                let newTotal = parseInt(res[0].stock_quantity) + parseInt(answer.quantityFromUserInput);
                console.log("\nNew Quantity is now " + newTotal);
                choice.updateInventory(answer.product, newTotal);
            })
        })
    },
    updateInventory: function (product, quantity) {
        connection.query("UPDATE products SET stock_quantity=? WHERE product_name=?", [quantity, product], function (err, res) {
            if (err) throw err;
            console.log("Inventory updated successfully!");
        })

    },
    showInventory: function(){
             connection.query("SELECT * FROM products", function (err, res) {
            if (err) throw err;
            
            let table = new Table({
                head: ["item_id", "product_name", "price", "quantity"]
            });

            for (let i = 0; i < res.length; i++){
                table.push([res[i].item_id, res[i].product_name, res[i].price, res[i].stock_quantity])
            };
            console.log(table.toString());
            choice.addInventory();
        });
        
    }
}

initManagerChoices();