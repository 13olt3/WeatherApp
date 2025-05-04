export async function getWeather(location) {
  const response = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=FDPREP7VEJLD2WF8HVRQC7DGW`,
    { mode: "cors" }
  );
  const weatherData = await response.json();
  console.log(weatherData);
  console.log(weatherData.days[0].feelslike);
  return weatherData;
}

// FDPREP7VEJLD2WF8HVRQC7DGW API key

// https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/london
