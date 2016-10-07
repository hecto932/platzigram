var page = require("page");
var yo = require('yo-yo');
var empty = require('empty-element');

var main = document.getElementById("main-container");

page('/', function(ctx, next){
	main.innerHTML = "Home <a href='/signup'>Signup</a>"
});

page('/signup', function(ctx, next){
	var el = yo`<div class="container">
			<div class="row">
				<div class="col s10 push-s1">
					<div class="row">
						<div class="col m5 hide-on-small-only">
							<img src="iphone.png" class="iphone" alt="iphone"/>
						</div>
						<div class="col s12 m7">
							<div class="row">
								<div class="signup-box">
									<h1 class="platzigram">Platzigram</h1>
									<form class="signup-form" action="">
										<h2>Registrate para ver fotos de tus amigos estudiando en Platzi</h2>
										<div class="section">
											<a href="" class="btn btn-fb hide-on-small-only">Iniciar sesión con Facebook</a>
											<a href="" class="btn btn-fb hide-on-med-and-up">Iniciar sesión</a>
										</div>
										<div class="divider"></div>
										<div class="section">
											<input type="email" name="email" placeholder="Correo electrónico"/>
											<input type="text" name="name" placeholder="Nombre completo"/>
											<input type="text" name="username" placeholder="Nombre de usuario"/>
											<input type="password" name="password" placeholder="Contraseña"/>
											<button class="btn waves-effect waves-light btn-signup" type="submit">Registrar</button>
										</div>
									</form>
								</div>
							</div>
							<div class="row">
								<div class="login-box">
									¿Tienes una cuenta? <a href="/signin">Entrar</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>`;

	empty(main).appendChild(el);
});

page.start();