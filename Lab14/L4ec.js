const fs = require('fs');

let filename = __dirname + '/user_data.json';

let user_reg_data;

if (fs.existsSync(filename)){
    let data = fs.readFileSync(filename, 'utf-8');

    user_reg_data = JSON.parse(data);

    let user_data_stats=fs.statSync(filename);

    let stats_size=user_data_stats.size;

    console.log(`The file name ${filename} has ${stats_size} characters`);

} else {
    console.log(`The file name ${filename} does not exist.`);
}

//Part 4
let username = 'newuser';
user_reg_data[username] = {};
user_reg_data[username].password = 'newpass';
user_reg_data[username].email = 'newuser@user.com';

fs.writeFileSync(filename, JSON.stringify(user_reg_data), 'utf-8');

let express = require('express');
let app = express();

app.use(express.urlencoded({ extended: true }));

app.get("/login", function (request, response) {
    // Retrieve the error parameter from the query string
    let error_msg = request.query.error || '';

    // Pre-fill the form fields with the previously entered data, if any
    let username_value = request.query.username || '';
    let password_value = request.query.password || '';

    // Give a simple login form with pre-filled values
    login_form = `
        <body>
        <form action="/login" method="POST">
        <input type="text" name="username" size="40" placeholder="enter username" value="${username_value}"><br />
        <input type="password" name="password" size="40" placeholder="enter password" value="${password_value}"><br />
        <input type="submit" value="Submit" id="submit">
        </form>
        <p style="color:red">${error_msg}</p>
        </body>
    `;
    response.send(login_form);
});


app.post("/login", function (request, response) {
     // Process login form POST and redirect to logged in page if ok, back to login page if not
    // Retrieve the user's entered information
    let username_entered = request.body['username'];
    let password_entered = request.body['password'];

    let response_msg = "";
    let error_msg = ""; // New variable to hold the error message
    let errors = false;

    if (typeof user_reg_data[username_entered] != 'undefined') {
        if (password_entered == user_reg_data[username_entered].password) {
            response_msg = `${username_entered} is logged in.`;
        } else {
            error_msg = "Incorrect password.";
            errors = true;
        }
    } else {
        error_msg = `${username_entered} does not exist.`;
        errors = true;
    }

    if (!errors) {
        response.send(response_msg);
    } else {
        // Pass the error message and entered username back to the login page
        response.render('login', { error: error_msg, username: username_entered });
    }
});

app.get("/register", function (request, response) {
    // Give a simple register form
    str = `
<body>
<form action="" method="POST">
<input type="text" name="username" size="40" placeholder="enter username" ><br />
<input type="password" name="password" size="40" placeholder="enter password"><br />
<input type="password" name="repeat_password" size="40" placeholder="enter password again"><br />
<input type="email" name="email" size="40" placeholder="enter email"><br />
<input type="submit" value="Submit" id="submit">
</form>
</body>
    `;
    response.send(str);
 });

 app.post("/register", function (request, response) {
     // process a simple register form
     let new_user = request.body.username;
     let errors = false;
     let resp_msg = "";
 
     //let params = new URLSearchParams(request.body);
 
     // If the username already exists
     if (typeof user_reg_data[new_user] != 'undefined') {
         resp_msg = 'Username unavailable. Please enter a different username.';
         errors = true;
     } 
     // If the username does not exist and the password and repeat password matches
     else if (request.body.password == request.body.repeat_password) {
         user_reg_data[new_user] = {};
         user_reg_data[new_user].name = request.body.name;
         user_reg_data[new_user].password = request.body.password;
         user_reg_data[new_user].email = request.body.email;
 
         fs.writeFileSync(filename, JSON.stringify(user_reg_data), 'utf-8');
         response.redirect(`./login`);
     } else {
         resp_msg = 'Repeat password does not match with password.'
         errors = true;
     }
 
     if (errors) {
         response.send(resp_msg);
     }
 });



app.listen(8080, () => console.log(`listening on port 8080`));