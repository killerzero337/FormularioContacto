//declaracion de algunas variables
var nombre = document.querySelector(".nombre");
var contraseña = document.querySelector(".campoContraseña");
var email = document.querySelector(".email");
var botonEnvio = document.getElementById("botonEnvio");
let mensajeDeConfirmar = document.querySelector(".mensajeDeConfirmar");

var valorTipoElegidoSelect =
  document.getElementById("selecionarComision").value;
var campoSelect = document.getElementById("seleccionarComision");
var primerCampoGenerado = false;
var segundoCampoGenerado = false;

var camposInput = document.querySelectorAll(".formulario input");
var camposRequeridos = document.querySelectorAll(".formulario [required]");
var cajaDeImagen = document.querySelector(".img");

//https://lenguajejs.com/javascript/multimedia/api-multimedia-nativa/
var audio = new Audio("assets/audio/songDragon.mp3");

// var selectLista = document.getElementById("seleccionarComision");

console.log(nombre);
console.log(contraseña);
console.log(email);

// console.log(selectLista);

function generarPrimerSelect() {
  var campoSelect = document.getElementById("selecionarComision");
  var valorTipoElegidoSelect = campoSelect.value;
  var campoFormulario = document.querySelector(".formulario");

  var opcionDefault = document.createElement("option");

  campoSelect.appendChild(opcionDefault);

  if (primerCampoGenerado == false) {
    if (
      valorTipoElegidoSelect == "sketch" ||
      valorTipoElegidoSelect == "line"
    ) {
      campoFormulario.innerHTML += `
      <div>
        <label for="metodoPago">Escoja método de pago:</label>
        <select name="metodoPago" id="seleccionarMetodoPago" onchange="generarSegundoSelect()">
          <option value="" disabled selected>Elija método...</option>
          <option value="paypal">Paypal</option>
          <option value="bizum">Bizum</option>
          <option value="visa">Visa</option>
        </select>
      </div>`;
    } else if (valorTipoElegidoSelect == "full") {
      campoFormulario.innerHTML += `
      <div>
        <label for="campoRelleno">Rellene el campo...</label>
        <input type="text" name="campoNoSeMeOcurreNada" id="describir" placeholder="Describa que desea">
      </div>`;
    }

    primerCampoGenerado = true;
  }
}

function generarSegundoSelect() {
  if (segundoCampoGenerado == false) {
    var campoSelect = document.getElementById("seleccionarMetodoPago");
    var valorSegundoSelect = campoSelect.value;
    var campoFormulario = document.querySelector(".formulario");

    if (valorSegundoSelect === "paypal" || valorSegundoSelect == "bizum") {
      campoFormulario.innerHTML += `
        <div>
          <label for="diasEncargo">En cuanto tiempo:</label>
          <select name="diasEncargo" id="diasEncargo">
            <option value="" disabled selected>Elija opción...</option>
            <option value="opcion1">1-3 dias</option>
            <option value="opcion2">1 semana</option>
            <option value="opcion3">3 semanas</option>
          </select>
        </div>`;

      segundoCampoGenerado = true;
    }
  }
}

function mostrarContraseña() {
  console.log("contra visible");
  var mostrarPass = document.getElementById("mostrarPass");

  if (contraseña.type == "password") {
    contraseña.type = "text";
    mostrarPass.innerHTML = '<i class="fa-regular fa-eye-slash"></i>';
  } else {
    //console.log("estoy dentro");
    contraseña.type = "password";
    mostrarPass.innerHTML = '<i class="fa-regular fa-eye"></i>';
  }
}

//Se que hay una etiqueta para limpiar el formulario
//pero no se me ocurria mas botones
function limpiarCampos() {
  // Aqui explicar porque pongo estas variables aqui y no fuera:
  var campoMetodoPago = document.getElementById("seleccionarMetodoPago");
  var formulario = document.querySelector(".formulario");
  var campoTiempo = document.getElementById("diasEncargo");
  var descripcion = document.getElementById("describir");

  console.log("Limpiando los campos");
  nombre.value = "";
  email.value = "";
  contraseña.value = "";
  camposInput.forEach((input) => {
    input.classList.remove("enfocado");
  });

  if (campoMetodoPago) {
    formulario.removeChild(campoMetodoPago.parentNode);
    primerCampoGenerado = false;
  }

  if (descripcion) {
    formulario.removeChild(descripcion.parentNode);
    primerCampoGenerado = false;
  }

  if (campoTiempo) {
    formulario.removeChild(campoTiempo.parentNode);
    segundoCampoGenerado = false;
  }

  //https://www.w3schools.com/jsref/prop_select_selectedindex.asp
  document.getElementById("selecionarComision").selectedIndex = 0;
  botonEnvio.disabled = true;
}

function comprobarCampos() {
  let camposRellenados = 0;

  for (let i = 0; i < camposRequeridos.length; i++) {
    const campo = camposRequeridos[i];

    if (campo.value === "") {
      mostrarError(campo, "Campo Vacio");
    } else {
      ocultarError(campo);
      camposRellenados++;
    }
  }

  if (camposRellenados === camposRequeridos.length) {
    botonEnvio.disabled = false;
  } else {
    botonEnvio.disabled = true;
  }

  function ocultarError(campo) {
    var errorParrafo = campo.parentElement.querySelector(".mensajeError");
    if (errorParrafo) {
      errorParrafo.remove();
      campo.classList.remove("error");
    }
  }
}

function mostrarError(campo, mensaje) {
  var errorParrafo = campo.parentElement.querySelector(".mensajeError");

  if (!errorParrafo) {
    errorParrafo = document.createElement("p");
    errorParrafo.className = "mensajeError";
    campo.parentElement.appendChild(errorParrafo);
  }

  errorParrafo.textContent = mensaje;
  campo.classList.add("error");
}

//Con algo mas de tiempo me hubiera gustado hacer un POST a un JSON.
// video donde adquiri el conocimiento de como realizarlo: https://www.youtube.com/watch?v=5c8NLiKW5aI&ab_channel=GroverV%C3%A1squez
//las animaciones se han realizado gracias a los apuntes de Jose Antonio Muñoz
function enviarFormulario() {
  mensajeDeConfirmar.style.display = "flex";
  setTimeout(() => {
    mensajeDeConfirmar.style.display = "none";
  }, 5000);
}

function imprimirFormulario() {
  window.print();
}
cajaDeImagen.addEventListener("mouseover", cambiarImagen);

function cambiarImagen() {
  var imagenAleatoria = Math.floor(Math.random() * 4) + 1;
  // var imagenAleatoria = 4;
  switch (imagenAleatoria) {
    case 1:
      cajaDeImagen.style.backgroundImage =
        "url('assets/images/ansia-oscura.jpg')";
      audio.pause();
      break;

    case 2:
      cajaDeImagen.style.backgroundImage = "url('assets/images/gwother.jpg')";
      audio.pause();
      break;
    case 3:
      cajaDeImagen.style.backgroundImage =
        "url('assets/images/illustration-sign-up-desktop.svg')";

      audio.pause();
      break;
    case 4:
      cajaDeImagen.style.backgroundImage =
        "url('assets/images/dragondance.gif')";
      audio.play();
      // audio.volume(0.5);
      break;
    default:
      console.log("me sali del rango");
      break;
  }
}

camposInput.forEach((input) => {
  input.addEventListener("focus", function () {
    input.classList.add("enfocado");
  });

  input.addEventListener("blur", function () {
    if (input.value === "") {
      input.classList.remove("enfocado");
    }
  });
});
