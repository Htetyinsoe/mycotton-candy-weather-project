function displayCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  let h1 = document.querySelector("#weather-app-city");
  h1.innerHTML = searchInput.value;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", displayCity);
