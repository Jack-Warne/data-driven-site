var convertBtn = document.getElementById('convert-btn');
var resultDiv = document.getElementById('result');
if (convertBtn && resultDiv) {
    convertBtn.addEventListener('click', function () {
        var postcodeInput = document.getElementById('postcode-input');
        var postcode = postcodeInput === null || postcodeInput === void 0 ? void 0 : postcodeInput.value.trim();
        if (postcode) {
            // Fetch weather data using the WeatherAPI
            fetchWeatherData(postcode)
                .then(function (weatherData) {
                if (weatherData) {
                    var weatherInfo = formatWeatherInfo(weatherData);
                    resultDiv.textContent = weatherInfo;
                }
                else {
                    resultDiv.textContent = 'Unable to retrieve weather data.';
                }
            })
                .catch(function (error) {
                console.error('Error retrieving weather data:', error);
                resultDiv.textContent = 'An error occurred. Please try again later.';
            });
        }
        else {
            resultDiv.textContent = 'Invalid postcode. Please try again.';
        }
    });
}
function fetchWeatherData(postcode) {
    var apiKey = '8e46c49d13a64cf8ad7231905233005';
    var apiUrl = "https://api.weatherapi.com/v1/current.json?key=".concat(apiKey, "&q=").concat(postcode);
    return fetch(apiUrl)
        .then(function (response) { return response.json(); })
        .catch(function (error) {
        throw error;
    });
}
function formatWeatherInfo(weatherData) {
    // Extract the relevant weather information from the API response
    var location = weatherData.location.name;
    var temperature = weatherData.current.temp_c;
    var condition = weatherData.current.condition.text;
    // Format the weather information
    var weatherInfo = "Location: ".concat(location, "\nTemperature: ").concat(temperature, "\u00B0C\nCondition: ").concat(condition);
    return weatherInfo;
}
