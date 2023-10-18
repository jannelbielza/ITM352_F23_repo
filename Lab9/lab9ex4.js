// Define the attributes string
let attributes = "Jannel;21;21.5;20.5";

let pieces = attributes.split(";");

// Define the isNonNegInt function
function isNonNegInt(q) {
    let errors = [];
  
    if (Number(q) != q) errors.push('Not a number!');
    if (q < 0) errors.push('Negative value!');
    if (parseInt(q) != q) errors.push('Not an integer!');
  
    return errors.length === 0;
  }

// Loop through the pieces array and test each element
for (i in pieces) {
    let isValid = isNonNegInt(pieces[i]);
    console.log(`Element "${pieces[i]}" is a non-negative integer: ${isValid}`);
  }