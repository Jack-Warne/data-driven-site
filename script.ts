const convertBtn = document.getElementById('convert-btn');
const resultDiv = document.getElementById('result');

if (convertBtn && resultDiv) { // because they can have null values need to check if they have anything in them else it won't work
  convertBtn.addEventListener('click', () => {
    const postcodeInput = document.getElementById('postcode-input') as HTMLInputElement | null;
    const postcode = postcodeInput?.value.trim();

    if (postcode) {
      // Fetch weather data using the WeatherAPI
      fetchWeatherData(postcode) // calls function to fetch weather data
        .then(weatherData => {
          if (weatherData) {
            const weatherInfo = formatWeatherInfo(weatherData);
            resultDiv.textContent = weatherInfo;
          } else {
            resultDiv.textContent = 'Unable to retrieve weather data.';
          }
        })
        .catch(error => {
          console.error('Error retrieving weather data:', error);
          resultDiv.textContent = 'An error occurred. Please try again later.';
        });
    } else {
      resultDiv.textContent = 'Invalid postcode. Please try again.';
    }
  });
}

function fetchWeatherData(postcode: string): Promise<any> {
  const apiKey = '8e46c49d13a64cf8ad7231905233005';
  const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${postcode}`;

  return fetch(apiUrl) // returns the required data from the API
    .then(response => response.json())
    .catch(error => {
      throw error;
    });
}


function formatWeatherInfo(weatherData: any): string { 
  // Extract the relevant weather information from the API response
  const location = weatherData.location.name;
  const temperature = weatherData.current.temp_c;
  const condition = weatherData.current.condition.text;

  // Format the weather information onto the web page
  const weatherInfo = `Location: ${location}\nTemperature: ${temperature}°C\nCondition: ${condition}`;

  return weatherInfo;
}
