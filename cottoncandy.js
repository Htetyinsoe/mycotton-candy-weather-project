function refreshWeather(response) {
  let temperature = document.querySelector("#current-temperature");
  let city = response.data.city;
  let temperatureElement = response.data.temperature.current;
  let h1 = document.querySelector("#weather-app-city");
  h1.innerHTML = city;
  temperature.innerHTML = Math.round(temperatureElement);
}

function getCity(city) {
  let apiKey = "7fc062ate0o7d407f4902a3f2bcc6bac";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(refreshWeather);
}

function displayCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");

  getCity(searchInput.value);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", displayCity);
