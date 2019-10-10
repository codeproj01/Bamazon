const mysql = require('mysql');
const inquirer = require('inquirer');
let Table = require("cli-table");

let connection = mysql.createConnection({
    host: "localhost",
    port: 3307,
    user: "root",
    password: "root",
    database: "bamazon_db"
});

connection.connect(function (err) {
    if (err) throw err;
});

function initManagerView() {
    inquirer.prompt([
        {
            type: "list",
            name: "option",
            message: "WELCOME to Bamazon StoreFront! Please select a choice?",
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
                choice.displayInventory();
                break;
            case "Add New Product":
                choice.addNewProduct();
                break;
            default:
                console.log("Terminating!");
                break;
        }
    })
};

let choice = {
    viewProductsForSale: function () {
        connection.query("SELECT * FROM products", function (err, res) {
            if (err) throw err;
            
            let table = new Table({
                head: ["item_id", "product_name", "price", "stock_quantity"],
                colWidths: [10, 20, 10, 15]
            });
            console.log(res.length);
            for (let i = 0; i < res.length; i++){
                table.push([res[i].item_id, res[i].product_name, res[i].price], res[i].stock_quantity)
            }
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

    addNewProduct: function () {
        inquirer.prompt([
            {
                name: "item",
                message: "Enter new product you would like to add?"
            },
            {
                name: "dept",
                message: "Enter department it will belong to?"
            },
            {
                name: "price",
                message: "Enter the price of the item?"
            },
            {
                name: "quantity",
                message: "How many of the items would you like to order?"
            }
        ]).then(function (answer) {
            connection.query("INSERT INTO products SET ?", {product_name: answer.item, department_name: answer.dept, price: answer.price, stock_quantity: answer.quantity, product_sales: 0}, 
		function (err, res) {
                    if (err) throw err;
                    console.log("Product Inserted Successfully!");
                })
        })
    },

    addInventory: function () {

        inquirer.prompt([
            {
                name: "product",
                message: "Enter product you want to order more inventory for?"
            },
            {
                name: "updatedQuantity",
                message: "How many more would you like to order?"
            }
        ]).then(function (answer) {
            connection.query("SELECT * FROM products WHERE product_name=?", answer.product, function (err, res) {
                if (err) throw err;
                let newTotal = parseInt(res[0].quantity) + parseInt(answer.updatedQuantity);
                choice.updateInventory(answer.product, newTotal);
            })
        })
    },

    updateInventory: function (product, quantity) {
        connection.query("UPDATE products SET quantity=? WHERE product_name=?", [quantity, product], function (err, res) {
            if (err) throw err;
            console.log("Inventory updated successfully!");
        })

    },

    displayInventory: function(){
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

initManagerView();