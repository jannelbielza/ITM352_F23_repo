// Importing the Express.js framework 
const express = require('express');
// Create an instance of the Express application called "app"
// app will be used to define routes, handle requests, etc
const app = express();

app.use(express.urlencoded({ extended: true }));

//grabs everything from public
app.use(express.static(__dirname + '/public'));

//sets up the product array from the json file
let products = require(__dirname + '/products.json');
products.forEach( (prod,i) => {prod.total_sold = 0});

// Define a route for handling a GET request to a path that matches "./products.js"
app.get("/products.js", function (request, response, next) {
    response.type('.js');
    let products_str = `var products = ${JSON.stringify(products)};`;
    //console.log(products_str);
    response.send(products_str);
});

// Handle POST request to "/process_form"
app.post("/process_form", function (request, response) {
    // Extract quantity data from the request body
    let quantity_text = request.body.quantity_textbox;
    
    // Initialize variables for URL parameters and an array to store sold quantities
    let url = '';
    let soldArray = [];

    // Iterate through each quantity in the form
    for (let i = 0; i < quantity_text.length; i++) {
        // Convert quantity to a number
        let q = Number(quantity_text[i]);

        // Validate the quantity using a custom function
        let validationMessage = validateQuantity(q);

        // Check if the quantity is valid and available in stock
        if (validationMessage === '' && products[i].quantity_available - q >= 0) {
            // Store the sold quantity and update the URL parameter string
            soldArray[i] = q;
            url += `&prod${i}=${q}`;
        } else {
            // If invalid or insufficient stock, include the quantity in the URL for error reporting
            url += `&prod${i}=${q}`;
        }
        // Check if all quantities are zero, indicating an error, and redirect with an error message
        if (url === `&prod0=0&prod1=0&prod2=0&prod3=0&prod4=0&prod5=0`) {
            response.redirect(`products_display.html?error=true${url}`);
            return;
        }
    }

    // Update product quantities and total sold based on the soldArray
    for (let i = 0; i < quantity_text.length; i++) {
        products[i].total_sold += soldArray[i];
        products[i].quantity_available -= soldArray[i];
    }

    // Redirect to the invoice page with the updated URL parameters
    response.redirect(`invoice.html?${url}`);
});


// Route all other GET requests to serve static files from a directory named "public"

app.all('*', function (request, response, next) {
    //console.log(request.method + ' to ' + request.path);
    next();
 });

// Start the server; listen on port 8080 for incoming HTTP requests
app.listen(8080, () => console.log(`listening on port 8080`));

//function to validate the quantity, returns a string if not a number, negative, not an integer, or a combination of both
//if no errors in quantity, returns empty string
function validateQuantity(quantity){
    //console.log(quantity);
    if(isNaN(quantity)){
        return "Not a Number";
    }else if (quantity<0 && !Number.isInteger(quantity)){
        return "Negative Inventory & Not an Integer";
    }else if (quantity <0){
        return "Negative Inventory";
    }else if(!Number.isInteger(quantity)){
        return "Not an Integer";
    }else{
        return"";
    }

}