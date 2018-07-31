var mysql = require("mysql");
var prompt = require("prompt");

// sql configs
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'bamazon'
});


//main function to call

var main = function(){

	connection.query("SELECT * FROM products", function(err, result) {
		return (itemTable(result));
	  
	  });

	setTimeout(function() {
	    prompt.get(['item_id', 'stock_quantity'], function (err, result) {
		    var shopperItem = result.item_id;
		    var shopperQuantity =result.stock_quantity;

		    inventoryCheck(shopperItem, shopperQuantity);
		    setTimeout(function() {main();}, 1500);

		});
	}, 500);
}

// Inventory check

var inventoryCheck = function (id, quantity){
	connection.query('SELECT * FROM products WHERE item_id = ' + id, function (err, result){
		if (err) throw err;

		var total = result[0].price * quantity;

		var inventory = result[0].stock_quantity - quantity;

		if (inventory < 0){
			console.log('Not enough item. There are only '+ result[0].stock_quantity + 'item(s) left.');
		} else {
			console.log('You have purchased ' + quantity + ' ' + result[0].product_name + ' for $' + total);
			console.log('There are ' + inventory + ' ' + result[0].product_name + ' remaining.')
			databaseUpdate(id, inventory)
		}
	});
}


//update db

var databaseUpdate = function(id, quantity){
	connection.query('update products set stock_quantity = ' + quantity + ' where item_id = ' + id, function(err, result) {
        if (err) throw err;
    });
}

//formatting

function itemTable(items){
	for (var i = 0; i < items.length; i++) {
		console.log('------------------------');
		console.log('item_id: ' + items[i].item_id);
		console.log('Item: ' + items[i].product_name);
		console.log('Department: ' + items[i].department_name);
		console.log('price: $' + items[i].price);
	}
	console.log('------------------------');
}


connection.connect(function(err) {
    if (err) {
		console.error('connection error: ' + err);
	    return;
	}
});

main();