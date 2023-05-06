

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

    cityElement.innerHTML = response.data.city;
    desElement.innerHTML = response.data.condition.description;
    windElement.innerHTML = Math.round (response.data.wind.speed);
    citIcon.innerHTML = response.data.condition.icon_url;
    
}

//function initData() {
    //axios.get(apiUrl).then(currentTemp);
//}

// funktion aufrufen, damit sie ausgeführt wird
//initData();


function search(city) {
    let apiKey = "6af364afb0c9b134to765939b0fbbf44";
    let query = "city";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${query}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(currentTemp);
    }

function inputCity(event) {
    //event.preventDefault();
    let cityInput = document.querySelector("#form-control");
    search(cityInput.value);
}

let form = document.querySelector("#button");
form.addEventListener("submit", inputCity);