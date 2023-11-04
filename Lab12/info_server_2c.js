var express = require('express');
var app = express();

// part 2a
app.get('/test', function(request, response) {
    response.send("<h2> you have reached the test page - Aloha </h2>");
});

app.all('*', function (request, response, next) {
    console.log(request.method + ' to path ' + request.path);
    next();
});
// part 2c
app.use(express.static(__dirname + '/public'));


app.listen(8080, () => console.log(`listening on port 8080`)); // note the use of an anonymous function here to do a callback