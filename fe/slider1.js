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

var inputs = document.getElementsByClassName('formulario__input');
for (var i = 0; i < inputs.length; i++) {
	inputs[i].addEventListener("keyup", function(){
		if(this.value.length>=1) {
		this.nextElementSibling.classList.add('fijar');		
		} else {
			this.nextElementSibling.classList.remove('fijar');
		}
		});
	}

	var input = document.getElementByClassName('message');
for (var i = 0; i < inputs.length; i++) {
	inputs[i].addEventListener("keyup", function(){
		if(this.value.length>=1) {
		this.nextElementSibling.classList.add('fijar');		
		} else {
			this.nextElementSibling.classList.remove('fijar');
		}
		});
	}

