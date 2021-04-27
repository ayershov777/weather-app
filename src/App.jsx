import { useEffect, useState } from "react";
import WeatherPage from "./components/WeatherPage";
import weatherService from "./services/weatherService";

import "./App.css";

function App() {
  const [weather, setWeather] = useState(undefined);

  useEffect(() => {
    weatherService.getData()
      .then((data) => setWeather(data));
  }, []);

  if(!weather) {
    return <div>Loading weather data...</div>
  }
  
  return (
    <WeatherPage weather={weather} setWeather={setWeather} />
  );
}

export default App;
