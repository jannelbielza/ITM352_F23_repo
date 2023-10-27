// this function takes one argument called 'textbox'
function updateQuantityMessage(textbox){
    //selects an HTML element with the id 'qty_textbox_message' and sores it in the variable 'quantityMessage'
    let quantityMessage = document.getElementById('qty_textbox_message');

    //this calls a function 'validateQuantity' with the value of 'textbox' as an argument and stores the results in 'validationMessage'
    let validationMessage = validateQuantity(Number(textbox.value));
    //if 'validationMessage' is not an empty string , it means there is a validation message
    if (validationMessage !== "") {
        // this sets the inner HTML of the 'quantityMessage' element to the validation error message 
        quantityMessage.innerHTML = validationMessage;
    } else {
    //if there is no validation error, it sets the inner HTML of 'quantityMessage' to the value of 'textbox'
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

function displayPurchase(){
    //get the value enetered in the input field with the id 'qty_textbox' and convert it to a number, storing it in the quantity variable.
    let quantity = Number(document.getElementById('qty_textbox').value); 

    let validationMessage = validateQuantity(quantity); //this call the validateQuantity function to check the validity of the quantity and stores the result in 'validationMessage'

    if(validationMessage === ""){ //if there are no erros 
        let message = `Thank you for ordering ${quantity} things!`
        
        document.body.innerHTML = message;
    } else { //if there are errors, display an alert with the error message.
        alert(validationMessage + ". Please enter a positive integer for quantity.");
        
        document.getElementById('qty_textbox').value="";
    }
}