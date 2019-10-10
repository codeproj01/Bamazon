const Table = require("cli-table");
const mysql = require("mysql");
const inquirer = require ("inquirer");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3307,
    user: "root",
    password: "root",
    database: "bamazon_db"
});

connection.connect(function(err){
    if (err) throw err;
});

inquirer.prompt([
    {
        type: "list",
        name: "optionForSupervisor",
        message:"Select your choice",
        choices: ["View Product Sales by Department", "Create New Department"]
    }
]).then(function(answers){
    if (answers.optionForSupervisor === "View Product Sales by Department") {
        supervisorsViewOfSales();
    } else {
        createNewDept();
    }
});

function createNewDept() {
    inquirer.prompt([
        {
            name: "name",
            message: "Name the department to be added?"
        }, 
        {
            name: "cost", 
            message: "Enter the overhead cost of this department?"
        }
    ]).then(function(answer){
        connection.query("INSERT INTO departments SET ?", { department_name: answer.name, over_head_costs: answer.cost}, 
		    function(err, res){
            	if (err) throw err;
             	})
        	    connection.query("SELECT * FROM departments", function (err, res){
            	    if (err) throw err;

            	    let table = new Table({
                    head: ["department_id", "department_name", "over_head_costs"]
            	    });

            	        for (let i = 0; i < res.length; i++){
                        table.push([res[i].department_id, res[i].department_name, res[i].over_head_costs])
            	    }
            	    console.log("Successfully added the updates!")
            	    console.log(table.toString());
        	})
    	})
};

function supervisorsViewOfSales() {
    //Implement a table join
    //connection.query("SELECT department_id, d.department_name, over_head_costs, sum(product_sales) AS product_sales, (sum(product_sales) - over_head_costs) AS total_profit FROM departments d INNER JOIN products p ON d.department_name = p.department_name GROUP BY department_name", function(err, res){
    connection.query("SELECT B.department_id, A.department_name, b.over_head_costs, SUM(A.product_sales) AS Total_Sales_By_Dept, SUM(A.product_sales) - B.over_head_costs AS Profit FROM products A, departments B WHERE a.department_name = b.department_name GROUP BY department_name, department_id ORDER BY department_id", 
        function(err, res) {
    
        if (err) throw err;
        //Construct cli-table headers
        let table = new Table({
           head: ["department_id", "department_name", "over_head_costs", "products_sales", "total_profits"]
            //head: ["department_id", "department_name", "over_head_costs", "total_sales_by_Dept", "profit"]
        });
        //Display content in cli-table
        for (let i = 0; i < res.length; i++) {
            table.push([res[i].department_id, res[i].department_name, res[i].over_head_costs, res[i].product_sales, res[i].total_profit])
        }
        console.log(table.toString());
    })
}