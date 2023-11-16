const express = require('express');
const app = express();
const qs = require("querystring");

app.use(express.static(__dirname + '/public'));

app.use(express.urlencoded({ extended: true }));

app.get("/products.js", function (request, response, next) {
   response.type('.js');
   let products_str = `let products = ${JSON.stringify(products)};`;
   response.send(products_str);
});

app.all('*', function (request, response, next) {
   console.log(request.method + ' to ' + request.path);
   next();
});

const products = require(__dirname + '/products.json');
for (let i in products) {
   products.forEach((prod, i) => { prod.total_sold = 0 });
}


//** Work in progress **/ 
app.post('/process_form', function (request, response) {
   console.log(request.body);
   //Check if the quantities are valid
   let haserrors = false;
   let hasquantities = false;


   for (let i in products) {
      let q = request.body["Quantity" + i];

      //Check if quantity > 0
      hasquantities = hasquantities || (q > 0);

      //Check if q is a NonNegInt
      haserrors = haserrors || (isNonNegInt(q) == false);

      //Check if quantites asked for are available
      haserrors = haserrors || (q > products[i].quantity_available);

   }


   //Code taken from Lab 12 Ex5
   if (!haserrors) {
      if (hasquantities == true) {
         //Will direct user to login if quantity input is valid 
         //Remove item sold from inventory
         for (let i in products) {
            let q = request.body["Quantity" + i];
            let remainder = products[i].quantity_available;
            products[i].quantity_available = remainder - Number(q);
         }
         response.redirect("./invoice.html?" + qs.stringify(request.body));
      } else {
         //User will be kept on the page if the input is invalid
         response.redirect("./products_display.html?" + qs.stringify(request.body) + `&error=Please select some items`);
      }
   }

});

app.listen(8080, () => console.log(`listening on port 8080`)); // note the use of an anonymous function here to do a callback

function isNonNegInt(stringValue, returnErrors = false) {
   let errors = []; // assume no errors at first
   if (stringValue == "") {
      stringValue = 0;
   } // empty string = 0
   if (Number(stringValue) != stringValue) errors.push('Not a number!'); // Check if string is a number value
   if (stringValue < 0) errors.push('Negative value!'); // Check if it is non-negative
   if (parseInt(stringValue) != stringValue) errors.push('Not an integer!'); // Check that it is an integer

   return (returnErrors ? errors : (errors.length == 0));
}