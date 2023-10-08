  // this creates the sales receipt
  // product data

//lab 8 part 2.1
let product_quantities=[4,3,7,3,2];

//lab 8 part 2.3
product_quantities.push(3); //add a new element (another product quantity) to the end of product_quantities
//alert("The size of the products array is: "+product_quantities.length);
product_quantities.pop(); // delete the just added element in product_quantities

//la8 part 2.2
//alert("The size of the products array is: "+product_quantities.length);
// Product Data and calculating extended-price (aka item_total)
let item1 = 'Kodak Ultramax 400 Color';
let quantity1 = product_quantities[0];
let price1 = 32;
//let extended_price1 = quantity1 * price1;

let item2 = 'Fujifilm Fujicolor 200 Color';
let quantity2 = product_quantities[1];
let price2 = 50;
let extended_price2 = quantity2 * price2;

let item3 = 'Kodak 145 1855 Color';
let quantity3 = product_quantities[2];
let price3 = 86;
let extended_price3 = quantity3 * price3;

let item4 = 'Kodak Professional Porta 800 Color';
let quantity4 = product_quantities[3];
let price4 = 33.95;
let extended_price4 = quantity4 * price4;

let item5 = 'Ilford HP5 Plus Black and White';
let quantity5 = product_quantities[4];
let price5 = 35.00;
let extended_price5 = quantity5 * price5;

//lab 8 part 1.1
//this defines product1 that representes product information, including name, quantity, and price.
let product1 = {
    itemName: 'Kodak Ultramax 400 Color',
    quantity: product_quantities[0],
    price: 32
};

//lab 8 part 1.2
let extended_price1 = product1.quantity * product1.price;

// lab 8 part 1.3
//product1.quantity = 0;

//lab8 part 1.4
// 
product1["SKU#"]=1234;
delete product1["SKU#"];

// Calculate subtotal
let subtotal = extended_price1 + extended_price2 + extended_price3 + extended_price4+extended_price5;

// Calculate sales tax
let taxRate = 0.0575; // 5.75%
let taxAmount = subtotal * taxRate;

// Calculate total
let total = subtotal + taxAmount;

// Populate the table rows using DOM manipulation
let table = document.getElementById('invoiceTable');

let row = table.insertRow(); // Create a new row for each item
//lab 8 part 1.2 changed item1 to product1.item, etc.
row.insertCell(0).innerHTML = `${product1.itemName}`;
row.insertCell(1).innerHTML = `${product1.quantity}`;
row.insertCell(2).innerHTML = '$'+`${product1.price}`;
row.insertCell(3).innerHTML = ('$' + `${extended_price1.toFixed(2)}`);
row = table.insertRow(); // Create a new row for each item
row.insertCell(0).innerHTML = `${item2}`;
row.insertCell(1).innerHTML = `${quantity2}`;
row.insertCell(2).innerHTML = '$'+`${price2}`;
row.insertCell(3).innerHTML = ('$' + `${extended_price2.toFixed(2)}`);
row = table.insertRow(); // Create a new row for each item
row.insertCell(0).innerHTML = `${item3}`;
row.insertCell(1).innerHTML = `${quantity3}`;
row.insertCell(2).innerHTML = '$'+`${price3}`;
row.insertCell(3).innerHTML = ('$' + `${extended_price3.toFixed(2)}`);
row = table.insertRow(); // Create a new row for each item
row.insertCell(0).innerHTML = `${item4}`;
row.insertCell(1).innerHTML = `${quantity4}`;
row.insertCell(2).innerHTML = '$'+`${price4}`;
row.insertCell(3).innerHTML = ('$' + `${extended_price4.toFixed(2)}`);
row = table.insertRow(); // Create a new row for each item
row.insertCell(0).innerHTML = `${item5}`;
row.insertCell(1).innerHTML = `${quantity5}`;
row.insertCell(2).innerHTML = '$'+`${price5}`;
row.insertCell(3).innerHTML = ('$' + `${extended_price5.toFixed(2)}`);


// Set the subtotal, tax, and total cells
document.getElementById('subtotal_cell').innerHTML = '$' + subtotal.toFixed(2);
document.getElementById('tax_cell').innerHTML = '$' + taxAmount.toFixed(2);
document.getElementById('total_cell').innerHTML = '$' + total.toFixed(2);