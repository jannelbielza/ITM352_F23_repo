  // this creates the sales receipt
    // product data

    // product 1
    let item1 = 'Kodak Ultramax 400 Color';
    let quantity1 = 1;
    let price1 = 32;

     // product 2
     let item2 = 'Fujifilm Fujicolor 200 Color';
    let quantity2 = 2;
    let price2 = 50;

     // product 3
     let item3 = 'Kodak 145 1855 Color';
    let quantity3 = 2;
    let price3 = 86;

     // product 4
     let item4 = 'Kodak Professional Porta 800 Color';
    let quantity4 = 1;
    let price4 = 17;

     // product 5
     let item5 = 'Ilford HP5 Plus Black and White';
    let quantity5 = 2;
    let price5 = 18;

     //extended prices
    let extended_prices1 = quantity1 * price1;
    let extended_prices2 = quantity2 * price2;
    let extended_prices3 = quantity3 * price3;
    let extended_prices4 = quantity4 * price4;
    let extended_prices5 = quantity5 * price5;

    //compute subtotal
    let subtotal = extended_prices1 + extended_prices2 + extended_prices3 + extended_prices4 + extended_prices5;

    //compute tax
    let tax_rate = 0.0575;
    let tax = tax_rate * subtotal;

// compute shipping
if (subtotal <= 50){
  shipping = 2;
}
else if (subtotal < 100){
  shipping = 5; 
}
else {
  shipping = 0.05 * subtotal; 
}

// compute grand total
var total = subtotal + tax;

    