const express = require('express');
const app = express();

app.use(express.static(__dirname + '/public'));

let products = require(__dirname + '/products.json');
products.forEach( (prod,i) => {prod.total_sold = 0});


app.get("/products.js", function (request, response, next) {
   response.type('.js');
   let products_str = `let products = ${JSON.stringify(products)};`;
   response.send(products_str);
});

app.use(express.urlencoded({ extended: true }));

//** Work in progress **/
app.post("/process_form", function (request, response) {
        //response.send(request.body); 
    let q = Number(request.body['qty_textbox']);
    console.log("the input value is..."+q);

    //products[0].total_sold +=q; //only done on server side

    let validationMessage = validateQuantity(q);

    if (validationMessage == "") {
        //response.send(`<h2>Thank you for purchasing ${q} ${brand}. Your total is \$${q * brand_price}!</h2>`);
        response.redirect('invoice.html?quantity=' + q);//part 5 redirect
    } else {
        //response.send(validationMessage+'<br>'+`Error: ${q} is not a quantity. Hit the back button to fix.`);
        //response.redirect('receipt.html?quantity=' + q);//part 5 redirect
        // Redirect back to order.html with the error in the query string
        response.redirect(`products_display.html?error=${validationMessage}&qty_textbox=${q}`); // final part of part 5
    }
});

 app.all('*', function (request, response, next) {
    console.log(request.method + ' to ' + request.path);
    next();
 });

app.listen(8080, () => console.log(`listening on port 8080`)); // note the use of an anonymous function here to do a callback

function validateQuantity(quantity) {
    let errorMessage = "";
  
    switch (true) {
        case isNaN(quantity):
            errorMessage = "Not a number. Please enter a non-negative quantity to order.";
            break;
        case quantity < 0 && !Number.isInteger(quantity):
            errorMessage = "Negative inventory and not an Integer. Please enter a non-negative quantity to order.";
            break;
        case quantity < 0:
            errorMessage = "Negative inventory. Please enter a non-negative quantity to order.";
            break;
        case !Number.isInteger(quantity):
            errorMessage = "Not an Integer. Please enter a non-negative quantity to order.";
            break;
        default:
            errorMessage = ""; // No errors
            break;
    }
  
    return errorMessage;
}