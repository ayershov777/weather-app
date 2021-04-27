const todayBaseUrl = "api.openweathermap.org/data/2.5/weather";
const fiveDayBaseUrl = "api.openweathermap.org/data/2.5/forecast";
const imgBaseUrl = "openweathermap.org/img/wn";

const API_KEY = "bef59072dc4f5e16c08bbc9b055f4516"; // I'm leaving the API key exposed on the client for simplicity - this is a security breach.

async function getWeatherWithQuery(query) {
  const todayData = await getCurrentForecastWithQuery(query);
  
  if(todayData.cod !== 200) {
    return {
      message: todayData.message
    }
  }
  
  const fiveDayData = await getFiveDayForecastWithQuery(query);

  return {
    todayWeather: reduceTodayData(todayData),
    dailyWeather: reduceFiveDayData(fiveDayData),
  };
}

async function getWeather() {
  const todayData = await getCurrentForecast();
  const fiveDayData = await getFiveDayForecast();
  return {
    todayWeather: reduceTodayData(todayData),
    dailyWeather: reduceFiveDayData(fiveDayData),
  };
}

async function getData(query) {
  try {
    if(query) {
      return await getWeatherWithQuery(query)
    }
 
    return await getWeather()
  }
  catch(err) {
    alert("Weather App was unable to obtain weather data");
    // fallback would have to be an error page
    console.log(err);
  }
}

async function getCurrentForecast() {
  const url = await getGeoUrl(todayBaseUrl);
  const res = await fetch(url);
  return await res.json();
}

async function getCurrentForecastWithQuery(query) {
  const url = getQueryUrl(todayBaseUrl, query);
  const res = await fetch(url);
  return await res.json();
}

async function getFiveDayForecast() {
  const url = await getGeoUrl(fiveDayBaseUrl);
  const res = await fetch(url);
  return await res.json();
}

async function getFiveDayForecastWithQuery(query) {
  const url = getQueryUrl(fiveDayBaseUrl, query);
  const res = await fetch(url);
  return await res.json();
}

function reduceFiveDayData(data) {
  const dateKeys = getDateKeys(data);
  const tempHighLow = getTempHighLow(dateKeys, data);

  return data.list
    .filter((item) => dateKeys.includes(item.dt_txt))
    .map((item, idx) => ({
      date: getDateDisplay(item.dt_txt),
      high: Math.round(tempHighLow[item.dt_txt].high),
      low: Math.round(tempHighLow[item.dt_txt].low),
      status: item.weather[0].description,
      statusIcon: getStatusIcon(item.weather[0].icon, idx),
    }));
}

function reduceTodayData(data) {
  return {
    location: data.name,
    temperature: Math.round(data.main.temp),
    feelsLike: Math.round(data.main.feels_like),
    status: data.weather[0].description,
    statusIcon: getStatusIcon(data.weather[0].icon),
  };
}

async function getGeoUrl(base) {
  const {lat, lon} = await getCurrentLocation();
  const params = new URLSearchParams({
    lat,
    lon,
    units: "imperial",
    appid: API_KEY,
  }).toString();

  return `https://${base}?${params}`;
}

function getQueryUrl(base, query) {
  const params = new URLSearchParams({
    q: query,
    units: "imperial",
    appid: API_KEY,
  }).toString();

  return `https://${base}?${params}`;
}

function getCurrentLocation() {
  if(navigator.geolocation) {
    return new Promise(((resolve, reject) => {
      navigator.geolocation.getCurrentPosition((position) => {
        resolve({ lat: position.coords.latitude, lon: position.coords.longitude });
      });
    }));
  }
  else {
    alert("Your browser does not support geolocation");
    // do not make the call
    // do not render weather data
    // only render the CityField, to allow the user to manually enter location
  }
}

function isNoon(dtText) {
  const time = dtText.split(" ")[1];
  const hour = parseInt(time.split(":")[0]);
  return hour === 12;
}

function getDateKeys(data) {
  const firstDate = new Date(data.list[0].dt_txt);
  const isFirstDateAfterNoon = firstDate.getHours() >= 12;

  return data.list.reduce((dates, item, idx) => {
    switch(true) {
      case idx === 0 && isFirstDateAfterNoon:
        return [item.dt_txt];
      case isNoon(item.dt_txt):
        return [...dates, item.dt_txt];
      default:
        return dates;
    }
  }, []).slice(0, 5);
}

function getDateDisplay(dtText) {
  const date = new Date(dtText).toDateString();
  return date.substr(0, date.length-5);
}

function getStatusIcon(icon, idx) {
  if(idx !== 0) {
    icon = `${icon.substr(0, 2)}d`;
  }
  
  const fileName = `${icon}@2x.png`;
  return `http://${imgBaseUrl}/${fileName}`;
}

// This function calculates the high and low temps for each day by iterating over the 3 hour intervals
// Each day's high and low temp is indexed by the dateKey
// Given more time, I would write this function more declaratively
function getTempHighLow(dateKeys, data) {
  // dateMap is used to obtain a dateKey given an arbitrary date-time string, only used below
  const dateMap = dateKeys.reduce((map, key) => {
    const dateText = new Date(key).toDateString();
    return { ...map, [dateText]: key }
  }, {});

  const tempHighLow = {};
  data.list.forEach((item) => {
    const dateText = new Date(item.dt_txt).toDateString();
    const key = dateMap[dateText];
    
    if(tempHighLow[key]) {
      const temp = tempHighLow[key];
      temp.high = Math.max(temp.high, item.main.temp_max);
      temp.low = Math.min(temp.low, item.main.temp_min);
    }
    else {
      tempHighLow[key] = { high: item.main.temp_max, low: item.main.temp_min };
    }
  });

  return tempHighLow;
}

export default {
  getData,
}