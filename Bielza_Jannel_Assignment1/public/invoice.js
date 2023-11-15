window.onload = function () {
    var quantities = [];
    let params = (new URL(document.location)).searchParams;

    for (i = 0; i < products.length; i++) {
        quantities.push(params.get("Quantity" + [i]));
    };

    var subtotal = 0;
    var tableBody = document.getElementById("invoiceTableBody");

    for (let i in quantities) {
        if (quantities[i] == 0) continue;
        extended_price = quantities[i] * products[i].price;

        var row = document.createElement("tr");
        row.innerHTML = `
            <td> <img src="${products[i].image}" style="width:20%"> ${products[i].model}</td>
            <td align="center" width="11%">${quantities[i]}</td>
            <td width="18%">\$${products[i].price.toFixed(2)}</td>
            <td width="54%">\$${extended_price}</td>
        `;

        tableBody.appendChild(row);
        subtotal += extended_price;
    }

    var taxRate = (5.75 / 100);
    var tax = subtotal * taxRate;

    var shipping = 0;
    if (subtotal < 250) {
        shipping = 20;
        shipping = shipping + (subtotal * 0.05);
    } else if (subtotal >= 250) {
        shipping = 5;
    }

    var Total = tax + subtotal + shipping;

    var totalRow = document.createElement("tr");
    totalRow.innerHTML = `
        <td style="text-align: center;" colspan="3" width="67%"><span style="font-family: arial;">Sub-total</td>
        <td width="54%">$${subtotal}</td>
    `;
    tableBody.appendChild(totalRow);

    var taxRow = document.createElement("tr");
    taxRow.innerHTML = `
        <td style="text-align: center;" colspan="3" width="67%"><span style="font-family: arial;">Tax @ ${taxRate * 100}</span></td>
        <td width="54%">$${tax.toFixed(2)}</td>
    `;
    tableBody.appendChild(taxRow);

    var shippingRow = document.createElement("tr");
    shippingRow.innerHTML = `
        <td style="text-align: center;" colspan="3" width="67%"><span style="font-family: arial;">Shipping</span></td>
        <td width="54%">$${shipping.toFixed(2)}</td>
    `;
    tableBody.appendChild(shippingRow);

    var totalAmountRow = document.createElement("tr");
    totalAmountRow.innerHTML = `
        <td style="text-align: center;" colspan="3" width="67%"><strong>Total</strong></td>
        <td width="54%"><strong>$${Total.toFixed(2)}</strong></td>
    `;
    tableBody.appendChild(totalAmountRow);
}

function returnToProductsPage() {
    window.location.href = 'products_display.html';
}
