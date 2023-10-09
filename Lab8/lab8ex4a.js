// Define the product_quantities array
let product_quantities = [2, 1, 3, 1, 1];

//question 3.2
// array of all products
// corresponds to product_quantities array
// product_quantities[i] is the quantity for products[i]
let products = [
    { 'name': 'small gumball', 'price': 0.02 },
    { 'name': 'medium gumball', 'price': 0.05 },
    { 'name': 'large gumball', 'price': 0.07 },
    { 'name': 'small jawbreaker', 'price': 0.06 },
    { 'name': 'large jawbreaker', 'price': 0.10 }
   ];

// Iterate through product_quantities and print each element in a table
document.write("<table>");
//document.write("<tr><th>Product #</th><th>Quantity</th></tr>");
// lab8 part 3.2
document.write("<tr><th>Product #</th><th>Name</th><th>Price</th><th>Quantity</th><th>Extended Cost</th></tr>");

for (let i=0; i < product_quantities.length; i++) {
    
    let quantity = product_quantities[i];
    let product = products[i];
    let extended_cost = quantity * product.price;

    document.write("<tr>");
    document.write("<td>" + (i + 1) + "</td>"); // Product #
    document.write("<td>" + product.name + "</td>"); // name
    document.write("<td>" + product.price.toFixed(2) + "</td>"); // price
    document.write("<td>" + quantity + "</td>"); // Quantity
    document.write("<td>" + extended_cost.toFixed(2) + "</td>"); // Extended Cost
    document.write("</tr>");
}
document.write("</table>");

//this function adds a new row with five empty cells to the first HTML tbale it finds in the document.
function addNewRow() {
    let table = document.querySelector('table');

    let newRow = table.insertRow();
    newRow.innerHTML = `
    <td> blank </td>
    <td> blank </td>
    <td> blank </td>
    <td> blank </td>
    <td> blank </td>
    `;
};

//add a click event listner to the table to trigger the addNewRow function.
// it ensures that the JavaScript code runs only after the HTML document has been fully loaded and parsed. Once the even occurs, it selects the first <table> element in the document and attaches a click event listener to it. when the table is clicked, it calls the addNewRow function to add a new row to the table. 
document.addEventListener('DOMContentLoaded', function(){
    let table = document.querySelector('table');
    table.addEventListener('click', addNewRow);
});