/*
//this outputs 1 2 3
function junk1() {
    for(i1=1; i1<=2; i1++){console.log(i1);}
    return `i1 is ${i1}`;
}

junk1();
console.log(i1);
*/
/*
// outputs 1 2 then reference error -_-
function junk2() {
    for(var i2=1; i2<=2; i2++){console.log(i2);}
    return `i2 is ${i2}`;
}

junk2();
console.log(i2); //This resulted in a reference error because i2 is not defined even though it is using var. Var creates function scoped variables.
*/

function junk3() {
    for(let i3=1; i3<=2; i3++){console.log(i3);}
    return `i3 is ${i3}`;
}

junk3();
console.log(i3); // this resulted in a reference error because i3