const products_array = require(__dirname + '/product_data.json');

const express = require('express');
const app = express();
const querystring = require('querystring');

// Routing 

// monitor all requests
app.all('*', function (request, response, next) {
   console.log(request.method + ' to ' + request.path);
   next();
});

app.get("./products_data.js", function (request, response, next) {
   response.type(".js");
   let products_str = `let products = ${JSON.stringify(products)}`;
   response.send(products_str);
});

// process purchase request (validate quantities, check quantity available)


// route all other GET requests to files in public 
app.use(express.static(__dirname + '/public'));

// start server
app.listen(8080, () => console.log(`listening on port 8080`));