//this code defines five products with their respective quantities and prices, and caluculates the extended price for each item by multiplying qauntity and price. 
let item1 = 'Kodak Ultramax 400 Color';
let quantity1 = 2;
let price1 = 6.23;
let extended_price1 = quantity1 * price1;

let item2 = 'Fujifilm Fujicolor 200 Color';
let quantity2 = 1;
let price2 = 22.64;
let extended_price2 = quantity2 * price2;

let item3 = 'Kodak 145 1855 Color';
let quantity3 = 1;
let price3 = 25.99;
let extended_price3 = quantity3 * price3;

let item4 = 'Kodak Professional Porta 800 Color';
let quantity4 = 1;
let price4 = 33.95;
let extended_price4 = quantity4 * price4;

let item5 = 'Ilford HP5 Plus Black and White';
let quantity5 = 3;
let price5 = 35.00;
let extended_price5 = quantity5 * price5;

// Calculate subtotal
let subtotal = extended_price1 + extended_price2 + extended_price3+extended_price4+extended_price5;

// Calculate sales tax
let taxRate = 0.0575; // 5.75%
let taxAmount = subtotal * taxRate;

// Calculate total
let total = subtotal + taxAmount;

// Populate the table rows using DOM manipulation
let table = document.getElementById('invoiceTable');

// this code manipulates an HTML table with the id 'invoiceTable' to dynamically add rows. For each item, it inserts a new row into the table and populatesit with item details.
let row = table.insertRow(); 
row.insertCell(0).innerHTML = `${item1}`;
row.insertCell(1).innerHTML = `${quantity1}`;
row.insertCell(2).innerHTML = '$'+`${price1}`;
row.insertCell(3).innerHTML = ('$' + `${extended_price1}`);
row = table.insertRow(); 
row.insertCell(0).innerHTML = `${item2}`;
row.insertCell(1).innerHTML = `${quantity2}`;
row.insertCell(2).innerHTML = '$'+`${price2}`;
row.insertCell(3).innerHTML = ('$' + `${extended_price2}`);
row = table.insertRow(); 
row.insertCell(0).innerHTML = `${item3}`;
row.insertCell(1).innerHTML = `${quantity3}`;
row.insertCell(2).innerHTML = '$'+`${price3}`;
row.insertCell(3).innerHTML = ('$' + `${extended_price3}`);
row = table.insertRow(); 
row.insertCell(0).innerHTML = `${item4}`;
row.insertCell(1).innerHTML = `${quantity4}`;
row.insertCell(2).innerHTML = '$'+`${price4}`;
row.insertCell(3).innerHTML = ('$' + `${extended_price4}`);
row = table.insertRow(); 
row.insertCell(0).innerHTML = `${item5}`;
row.insertCell(1).innerHTML = `${quantity5}`;
row.insertCell(2).innerHTML = '$'+`${price5}`;
row.insertCell(3).innerHTML = ('$' + `${extended_price5}`);

// Calculate shipping based on sub-total
let shippingCharge = 0;

if (subtotal <= 50) {
    shippingCharge = 2;
} else if (subtotal <= 100) {
    shippingCharge = 5;
} else {
    shippingCharge = subtotal * 0.05; // 5% of the subtotal
}

// Calculate total including shipping
total = subtotal + taxAmount + shippingCharge;

// Set the total cell in bold
document.getElementById('total_cell').innerHTML = `$${total.toFixed(2)}`;


// Set the subtotal, tax, and total cells
document.getElementById('subtotal_cell').innerHTML = '$' + subtotal.toFixed(2);
document.getElementById('tax_cell').innerHTML = '$' + taxAmount.toFixed(2);
document.getElementById('shipping_cell').innerHTML = '$' +shippingCharge.toFixed(2);