//define store name and push it to the DOM in the top title
const store_name="Jannel";
top_title.innerHTML=(store_name + "'s Used Smart Phone Store");

//send store name info to the footer title
bottom_title.innerHTML=("Your one stop shop for used phones - "+store_name+"'s");            

//initialize hits and spins and send to the DOM
let hits= 0;
let spins=0;
//let wins;
let over_half=false;
hits_span.innerHTML = hits; 
spins_span.innerHTML = spins;

//this should be two functions or more but... it changes the item name to rotate for the images and updates the spin count and calculates hits/spins ratio, sending both to the DOM
function changeClassName(element) {
    if(element.className=='item'){
        spins=spins+1;
        element.className = 'item rotate';
    } 
        
    //spins=spins+1; 
    if(spins<2*hits&&hits<spins){
        wins=true;
    } else {
        wins=false;
    }
    //win_span.innerHTML=wins;
    win_span.innerHTML=over_half;
    spins_span.innerHTML = spins; 
    hit_spin_span.innerHTML=(hits/spins).toFixed(2);
}

//this should be two functions or more but... it changes the item name by removing the rotate for the images and updates the hits count and calculates hits/spins ratio, sending both to the DOM
function resetClassName(element) {
    if(element.className=='item rotate'){
        hits=hits+=2; 
        element.className = 'item';
    } else {
        changeClassName(element);
    }
        
    if(spins<2*hits&&hits<spins){
        //wins=true;
        over_half=true;
    } else {
        //wins=false;
    }
    //win_span.innerHTML=wins;
    
    win_span.innerHTML=over_half;
    hits_span.innerHTML = hits; 
    hit_spin_span.innerHTML=(hits_span.innerHTML/spins_span.innerHTML).toFixed(2);
}


