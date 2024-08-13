function refreshWeather(response) {
  let temperature = document.querySelector("#current-temperature");
  let city = response.data.city;
  let temperatureElement = response.data.temperature.current;
  let h1 = document.querySelector("#weather-app-city");
  let condition = document.querySelector("#cloud-condition");
  let cloud = response.data.condition.description;
  let humidityData = document.querySelector("#Humidity");
  let humidity = response.data.temperature.humidity;
  let windElement = document.querySelector("#wind");
  let wind = response.data.wind.speed;
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  let iconElement = document.querySelector("#icon");
  console.log(date);

  timeElement.innerHTML = formatDate(date);
  windElement.innerHTML = wind;
  humidityData.innerHTML = humidity;
  h1.innerHTML = city;
  condition.innerHTML = cloud;
  temperature.innerHTML = Math.round(temperatureElement);

  iconElement.innerHTML = `<img
                src="${response.data.condition.icon_url}"
                class="weather-app-icon"
              />`;

  getForecast(response.data.city);
}

function formatDate(date) {
  let days = [
    "'Sunday",
    "Monday",
    "Thueday",
    "Wednesday",
    "Thusday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  let minute = date.getMinutes();
  let hour = date.getHours();

  if (minute < 10) {
    minute = `0${minute}`;
  }

  return `${day},${hour}:${minute}`;
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

function getForecast(city) {
  let apiKey = "7fc062ate0o7d407f4902a3f2bcc6bac";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}

function displayForecast(response) {
  console.log(response);
  let forecastHTML = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `<div class="weather-forecast-date">
            <div class="weather-forecast-day">${formatDay(day.time)}</div>
            
            <img src="${day.condition.icon_url}" class="weather-forecast-icon"/>
            
            <div class="weather-forecast-data">
              <div class="weather-forecast-temperature">
                <strong>${Math.round(day.temperature.maximum)}°</strong>
              </div>
              <div class="weather-forecast-temperature">${Math.round(
                day.temperature.minimum
              )}°</div>
            </div>
            </div>`;
    }
  });

  let forecastElement = document.querySelector("#weather-forecast");
  forecastElement.innerHTML = forecastHTML;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", displayCity);

getCity("Mae Sot");
