// initializes variables
let extendedPrices = [];
let extendedPrice = 0;
let subtotal = 0;
let taxAmount = 0;
let shipping = 0;

// opens the URL params
let quantities = [];
let params = (new URL(document.location)).searchParams;
for (let i in products) {
    quantities.push(parseInt(params.get("prod" + `${i}`)) || 0); // Convert to number, default to 0 if not a number
}
console.log(quantities);
console.log(params.get(`prod0`));


// generate all the item rows
generateItemRows();

// calculate subtotal
// calculate tax
let tax = (subtotal * 0.0575);

// checks the shipping price
if (subtotal <= 50) {
    shipping = 2;
} else if (subtotal <= 100) {
    shipping = 5;
} else {
    shipping = subtotal * 0.05;
}

// calculates total
let total = tax + subtotal + shipping;

// insert footer row values
document.getElementById("subtotal_cell").innerHTML = "$" + subtotal.toFixed(2);
document.getElementById("tax_cell").innerHTML = "$" + tax.toFixed(2);
document.getElementById("shipping_cell").innerHTML = "$" + shipping.toFixed(2);
document.getElementById("total_cell").innerHTML = "$" + total.toFixed(2);

// function to validate the quantity, returns a string if not a number, negative, not an integer, or a combination of both
// if no errors in quantity, returns an empty string
function validateQuantity(quantity) {
    if (isNaN(quantity)) {
        return "Please Enter a Number";
    } else if (quantity < 0 && !Number.isInteger(quantity)) {
        return "Please Enter a Positive Integer";
    } else if (quantity < 0) {
        return "Please Enter a Positive Number";
    } else if (!Number.isInteger(quantity)) {
        return "Please Enter an Integer";
    } else {
        return "";
    }
}

// generate all the item rows
function generateItemRows() {
    // sets table to the invoice table on the HTML
    let table = document.getElementById("invoiceTable");

    // checks if it has errors, set it to no for now
    let hasErrors = false;

    // for each member of the array
    products.forEach((product, i) => {
        // sets itemQuantity from the array gotten from the URL
        let itemQuantity = quantities[i]; // Use the parsed quantity

        // validate the quantity, we are just kinda looking for if it's negative so we don't show it
        let validationMessage = validateQuantity(itemQuantity);

        // if there is an error, just ignore this
        if (validationMessage !== "") {
            hasErrors = true;
            let row = table.insertRow();
            createErrorRow(row, product.name, validationMessage);
        }
        // otherwise, let's create the row in the invoice and update the extended price and subtotal
        else if (itemQuantity > 0) {
            // update the variables
            let extendedPrice = calculateExtendedPrice(product.price, itemQuantity);
            subtotal += extendedPrice;

            // create a new row and insert the info
            let row = table.insertRow();
            createItemRow(row, product, itemQuantity, extendedPrice);
        }
    });
}

function createErrorRow(row, itemName, errorMessage) {
    row.insertCell(0).innerHTML = `<img src="${itemName}" class="img-small" name="img">`;
    row.insertCell(1).innerHTML = errorMessage;
}

function createItemRow(row, products, quantity, extendedPrice) {
    row.insertCell(0).innerHTML = `<img src="${products.image}" class="img-small" name="img">`;
    row.insertCell(1).innerHTML = products.name;
    row.insertCell(2).innerHTML = quantity;
    row.insertCell(3).innerHTML = "$" + products.price.toFixed(2);
    row.insertCell(4).innerHTML = "$" + extendedPrice.toFixed(2);
}

function calculateExtendedPrice(price, quantity) {
    return price * quantity;
}