<!DOCTYPE html>
<html lang="es">
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, user-scalable=no, maximum-scale=1,minimum-scale=1, initial-scale=1">
	<link rel="stylesheet" href="estilocontact.css">
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css">
	<title>Tienda Online</title>
</head>
<body>
	<header class="main-header">
		<div class="container container--flex">
			<div class="main-header__container"><a href="index.html" class="main-header__title">MUSICIANS</a>
		<span class="icon-menu" id="btn-menu"><i class="fa-solid fa-bars"></i></span>
		<nav class="main-nav" id="main-nav">
			<ul class="menu">
				<li class="menu__item"><a href="index.html" class="menu__link">HOME</a></li>
				<li class="menu__item"><a href="about.html" class="menu__link">ABOUT</a></li>
				<li class="menu__item"><a href="shopping.html" class="menu__link">SHOP</a></li>
				<li class="menu__item"><a href="contact.html" class="menu__link">CONTACT</a></li>
			</ul>
		</nav>
		</div>	
		<div class="main-header__container">
			<span class="main-header__txt">Contact Us</span>
			<div class="main-header__txt">
			<a href="https://wa.me/543547570937" target="_blank"><i class="fa-brands fa-square-whatsapp redes"></i></a>
				<a href="https://www.facebook.com/lucioaltamirano" target="_blank"><i class="fa-brands fa-square-facebook redes"></i></a>
				<a href="https://www.instagram.com/lucio_altamirano/" target="_blank"><i class="fa-brands fa-square-instagram redes"></i></a>
				<a href="tel:+540354715570937"><i class="fa-solid fa-square-phone redes"></i></a>
			</div>
		</div>
		<div class="main-header__container">
			<a href="" class="main-header__link"><i class="fa-solid fa-user"></i></a>
			<a href="" class="main-header__btn">My Cart<i class="fa-solid fa-cart-shopping"></i></a>
			<input id="buscador" type="search" class="main-header__input" placeholder="Search products"><i class="fa-solid fa-magnifying-glass"></i>
		</div>
		</div>
	</header>
<main class="main">
		<div class="container-editor">
		<div class="editor__item"><img src="11.png" alt="" class="vieja__img">
			<div class="vieja__content"><h2 class="vieja__title"><a class="home" href="index.html">HOME</a> | CONTACT US</h2></div>
		</div>
	</div>
	<h2 class="contact__title">Contact Us</h2>
	<p class="contact__txt">WE LOVE TO DISCUSS YOUR IDEA</p>	
	<section class="container__partners">
		<div class="container__partners__one">
			<div class="partner">
				<i class="fa-solid fa-map iconos"></i><h3>Adress</h3><p>California,USA</p>
			</div>
			<div class="partner">
				<i class="fa-solid fa-envelope iconos"></i></i><h3>Email</h3><p>Email: mail@example.com</p>
			</div>
			<div class="partner">
				<i class="fa-solid fa-mobile-screen iconos"></i></i><h3>Phone</h3><p>+54 03547-15570937</p>
			</div>
	</section>
	<form method="post" class="formulario">
		<div>
			<input type="text" class="formulario__input" required="" name="nombre"><label for="" class="formulario__label">Names</label>
		<input type="text" class="formulario__input" required="" name="correo"><label for="" class="formulario__label">Email</label>
		<input type="text" class="formulario__input" required="" name="asunto"><label for="" class="formulario__label">Subject</label>
		</div>
		<div>
			<textarea  type="text" class="message" placeholder="Message" required="" name="mensaje"></textarea>
		<input type="submit" class="formulario__submit">
	</div>
	</form>
	<div class="maps">
			<h2 class="subtitle">Our Location</h2>
		<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d58055.96093966149!2d-118.34448803937586!3d34.1102822362051!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2bf61e9d408cb%3A0x73ff07b1c2d6dadc!2sObservatorio%20Griffith!5e0!3m2!1ses-419!2sar!4v1663684356824!5m2!1ses-419!2sar" width="100%" height="300" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
	</div>
	

</main>
<footer class="main-footer">
	<div class="footer__section">
		<h2 class="footer__title">About Us</h2>
		<p class="footer__txt">Curabitur non nulla sit amet nislinit tempus convallis quis ac lectus. lac inia eget consectetur sed, convallis at tellus. Nulla porttitor accumsana tincidunt.</p>
	</div>
	<div class="footer__section">
		<h2 class="footer__title">Location:</h2>
		<p class="footer__txt">0926k 4th block building, king Avenue, New York City.</p>
		<h2 class="footer__title">Contact:</h2>
		<p class="footer__txt">Phone: +121 098 8907 9987</p>
		<p class="footer__txt">Email: info@example.com</p>
	</div>
	<div class="footer__section">
		<h2 class="footer__title">Quick Links</h2>
		<a href="index.html" class="footer__link">Home</a>
		<a href="about.html" class="footer__link">About</a>
		<a href="shopping.html" class="footer__link">Shop</a>
		<a href="contact.html" class="footer__link">Contact Us</a>
	</div>
	<div class="footer__section">
		<h2 class="footer__title">Sign up for your offers</h2>
		<p class="footer__txt">By subscribing to our mailing list you will always get latest news and updates from us.</p>
		<input type="email" class="footer__input" placeholder="Enter your email" name="">
	</div>
	<p class="copy">© 2022 Goggles. All Rights Reserved | Design by <a href="" class="lucio">Lucio Altamirano</a></p>
</footer>
<?php
include("enviar.php");
?>
<script src="slider1.js"></script>
</body>
</html>