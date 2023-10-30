//declare and push to the DOM the store name at top and bottom
const store_name="Jannel";
top_title.innerHTML=(store_name + "'s Used Smart Phone Store");
bottom_title.innerHTML=("Your one stop shop for used phones - " + store_name);

let hits= 0;
let spins=0;
//let wins;
let over_half = false;
hits_span.innerHTML = hits; 
spins_span.innerHTML = spins;


const product1 = {
 brand :"HTC",
 price: 40.00,
 image: "./images/HTC.jpg"
};

const product2 = {
    brand : "Apple",
    price: 75.00,
    image: "./images/iphone-3gs.jpg"
};
const product3 = {
    brand : "Nokia",
    price: 35.00,
    image: "./images/Nokia.jpg"
};
const product4 = {
    brand : "Samsung",
    price: 45.00,
    image: "./images/Samsung.jpg"
};
const product5 = {
    brand : "Blackberry",
    price: 10.00,
    image: "./images/Blackberry.jpg"
};

const products = [product1, product2, product3, product4, product5];

for (i = 0; i < products.length; i++) {
    document.querySelector('.main').innerHTML += `
<section class="item" onmouseover="changeClassName(this);" onclick="resetClassName(this); ">
<h2>${(products[i].brand)}</h2>
<p>$${(products[i].price)}</p>
<img src=${(products[i].image)}/>
<label id="quantity${i}_label" for="quantity${i}">Quantity Desired</label>
<input type="text" name="quantity${i}" id="quantity${i}">
</section> 
    `;
}


function changeClassName(element) {
    if(element.className == 'item'){
        spins = spins+1;
        element.className = 'item rotate';
    }
    //spins=spins+1; 
    if (spins < 2 * hits && hits < spins){
        // wins = true;
        over_half = true;
    }else {
        //wins = false;
    }
    //win_span.innerHTML = wins;
    win_span.innerHTML = over_half;
    spins_span.innerHTML = spins; 
    hit_spin_span.innerHTML=Number(hits/spins).toFixed(2)
}

function resetClassName(element) {
    //win_span.innerHTML = wins;
    win_span.innerHTML = over_half;
    hits_span.innerHTML = hits; 
    hit_spin_span.innerHTML=Number(hits/spins).toFixed(2)
    if (element.className == 'item rotate') {
        hits=hits+=2;
        element.className = 'item';
    } else {
        changeClassName(element);
    }
    

    if (spins < 2 * hits && hits < spins){
        // wins = true;
        over_half = true;
    }else {
        //wins = false;
    }
}
        // -- Winning progress depends on hits/spins
if ( hits_spins_ratio > 0 ) {
    progress = 'On your way!';
    if ( hits_spins_ratio >= 0.25 ) {
        progress = 'Almost there!';
        if ( hits_spins_ratio >= 0.5 ) {
            if( hits < spins) { 
                progress = 'You win!';
            }
        }
    }
}
    else {
        progress = 'Get going!' ;
    }
    
       // -- Winning progress depends on hits/spins
/*
let hits_spins_ratio = hits/spins;
let progress;

if ( hits_spins_ratio >= 0.5 ) {
    if ( hits < spins) { 
        progress = 'You win!'
    }else {
        progress = 'hit/spins too high!';
    }
}else if (hits_spins_ratio >= 0.25){
    progress = 'almost there!';
}else if (hits_spins_ratio >= 0){
    progress = 'On your way!';
}
else {
    progress = 'get going!';
}
win_span.innerHTML = progress;
}
*/