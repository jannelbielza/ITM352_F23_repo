// declare variables per lab 5.1 instructions
let age = 21;
let fav_num = 3;
let day_of_birth = 7;
let month_of_birth = 3;

// define calculations
let calculations1 = age + fav_num / day_of_birth * month_of_birth;

let calculations2 = (age + fav_num) / day_of_birth * month_of_birth;

// output calc 1 & 2 to the DOM
document.getElementById("result1").innerHTML = calculations1;

document.getElementById("result2").innerHTML = calculations2;

