let apiKey = "6af364afb0c9b134to765939b0fbbf44";
let apiUrl = `https://api.shecodes.io/weather/v1/current?lisbon&key=${apiKey}`;

function currentTemp(response) {
    console.log(response);
}

function initData() {
    axios.get(apiUrl).then(currentTemp);
}
