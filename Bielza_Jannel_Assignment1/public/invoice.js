window.onload = function() {
  // Check the URL for any error parameters and quantity and display/use them
  let params = (new URL(document.location)).searchParams;
  let error = params.get('error');
  let quantityTextboxValue = params.get('quantity_textbox');

  //initialize variables for subtotal, tax, shipping charge, and total
  let subtotal = 0;
  let taxRate = 0.0575; // 5.75%
  let taxAmount = 0;
  let shippingCharge = 0;
  let total = 0;

  // Assuming itemData and quantity arrays are available
  generateItemRows();

  // Calculate subtotal before checking the shipping charge
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

  // Set the total cell in bold
  document.getElementById('total_cell').innerHTML = `$${total.toFixed(2)}`;

  // Set the subtotal, tax, and total cells
  document.getElementById('subtotal_cell').innerHTML = '$' + subtotal.toFixed(2);
  document.getElementById('tax_cell').innerHTML = '$' + taxAmount.toFixed(2);
  document.getElementById('shipping_cell').innerHTML = '$' + shippingCharge.toFixed(2);

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
          let itemQuantity = quantity[item.quantityIndex];

          // Validate the quantity
          let validationMessage = validateQuantity(itemQuantity);

          // If there are validation errors, display the item with an error message
          if (validationMessage !== "") {
              hasErrors = true;
              let row = table.insertRow();
              row.insertCell(0).innerHTML = item.brand;
              row.insertCell(1).innerHTML = validationMessage;
              row.insertCell(2).innerHTML = "";
              row.insertCell(2).innerHTML = "";
          } else if (itemQuantity > 0) {
              // Calculate the extended price if quantity is valid and positive
              let extendedPrice = item.price * itemQuantity;
              subtotal += extendedPrice;

              // Display the item with the calculated extended price
              let row = table.insertRow();
              row.insertCell(0).innerHTML = item.brand;
              row.insertCell(1).innerHTML = itemQuantity;
              row.insertCell(2).innerHTML = '$' + item.price.toFixed(2);
              row.insertCell(3).innerHTML = '$' + extendedPrice.toFixed(2);
          }
      }

      // If there are no errors, display the total
      if (!hasErrors) {
          document.getElementById('total_cell').innerHTML = '$' + total.toFixed(2);
      }
  }

  // Display error if present
  if (error) {
      document.write(`<div style="color:red; border:1px solid red; padding: 10px; margin-bottom: 10px;">${error}</div>`);
  }
};

// Add the validateQuantity()
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


  