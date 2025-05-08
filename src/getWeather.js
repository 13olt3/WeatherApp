const targetTopLeftImg = document.querySelector("[top-left-img]");
const currentLocation = document.querySelector("[current-location]");
const currTempDisplay = document.querySelector("[curr-temp]");
const minTempDisplay = document.querySelector("[min-temp]");
const maxTempDisplay = document.querySelector("[max-temp]");
const weatherDesc = document.querySelector("[weather-desc]");
const inputLocation = document.querySelector("[location-input]");
const searchButton = document.querySelector("[search-button]");

let weatherObject = [];
let nullWeatherObject = [];
function fillNull() {
  nullWeatherObject.location = "n/a";
  nullWeatherObject.conditon = "n/a";
  nullWeatherObject.currTemp = "n/a";
  nullWeatherObject.minTemp = "n/a";
  nullWeatherObject.maxTemp = "n/a";
}
fillNull();

const images = importAll(
  require.context("./images", false, /\.(png|jpe?g|svg)$/)
);
function importAll(r) {
  let images = {};
  r.keys().map((item, index) => {
    images[item.replace("./", "")] = r(item);
  });
  return images;
}
function fToC(fTemp) {
  return Math.round(((fTemp - 32) * (5 / 9) + Number.EPSILON) * 100) / 100;
}

inputLocation.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    searchButton.click();
  }
});

export async function getWeather(location) {
  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=FDPREP7VEJLD2WF8HVRQC7DGW`,
      { mode: "cors" }
    );
    const weatherData = await response.json();
    console.log(weatherData);
    populateWeatherObject(weatherData);
    renderer();
  } catch (error) {
    weatherObject = nullWeatherObject;
    renderer();
    currentLocation.textContent = "Not a valid location.";
    currentLocation.style.color = "red";
  }
}

export async function buttonFunctionality() {
  searchButton.addEventListener("click", (e) => {
    e.preventDefault();
    getWeather(inputLocation.value);
  });
}

async function populateWeatherObject(weatherData) {
  weatherObject.location = weatherData.address;
  weatherObject.condition = weatherData.currentConditions.icon;
  weatherObject.currTemp = fToC(weatherData.currentConditions.temp);
  weatherObject.minTemp = fToC(weatherData.days[0].tempmin);
  weatherObject.maxTemp = fToC(weatherData.days[0].tempmax);
  console.log(weatherObject);
}

async function renderWeatherImg() {
  if (weatherObject.condition === "n/a") {
    return;
  }
  let weather = weatherObject.condition + ".svg";
  targetTopLeftImg.src = images[`${weather}`];
  weatherDesc.textContent = weatherObject.condition;
}
async function renderLocationText() {
  if (weatherObject.location === "n/a") {
    return;
  }
  let location = weatherObject.location;
  location =
    String(location).charAt(0).toUpperCase() + String(location).slice(1);
  currentLocation.textContent = `Currently display weather in: ${location}.`;
  currentLocation.style.color = "black";
}
async function renderTempRanges() {
  currTempDisplay.textContent = `Currently: ${weatherObject.currTemp}°C`;
  minTempDisplay.textContent = `Min: ${weatherObject.minTemp}°C`;
  maxTempDisplay.textContent = `Max: ${weatherObject.maxTemp}°C`;
}

async function renderer() {
  renderWeatherImg();
  renderLocationText();
  renderTempRanges();
}

// FDPREP7VEJLD2WF8HVRQC7DGW API key

// https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/london
//
// weather icon images
// https://www.visualcrossing.com/resources/documentation/weather-api/defining-icon-set-in-the-weather-api/
