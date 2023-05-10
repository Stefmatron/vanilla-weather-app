function currentTemp(response) {
    let TempElement = document.querySelector("#cityDeg");
    let cityElement = document.querySelector("#cityName");
    let windElement = document.querySelector("#cityWin");
    let desElement = document.querySelector("#cityDes");
    let citIcon = document.querySelector("#cityIcon");
    let humElement = document.querySelector("#cityHum")
   console.log('#', response, humElement);
    TempElement.innerHTML = Math.round (response.data.temperature.current);
    humElement.innerHTML = response.data.temperature.humidity;
    console.log('#', response.data.temperature.current);

    celsiusTemp = response.data.temperature.current;

    cityElement.innerHTML = response.data.city;
    desElement.innerHTML = response.data.condition.description;
    windElement.innerHTML = Math.round (response.data.wind.speed);
    citIcon.setAttribute("src", response.data.condition.icon_url);
}

function search(city) {
    console.log(city);
    let apiUrl = getApiData(city);
    axios.get(apiUrl).then(currentTemp);
    let h1 = document.querySelector("#cityName");
    h1.innerHTML = city; return false;
}

function inputCity(event) {
    let cityInput = document.querySelector(".form-control");
    search(cityInput.value); return false;
}

function showFahrenheit(event) {
    let tempElement = document.querySelector("#cityDeg");
    let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
    tempElement.innerHTML = Math.round (fahrenheitTemp);
}

function showCelsius(event) {
    let tempElement = document.querySelector("#cityDeg");
    tempElement.innerHTML = Math.round (celsiusTemp);
}

function initData() {
    let city = "Argenthal";
    let apiUrl = getApiData(city);
    axios.get(apiUrl).then(currentTemp);
}

function getApiData(city) {
    let apiKey = "6af364afb0c9b134to765939b0fbbf44";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
    return apiUrl;
}

function enter(event) {
    console.log('##', event);
    if (event.keyCode === 13) {
        document.querySelector("#button").click();
    }
}

function currentTemp() {
    let forecastElement = document.querySelector("#forecastDays");

    let day = ["Thu", "Fri", "Sat", "Sun"];

    let forecastHTML = `<div class="row">`;
    day.forEach(function (day) {
        forecastHTML =
            forecastHTML +
            `
            <div class="col-2">
              <div class="forecastDays">${day}</div>
            <img src="../src/icons/rain-day.png" alt="rain-day" class="img-icon"/>
            <div class="forecast-temp">
              <span class="forecast-temp-max"> 18° </span>
              <span class="forecast-temp-min"> 12° </span>
            </div>
            </div>
            `;
        });
forecastHTML = forecastHTML + `</div>`;
forecastElement.innerHTML = forecastHTML;
console.log(forecastHTML);
    }


initData();
currentTemp();

let searchField = document.querySelector(".form-control");
searchField.addEventListener("keypress", enter);

let form = document.querySelector("#button");
form.addEventListener("click", inputCity);
