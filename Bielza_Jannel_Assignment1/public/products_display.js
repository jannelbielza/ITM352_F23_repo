window.onload = function () {
    let params = (new URL(document.location)).searchParams;

    // URL contains 'textError' means that there is either a negative, non-integer, or a letter 
    if (params.has('error')) {
        // Generates an alert with the value textError, Alert says "Please enter a valid quantity"
        alert(params.get('error'));
        for (let i in products) {
            // put quantity in query string back in quantity textbox
            document.getElementById(`quantity_textbox${i}`).value = params.get(`Quantity${i}`);
            // check the quantity in the textbox
            checkQuantityTextbox(document.getElementById(`quantity_textbox${i}`));
        }
    }

    const form = document.getElementById('productForm');
    let formHTML = '';

    for (let i in products) {
        if (i % 3 === 0) {
            // Start a new row for every index that's/images/vcut.png a multiple of 3
            formHTML += '<div class="container mt-4"><div class="row">';
        }

        formHTML += `
    <div class="col-sm-4">
        <div class="card h-100">
            <img class="card-img-top" src="${products[i]["image"]}" alt="Card image">
            <div class="card-body">
                <h4 class="card-title">${products[i]["name"]}</h4>
                <p class="card-text">\$${products[i]["price"]}</p>
                <p> ${products[i]["quantity_available"]} in stock!</p>
                <p>(${products[i]["total_sold"]} sold)</p>
                <label id="quantity_textbox${i}_label">Quantity</label><br>
                <input type="text" id="quantity_textbox${i}" name="quantity_textbox${i}" placeholder='0' onkeyup="checkQuantityTextbox(this);">
                <button type="button" onclick="incrementQuantity(${i})">+</button>
                <button type="button" onclick="decrementQuantity(${i})">-</button>
            </div>
        </div>
    </div>`;

        if (i % 3 === 2 || i == products.length - 1) {
            // End the row for every third index or the last item
            formHTML += '</div></div>';
        }
        
    }
        // Add the "Purchase" button
        formHTML += `
        <footer>
            <input type="submit" value="Purchase" class="btn btn-primary btn-lg btn-dark">
            <br>
            <br>
        </footer>    
            `;

    // Push the form content to the DOM
    form.innerHTML = formHTML;
}
//add the isNonNegInt()
function isNonNegInt(stringValue, returnErrors = false) {
    errors = []; // assume no errors at first
    if (Number(stringValue) != stringValue) errors.push('<font color="red">Not a number!</font>'); // Check if string is a number value
    else {
        if (stringValue < 0) errors.push('<font color="red">Quantity cannot be a negative!</font>');
        // Checking if input is an integer; // Check if it is non-negative
        if (parseInt(stringValue) != stringValue) errors.push('<font color="red">Not an integer!</font>'); // Check that it is an integer
        if ((parseInt(stringValue) == stringValue) && (stringValue >= 0)) { // Check that it is a positive integer
            // Products array for loop
            for (let i = 0; i < products.length; i++) {
                // ID 'quantity_textbox' becomes let inputval
                let quantityTextbox = document.getElementById(`quantity_textbox${i}`);
                
                // Check if the element is found before accessing its value property
                if (quantityTextbox) {
                    let inputVal = quantityTextbox.value;
            
                    if ((inputVal > 0) && (inputVal > products[i].quantity_available)) {
                        // If it does exceed, push an error message
                        errors.push(`We do not have ${inputVal} available.`);
                        // Input and Quantity Available are then calculated to determine if it is in the range of quantity available
                        // Reduce the input to the quantity available (replace the input)
                        let extraval = inputVal - products[i].quantity_available;
                        quantityTextbox.value = inputVal - extraval;
                        // Displays the quantity label in red font
                        document.getElementById(`quantity_textbox${i}_label`).style.color = "red";
                    }
                }
            }
        }            
    }
    return (returnErrors ? errors : (errors.length == 0));
};
function checkQuantityTextbox(product_quantities_array) { 
    errs = isNonNegInt(product_quantities_array.value, true); //valid
    if (errs.length == 0) errs = ['You want:']; //when typing in the textbox, this will display 
    if (product_quantities_array.value.trim() == '') errs = ['Quantity:'];
    document.getElementById(product_quantities_array.name + '_label').innerHTML = errs.join(", ");
}


// increment quantity
function incrementQuantity(index) {
    let quantityTextbox = document.getElementById(`quantity_textbox${index}`);
    let currentQuantity = parseInt(quantityTextbox.value) || 0;
    quantityTextbox.value = currentQuantity + 1;
    checkQuantityTextbox(quantityTextbox);
}
// decrement quantity
function decrementQuantity(index) {
    let quantityTextbox = document.getElementById(`quantity_textbox${index}`);
    let currentQuantity = parseInt(quantityTextbox.value) || 0;
    quantityTextbox.value = currentQuantity - 1;
    checkQuantityTextbox(quantityTextbox);
}




