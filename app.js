const DomStuff = {
  inputCity: document.getElementById("inputCity"),
  clima: document.getElementById("clima"),
  location: document.getElementById("localizacion"),
  temp: document.getElementById("info"),
  sensacion: document.getElementById("sensacion"),
  viento: document.getElementById("viento"),
  humedad: document.getElementById("humedad"),
  icono: document.getElementById("icono"),
};

const myKey = "c9c5d9b65edf218f5dcd24e537321852";
const ciudad = "azua";
let urlcheked = urlChecker();

window.addEventListener("load", getData(url));

window.addEventListener("keydown", presionarTecla);

DomStuff.icono.addEventListener("click", () => {
  if (DomStuff.inputCity.value == "") return;
  let urlCheked2 = urlChecker();
  getData(urlCheked2);
  DomStuff.inputCity.value = "";
});

function presionarTecla() {
  let enter = event.keyCode;
  if (enter == 13) {
    let urlCheked2 = urlChecker();
    getData(urlCheked2);
    DomStuff.inputCity.value = "";
  }
}

function urlChecker() {
  if (DomStuff.inputCity.value != "") {
    url = `https://api.openweathermap.org/data/2.5/weather?q=${DomStuff.inputCity.value}&units=metric&appid=${myKey}&lang=es`;
  } else {
    url = `https://api.openweathermap.org/data/2.5/weather?q=azua&units=metric&appid=${myKey}&lang=es`;
  }

  return url;
}

async function getData(url) {
  const respuesta = await fetch(url, {
    mode: "cors",
  });
  const respu = await respuesta.json();
  changeDomStuff(respu);
}

const changeDomStuff = (respu) => {
  resetField();
  DomStuff.clima.textContent = respu.weather[0].main;
  DomStuff.location.textContent = respu.name + ", " + respu.sys.country;
  

  DomStuff.temp.innerHTML= `${Math.round(respu.main.temp * 10) / 10} <span id="celcius">°C<span> ` 
  



  DomStuff.sensacion.innerHTML = `${DomStuff.sensacion.textContent} ${
    Math.round(respu.main.feels_like * 10) / 10
  }<span id="celciuspe">°C<span> `;
  DomStuff.viento.textContent =
    DomStuff.viento.textContent + " " + respu.wind.speed + " " + "MPH";
  DomStuff.humedad.textContent =
    DomStuff.humedad.textContent + " " + respu.main.humidity + "%";
};

const resetField = () => {
  DomStuff.clima.textContent = " ";
  DomStuff.location.textContent = " ";
  DomStuff.temp.textContent = " ";
  DomStuff.sensacion.textContent = "Sensacion Termica: ";
  DomStuff.viento.textContent = "Viento: ";
  DomStuff.humedad.textContent = "Humedad:  ";
};
