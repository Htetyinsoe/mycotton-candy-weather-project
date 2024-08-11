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
  console.log(date);

  timeElement.innerHTML = formatDate(date);
  windElement.innerHTML = wind;
  humidityData.innerHTML = humidity;
  h1.innerHTML = city;
  condition.innerHTML = cloud;
  temperature.innerHTML = Math.round(temperatureElement);
  console.log(response);
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

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", displayCity);
getCity("Mae Sot");
