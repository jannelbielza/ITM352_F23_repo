//this function takes a single argument, which is a reference to a textbox element.
function updateQuantityMessage(textbox){
    //retrieve the DOM element with the ID 'qty_textbox_message' and store it in the 'quantityMessage' variable.
    let quantityMessage = document.getElementById('qty_textbox_message');

    //call the 'validateQuantity' functiom, passing the numeric value of the textbox's input as an argument.
    let validationMessage = validateQuantity(Number(textbox.value));

    // Check if the 'validationMessage' returned by 'validateQuantity' is not an empty string.
    if (validationMessage !== "") {
        // If 'validationMessage' is not empty, set the innerHTML of the 'quantityMessage' element to the 'validationMessage'.
        quantityMessage.innerHTML = validationMessage;
    } else {
        // If 'validationMessage' is empty, set the innerHTML of the 'quantityMessage' element to the value in the textbox.
        quantityMessage.innerHTML = textbox.value;
    }
}



function validateQuantity(quantity){
    let errorMessage = "";

    switch (true){
        case isNaN(quantity):
            errorMessage = "Not a number. Please enter a non-negative quantity."; 
            break;
        case quantity < 0 && !Number.isInteger(quantity):
            errorMessage = "You entered a negative number. Please enter a non-negative quantity."
            break;
        case quantity < 0:
            errorMessage = "You entered a quantity less than 0. Please enter a non-negative quantity."
            break;
        case !Number.isInteger(quantity):
            errorMessage = "You entered a non-integer. Please enter a non-integer quantity"
            break;
        default:
            errorMessage = ""; //no errors
            break;
    }
    return errorMessage;
}

function displayPurchase(){
    let quantity = Number(document.getElementById('qty_textbox').value);
    let validationMessage = validateQuantity(quantity);

    if(validationMessage === ""){
        let message = `Thank you for ordering ${quantity} things!`

        document.body.innerHTML = message;
    } else {
        alert(validationMessage + ". Please enter a positive integer for quantity.");
        
        document.getElementById('qty_textbox').value="";
    }
}