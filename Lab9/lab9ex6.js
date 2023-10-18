// Define the attributes string
let attributes = "Jannel;21;21.5;20.5";

let pieces = attributes.split(";");

// Define the isNonNegInt function
function validateNonNegInt(input, returnErrors = false) {
  let errors = [];

  if (Number(input) != input) errors.push('Not a number!');
  if (input < 0) errors.push('Negative value!');
  if (parseInt(input) != input) errors.push('Not an integer!');

  return returnErrors ? errors : (errors.length === 0);
}

// Loop through the pieces array and test each element
for (let i = 0; i < pieces.length; i++) {
  let validationResult = validateNonNegInt(pieces[i], true);
  console.log(`Validation result for element "${pieces[i]}": ${validationResult}`);
}

/*
// Define the checkIt function
function checkIt(item, index) {
   // Remove "<" and ">" symbols from the item
   item = item.replace(/<|>/g, '');
   console.log(item);
  console.log(`part ${index} is ${(validateNonNegInt(item) ? 'a' : 'not a')} quantity`);
}
*/
// The benefit of using an anonymous function is how simple the code is and how it is less cluttered. You don't have to define a separate named function for a simple operation. 
pieces.forEach((item, index) => {
  console.log(`part ${index} is ${(isNonNegInt(item) ? 'a' : 'not a')} quantity`);
});

