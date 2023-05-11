function getCurrentTemp(response) {
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

    console.log(response.data);
    console.log('#repsonse', response, response.data, celsiusTemp);
    getForecast(response.data.coordinates);

}

function getForecast(coordinates) {
    console.log('#coord', coordinates);
     let apiKey = "6af364afb0c9b134to765939b0fbbf44";
     let apiUrl =`https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}&units=metric`;
     console.log(apiUrl);
     axios.get(apiUrl).then(currentTemp);
    }

function search(city) {
    console.log(city);
    let apiUrl = getApiData(city);
    axios.get(apiUrl).then(getCurrentTemp);
    let h1 = document.querySelector("#cityName");
    h1.innerHTML = city; return false;
}

function inputCity(event) {
    let cityInput = document.querySelector(".form-control");
    search(cityInput.value); return false;
}


function initData() {
    let city = "Argenthal";
    let apiUrl = getApiData(city);
    axios.get(apiUrl).then(getCurrentTemp);
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

function formatDay(timestamp) {
    let date = new Date(timestamp * 1000);
    let day = date.getDay();
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return days[day];
}

function currentTemp(response) {
    let currentForecast = response.data.daily;
    
    let forecastElement = document.querySelector("#forecastDays");

    let forecastHTML = `<div class="row">`;
    currentForecast.forEach(function (forecastDay, index) {
        if (index < 6 ) {
        forecastHTML =
            forecastHTML +
            `
            <div class="col-2">
              <div class="forecastDays">${formatDay(forecastDay.time)}</div>
            <img src="${forecastDay.condition.icon_url}" alt="rain-day" class="img-icon"/>
            <div class="forecast-temp">
              <span class="forecast-temp-max"> ${Math.round(forecastDay.temperature.maximum)}° </span>
              <span class="forecast-temp-min"> ${Math.round(forecastDay.temperature.minimum)}° </span>
            </div>
            </div>
            `;
            }});
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
