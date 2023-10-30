//declare and push to the DOM the store name at top and bottom
const store_name="Jannel";
top_title.innerHTML=(store_name + "'s Used Smart Phone Store");
bottom_title.innerHTML=("Your one stop shop for used phones - " + store_name);

const product1 = {
    name: "HTC",
    price: 40.00,
    image: "images/HTC.jpg"
};

const product2 = {
    name: "Apple",
    price: 75.00,
    image: "images/iphone-3gs.jpg"
};

const product3 = {
    name: "Nokia",
    price: 35.00,
    image: "images/Nokia.jpg"
};

const product4 = {
    name: "Samsung",
    price: 45.00,
    image: "images/Samsung.jpg"
};

const product5 = {
    name: "Blackberry",
    price: 10.00,
    image: "images/Blackberry.jpg"
};

const products = [product1, product2, product3, product4, product5];


for (let i=0; i < products.length; i++){
    const product = products[i];
    document.querySelector('.main').innerHTML += `
    <section class="item">
        <h2>${product.name}</h2>
        <p>$${product.price}</p>
        <img src="${product.image}" />
        <label id="quantity${i}_label" for="quantity${i}">Quantity Desired</label>
        <input type="text" name="quantity${i}" id="quantity${i}">
    </section>`;
}