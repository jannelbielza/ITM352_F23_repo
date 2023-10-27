//this function takes a single argument, which is a reference to a textbox element.
function updateQuantityMessage(textbox){
    //retrieve the DOM element with the ID 'qty_textbox_message' and store it in the 'quantityMessage' variable.
    let quantityMessage=document.getElementById('qty_textbox_message');

    //call the 'validateQuantity' functiom, passing the numeric value of the textbox's input as an argument.
    let validationMessage = validateQuantity(Number(textbox.value));

    // Check if the 'validationMessage' returned by 'validateQuantxfity' is not an empty string.
    if (validationMessage !=="") {
        // If 'validationMessage' is not empty, set the innerHTML of the 'quantityMessage' element to the 'validationMessage'.
        quantityMessage.innerHTML = validationMessage;
    } else {
        // If 'validationMessage' is empty, set the innerHTML of the 'quantityMessage' element to the value in the textbox.
        quantityMessage.innerHTML = textbox.value;
    }
}



function validateQuantity(quantity){
    let errorMessage = ""; //intitalize an error message variable as an empty string.

    switch (true){//use a switch statement to check different conditions for quantity
        case isNaN(quantity): //if quantity is not a number, set an error message indicating it's not a number
            errorMessage = "Not a number. Please enter a non-negative quantity."; 
            break;
        case quantity < 0 && !Number.isInteger(quantity)://if quantity is both negative and not an integer, set an error message indicating it's not a number
            errorMessage = "You entered a negative number. Please enter a non-negative quantity."
            break;
        case quantity < 0://if quantity is negative but an integer, set an error message for being a negative quantity.
            errorMessage = "You entered a quantity less than 0. Please enter a non-negative quantity."
            break;
        case !Number.isInteger(quantity): //if quantity is not an integer (fractional or non-integer), set an error message.
            errorMessage = "You entered a non-integer. Please enter a non-integer quantity"
            break;
        default: // if none of the above cases match, set the error message as an empty string, indicating no errors.
            errorMessage = ""; //no errors
            break;
    }
    return errorMessage;
}

function displayPurchase() {
    //get the value from the input field and convert it to a number.
    let quantity = Number(document.getElementById('qty_textbox').value);
    // call the validateQuantity function to check if the quantity is valid.
    let validationMessage = validateQuantity(quantity);
    //check if the validation message is empty/valid
    if (validationMessage == "") {
        let message = `Thank you for ordering ${quantity} things!`;
        document.body.innerHTML = message;
    } else { 

        //displays alert with the validation message and request the user to enter a valid quantity.
        alert(validationMessage + " Please enter a positive integer for quantity.")
    
        document.getElementById('qty_textbox').value="";
    }

}