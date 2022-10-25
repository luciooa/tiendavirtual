let btnMenu = document.getElementById('btn-menu');
let mainNav = document.getElementById('main-nav');
btnMenu.addEventListener('click', function(){
  mainNav.classList.toggle('mostrar');
});

document.addEventListener("keyup", e=> {

	if (e.target.matches("#buscador")) {

		if (e.key === "Escape")e.target.value = ""

		document.querySelectorAll(".product").forEach(fruit =>{
			fruit.textContent.toLowerCase().includes(e.target.value.toLowerCase())
			?fruit.classList.remove("filtro")
			:fruit.classList.add("filtro")
		})
	}
})

/*let cartIcon = document.querySelector("#cart-icon");
let cart = document.querySelector(".cart");
let closeCart = document.querySelector("#close-cart");

cartIcon.onclick = () => {
	cart.classList.add("active");
};
closeCart.onclick = () => {
	cart.classList.remove("active");
};

if (document.readyState == "loading") {
	document.addEventListener("DOMContentLoaded", ready)
}else{
	ready();
}
function ready(){
	var removeCartButtons = document.getElementsByClassName("cart-remove")
	console.log(removeCartButtons)
	for (var i = 0; i < removeCartButtons.length; i++){
		var button = removeCartButtons[i]
		button.addEventListener("click", removeCartItem);
	}

	var quantityInputs = document.getElementsByClassName("cart-quantity");
	for (var i = 0; i < quantityInputs.length; i++) {
		var input = quantityInputs[i];
		input.addEventListener("change", quantityChanged);
	}
	var addCart = document.getElementsByClassName("add-cart");
	for (var i = 0; i < addCart.length; i++) {
		var button = addCart[i];
		button.addEventListener("click", addCartClicked);
	}

	document.getElementsByClassName("btn-buy")[0].addEventListener("click", buyButtonClicked);
} */

let productoList = [];
let carrito = [];
let resultado = 0;
let order = {
	items: []
};

function agregar(productoId, precio) {

	const producto = productoList.find(p => p.id === productoId);
	const quantity = document.getElementById(`quantity_${productoId}`).value; // obtener la cantidad del input para ese productoId
    producto.stock = producto.stock - quantity; // restar quantity del stock, en lugar de restar 1.

	// Agregar el producto al carrito tantas veces como cantidad seleccionada
	for (let i = 0; i < quantity; i++) {
		order.items.push(producto);
		carrito.push(productoId);
	  }
	  
	  console.log(productoId, precio, quantity);
	
    resultado = resultado + (precio*quantity); // El total es el precio del producto por la cantidad seleccionada
    document.getElementById("cart-icon").innerHTML = `Mostrar Orden $${resultado}`;
	displayProductos();
	alert("Producto Añadido Al Carrito");

}
function añadir(productoId, precio) {

	const producto = productoList.find(p => p.id === productoId);
    producto.stock--;

	order.items.push(productoList.find(p => p.id === productoId));

    console.log(productoId, precio);
    carrito.push(productoId);
    resultado = resultado + precio;
    document.getElementById("cart-icon").innerHTML = `Mostrar Orden $${resultado}`
	showOrder();

}

function quitar(productoId, precio) {
	const producto = productoList.find(p => p.id === productoId);
    producto.stock++;

	// quitar 1 item de la orden
    order.items.splice(order.items.indexOf(productoList.find((p) => p.id === productoId)), 1);

    console.log(productoId, precio);
    carrito.push(productoId);

    // quita el producto del carrito
    carrito.splice(carrito.indexOf(productoId), 1);

    // devuelve el total
    resultado = resultado - precio;
    document.getElementById("cart-icon").innerHTML = `Mostrar Orden $${resultado}`
    document.getElementById("order-total").innerHTML = `Total:$${resultado}`;
    showOrder();
}

