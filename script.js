const apiKey = "8d54717adb645f982203806a40f6a0db";           //API Key de OpenWeatherMap
const getWeatherButton = document.getElementById("get-button-tiempo");
const cityInput = document.getElementById("ciudad");
const weatherInfo = document.getElementById("inf-tiempo");

getWeatherButton.addEventListener("click", () => {
  const city = cityInput.value;

  if (city) {
    getWeather(city);
  } else {
    alert("Por favor, ingrese una ciudad.");
  }
});

async function getWeather(city) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
    );
    const data = await response.json();

    if (response.ok) {
      const temperature = Math.round(data.main.temp - 273.15);
      const description = data.weather[0].description;
      const cityName = data.name;
      const country = data.sys.country;
      const sunsetTime = data.sys.sunset * 1000; // Convertir el timestamp a milisegundos
      const sunriseTime = data.sys.sunrise * 1000;

      const currentTime = new Date().getTime();

      // Determinar si es de día o de noche comparando con las horas de atardecer y amanecer
      let isDaytime = currentTime > sunriseTime && currentTime < sunsetTime;
      var urlClima = isDaytime ? "./img/dom.png" : "./img/noche.png"; 

      var fondoUrl = isDaytime ? "./img/dia.jpg.jpg" : "./img/noche.jpg.jpg"; //imagen de fondo dependiendo de si es de día o de noche

      // Cambiar la imagen de fondo
      document.body.style.backgroundImage = `url(${fondoUrl})`;

      weatherInfo.innerHTML = `
                <p>Clima en ${cityName}, ${country}:</p>
                <p>Temperatura: ${temperature}°C</p>
                <p>Descripción: ${description}</p>
                <img src= ${urlClima}>
                <p>${isDaytime ? "Es un Lindo Día." : "Es una Hermosa Noche."}</p>
            `;
    } else {
      weatherInfo.textContent = "Ciudad no encontrada.";
    }
  } catch (error) {
    console.error("Error:", error);
    weatherInfo.textContent = "Ocurrió un error al obtener el clima.";
  }
}




      // var urlClima = "./img/dom.png";

      // if (temperature < 23){
      //   urlClima = "./img/lluvia.png";
      // }
      // else if (temperature < 30){
      //   urlClima = "./img/nublado.png";
      // }

