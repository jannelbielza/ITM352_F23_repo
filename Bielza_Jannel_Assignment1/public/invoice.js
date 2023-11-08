let params = (new URL(document.location)).searchParams;
let q = Number(params.get('quantity'));

let validationMessage = validateQuantity(q);
// Initialize variables for subtotal, tax, shipping charge, and total
let subtotal = 0;
let taxRate = 0.0575; // 5.75%
let taxAmount = 0;
let total = 0;
let shippingCharge = 0;

if (subtotal <= 50) {
    shippingCharge = 2;
} else if (subtotal <= 100) {
    shippingCharge = 5;
} else {
    shippingCharge = subtotal * 0.05; // 5% of the subtotal
}

// Calculate total including shipping
taxAmount = subtotal * taxRate;
total = subtotal + taxAmount + shippingCharge;

// Set the subtotal, tax, and total cells
document.getElementById('subtotal_cell').textContent = '$' + subtotal.toFixed(2);
document.getElementById('tax_cell').textContent = '$' + taxAmount.toFixed(2);
document.getElementById('shipping_cell').textContent = '$' + shippingCharge.toFixed(2);
document.getElementById('total_cell').textContent = '$' + total.toFixed(2);

// Generate a random receipt number when the page loads (Only for cosmetics to make the receipt interesting)
let receiptNumber = generateRandomReceiptNumber();

// Display the initial receipt number
document.getElementById('receiptNumber').textContent = receiptNumber;

// Function to generate and update the date
function updateDate() {
    const now = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = now.toLocaleDateString(undefined, options);
    document.getElementById('date').textContent = formattedDate;
}

// Call the function to update the date when the page loads
updateDate();

// Function to generate a random receipt number
function generateRandomReceiptNumber() {
    // Generate a random number between 10000 and 99999
    return Math.floor(Math.random() * 90000) + 10000;
}

// Function to update the receipt number when quantities are submitted
function updateReceiptNumber(newReceiptNumber) {
    receiptNumber = newReceiptNumber;
    document.getElementById('receiptNumber').textContent = receiptNumber;
}

// Function to generate item rows and apply quantity validation
function generateItemRows() {
    // Get the table element to populate
    let table = document.getElementById('invoiceTable');

    // Clear the table content
    table.innerHTML = '';

    // Initialize variable to keep track of errors
    let hasErrors = false;

    // Loop through the itemData and quantity arrays
    for (let i = 0; i < itemData.length; i++) {
        let item = itemData[i];
        let itemQuantity = quantity[i];

        // Validate the quantity
        let validationMessage = validateQuantity(itemQuantity);

        // If there are validation errors, display the item with an error message
        if (validationMessage !== "") {
            hasErrors = true;
            let row = table.insertRow();
            row.insertCell(0).textContent = item.brand;
            row.insertCell(1).textContent = validationMessage;
        } else if (itemQuantity > 0) {
            // Calculate the extended price if quantity is valid and positive
            let extendedPrice = item.price * itemQuantity;
            subtotal += extendedPrice;

            // Display the item with the calculated extended price
            let row = table.insertRow();
            row.insertCell(0).textContent = item.brand;
            row.insertCell(1).textContent = itemQuantity;
            row.insertCell(2).textContent = '$' + item.price.toFixed(2);
            row.insertCell(3).textContent = '$' + extendedPrice.toFixed(2);
        }
    }

    // If there are no errors, display the total
    if (!hasErrors) {
        document.getElementById('subtotal_cell').textContent = '$' + subtotal.toFixed(2);
        document.getElementById('total_cell').textContent = '$' + total.toFixed(2);
    }
}

// Call the function to generate item rows
generateItemRows();