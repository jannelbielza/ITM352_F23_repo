window.onload = function () {
    let params = (new URL(document.location)).searchParams;
    let error;
    let order = [];

    // get if there was an error before
    error = params.get('error');

    // fill order array with item amounts from previous attempts
    params.forEach((value, key) => {
        if (key.startsWith('prod')) {
            order.push(parseInt(value));
        }
    });

    // if there is an error submitted, then show the error text in errorDiv
    if (error == 'true') {
        document.getElementById('errorDiv').innerHTML += `<h2 class="text-danger">Input Error - Please Fix!</h2><br>`;
    }

    const form = document.getElementById('productForm');
    let formHTML = '';

    for (let i in products) {
        if (i % 3 === 0) {
            // Start a new row for every index that's a multiple of 3
            formHTML += '<div class="container mt-4"><div class="row">';
        }

        formHTML += `
            <div class="col-sm-4">
                <div class="card h-100">
                    <img class="card-img-top" src="${products[i]["image"]}" alt="Card image">
                    <div class="card-body">
                        <h4 class="card-title">${products[i]["name"]}</h4>
                        <p class="card-text">\$${products[i]["price"].toFixed(2)}</p>
                        <p> ${products[i]["quantity_available"]} in stock!</p>
                        <p>(${products[i]["total_sold"]} sold)</p>

                        <input type="text" placeholder="0" name="quantity_textbox" id="${i}" class="form-control mb-2" oninput="validateQuantity(this)" value="${order[i] !== 0 && order[i] !== undefined ? order[i] : ''}">
                        <p id="invalidQuantity${i}" class="text-danger"></p>
                        <div class="d-flex justify-content-between">
                        <button type="button" class="btn btn-secondary" onclick="incrementQuantity(${i})">+</button>
                        <button type="button" class="btn btn-secondary" onclick="decrementQuantity(${i})">-</button>
                    </div>
                    </div>
                </div>
            </div>`;

        if (i % 3 === 2 || i == products.length - 1) {
            // End the row for every third index or the last item
            formHTML += '</div></div>';

    }
}

        formHTML += `
        <footer class="text-center py-4">
            <div class="row">
                <div class="col">
                    <input type="submit" value="Purchase" class="btn btn-secondary">
                </div>
            </div>
        </footer>`;

        

    // Push the form content to the DOM
    form.innerHTML = formHTML;

    // Validate each input on load
    validateQuantity(document.getElementById(`${i}`));
}

// Function to validate quantity
function validateQuantity(quantity) {
    let valMessage = '';
    let quantityNumber = Number(quantity.value);

    let invalidQuantityElement = document.getElementById(`invalidQuantity${quantity.id}`);

    if (isNaN(quantityNumber)) {
        valMessage = "Please Enter a Number";
    } else if (quantityNumber < 0 && !Number.isInteger(quantityNumber)) {
        valMessage = "Please Enter a Positive Integer";
    } else if (quantityNumber < 0) {
        valMessage = "Please Enter a Positive Value";
    } else if (!Number.isInteger(quantityNumber)) {
        valMessage = "Please Enter an Integer";
    } else if (quantityNumber > products[quantity.id]['quantity_available']) {
        valMessage = "Not Enough Items in Stock!";
    } else {
        valMessage = '';
    }

    invalidQuantityElement.innerHTML = valMessage;
}

// Increment quantity
function incrementQuantity(index) {
    let quantityTextbox = document.getElementById(`${index}`);
    let currentQuantity = parseInt(quantityTextbox.value) || 0;
    quantityTextbox.value = currentQuantity + 1;
    validateQuantity(quantityTextbox);
}

// Decrement quantity
function decrementQuantity(index) {
    let quantityTextbox = document.getElementById(`${index}`);
    let currentQuantity = parseInt(quantityTextbox.value) || 0;
    quantityTextbox.value = currentQuantity - 1;
    validateQuantity(quantityTextbox);
}
