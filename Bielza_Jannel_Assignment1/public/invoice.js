// These variables are used to store various values related to pricing and totals.
let extendedPrices = [];
let extendedPrice = 0;
let subtotal = 0;
let taxAmount = 0;
let shipping = 0;

// It extracts product quantities from the URL parameters and populates the quantities array. If a quantity is not a valid number, it defaults to 0.
let quantities = [];
let params = (new URL(document.location)).searchParams;
for (let i in products) {
    quantities.push(parseInt(params.get("prod" + `${i}`)) || 0); // Convert to number, default to 0 if not a number
}
console.log(quantities);
console.log(params.get(`prod0`));


// Calls a function (generateItemRows()) to create rows in an invoice table based on the product information and quantities.
generateItemRows();


// Calculates tax, determines shipping costs based on the subtotal, and calculates the total amount.
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

//Updates HTML elements with the calculated subtotal, tax, shipping, and total values.
document.getElementById("subtotal_cell").innerHTML = "$" + subtotal.toFixed(2);
document.getElementById("tax_cell").innerHTML = "$" + tax.toFixed(2);
document.getElementById("shipping_cell").innerHTML = "$" + shipping.toFixed(2);
document.getElementById("total_cell").innerHTML = "$" + total.toFixed(2);

//Defines a function to validate quantity input, checking if it's a positive integer and displaying appropriate error messages.
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

//Creates rows in an invoice table based on product information, handling validation and updating subtotal accordingly.
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

//Functions responsible for creating table rows, either for valid items or for displaying errors.
function createErrorRow(row, itemName, errorMessage) {
    row.insertCell(0).innerHTML = `<img src="${itemName}" class="img-small" name="img">`;
    row.insertCell(1).innerHTML = errorMessage;
}

// Functions responsible for creating table rows, either for valid items or for displaying errors.
function createItemRow(row, products, quantity, extendedPrice) {
    row.insertCell(0).innerHTML = `<img src="${products.image}" class="img-small" name="img">`;
    row.insertCell(1).innerHTML = products.name;
    row.insertCell(2).innerHTML = quantity;
    row.insertCell(3).innerHTML = "$" + products.price.toFixed(2);
    row.insertCell(4).innerHTML = "$" + extendedPrice.toFixed(2);
}

//  function to calculate the extended price (price * quantity).
function calculateExtendedPrice(price, quantity) {
    return price * quantity;
}