async function showOrder() {
    document.getElementById("all-products").style.display = "none";
	document.getElementById("container-editor").style.display = "none";
    document.getElementById("order").style.display = "block";
	document.getElementById("h2").style.display = "none";
	document.getElementById("quitar").style.display = "none";
	document.getElementById("footer").style.display = "none";
    document.getElementById("order-total").innerHTML = `Total:$${resultado}`;

    let productosHTML = `
    <tr>
	<th>Imagen</th>
	<th>Cantidad</th>
	<th>Detalles</th>
	<th>Subtotal</th>
	<th>Quitar</th>
	<th>Agregar</th>
    </tr>`
    ;
    order.items.forEach(p => {

        productosHTML +=
        `<tr>
		<div>
		<td><img src="${p.image}" alt="" class="product__img__cart"></td>
		</div>
            <td>1</td>
            <td>${p.name}</td>
            <td>$${p.price}</td>
            <td><i class="fa-solid fa-trash cart-remove" onclick="quitar(${p.id}, ${p.price})"></i></td>
            <td><i class="fa-solid fa-plus cart-remove" onclick="añadir(${p.id}, ${p.price})"></i></td>

        </tr>`
    });
    document.getElementById('order-table').innerHTML = productosHTML;
}

async function pagar() {
	try{

		order.shipping = {
			name: document.getElementById("name").value,
			email: document.getElementById("email").value,
			phone: document.getElementById("phone").value,
			addressLine1: document.getElementById("addressLine1").value,
			addressLine2: document.getElementById("addressLine2").value,
			city: document.getElementById("city").value,
			postalCode: document.getElementById("postalCode").value,
			state: document.getElementById("state").value,
			country: document.getElementById("country").value,
		  };


        const preference = await (await fetch("/api/pagar",{
            method: "post",
            body: JSON.stringify(order),
            headers: {
                "Content-Type": "application/json"
            }
        })).json();

		var script = document.createElement("script");
  
        // The source domain must be completed according to the site for which you are integrating.
        // For example: for Argentina ".com.ar" or for Brazil ".com.br".
        script.src = "https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js";
        script.type = "text/javascript";
        script.dataset.preferenceId = preference.preferenceId;
		script.setAttribute("data-button-label", "Pagar Con Mercado Pago");
        document.getElementById("order-actions").innerHTML = "";
        document.querySelector("#order-actions").appendChild(script);

		document.getElementById("name").disabled = true;
		document.getElementById("email").disabled = true;
		document.getElementById("phone").disabled = true;
		document.getElementById("addressLine1").disabled = true;
		document.getElementById("addressLine2").disabled = true;
		document.getElementById("city").disabled = true;
		document.getElementById("postalCode").disabled = true;
		document.getElementById("state").disabled = true;
		document.getElementById("country").disabled = true;

    }
	catch {
        window.alert("Fuera de stock");
    }

    carrito = [];
    resultado = 0;
	order = {
		items: []
	};
    //await fetchProductos();
    document.getElementById("chequear").innerHTML = `Mostrar Orden $${resultado}`
}

//-----
function displayProductos() {
 
	document.getElementById("all-products").style.display = "grid";
    document.getElementById("order").style.display = "none";

	const guitars = productoList.filter((p) => p.category === "guitars");
	displayProductosByType(guitars,"product-cards-guitars");

	const bass = productoList.filter((p) => p.category === "bass");
	displayProductosByType(bass,"product-cards-bass");

	const drums = productoList.filter((p) => p.category === "drums");
	displayProductosByType(drums,"product-cards-drums");
}

function displayProductosByType(productosByType,tagId) {
	let productosHTML = '';
    productosByType.forEach((p) => {

		let botonHTML =`<button class="comprar blue add-cart" onclick="agregar(${p.id}, ${p.price})">AGREGAR AL CARRITO</button>`;

		if (p.stock <= 0) {
            botonHTML = `<button disabled class="blue add-cart disabled grey" onclick="agregar(${p.id}, ${p.price})">FUERA DE STOCK</button>`;
        }

        productosHTML +=
        `<div class="product">
		<img src="${p.image}" alt="" class="product__img">
		<div class="product__description">
			<h3 class="product__title">${p.name}</h3>
			<h4 class="cantidad">Cantidad (${p.stock})</h4>
			<span class="product__price">$${p.price}</span>
			<h3>Cantidad&nbsp;&nbsp;<input type="number" class="cart-quantity" value="1" min="1" max="${p.stock}" id="quantity_${p.id}"></h3>
		</div>
		<i class="product__icon fa-solid fa-cart-plus"></i><br><br>
		${botonHTML}
	</div>`
    });
    document.getElementById(tagId).innerHTML = productosHTML;
}

async function fetchProductos(){
    productoList = await (await fetch("/api/productos")).json();
    displayProductos();
}

window.onload = async() => {
    await fetchProductos();
}

//------------------------------ NUEVO CARRO --------------------------

