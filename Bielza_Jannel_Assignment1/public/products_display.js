window.onload = function () {
    // Check the URL for any error parameters and quantity and display/use them
    let params = (new URL(document.location)).searchParams;
    let q = Number(params.get('quantity'));
    let error = params.get('error');

    //if there is an error, alert the user
    if (error) {
        alert(error);
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
                    <p>Enter Quantity:</p>
                    <p>(${products[i]["total_sold"]} sold)</p>
                    <input type="text" id="quantity_textbox_${i}" name="quantity_textbox[${i}]" onkeyup="checkQuantityTextbox(this);">
                    <span id="quantity_textbox[${i}]_message">Enter a quantity</span><br>
                    
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
        <br>
            <div class="d-flex justify-content-center mt-4">
                <input type="submit" value="Purchase" class="btn btn-primary btn-lg btn-dark">
            </div>
            <br>
            <br>`;

    // Push the form content to the DOM
    form.innerHTML = formHTML;
}

function checkQuantityTextbox(theTextbox) {
    let errs = validateQuantity(theTextbox.value);
    document.getElementById(theTextbox.name + '_message').innerHTML = errs.join(", ");
}

//add the validateQuantity()
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

