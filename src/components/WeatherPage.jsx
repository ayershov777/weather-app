import Container from "react-bootstrap/Container";
import CityField from "./CityField";

import CurrentWeather from "./CurrentWeather";
import FiveDayForecast from "./FiveDayForecast";

export default function WeatherPage({ weather: { todayWeather, dailyWeather }, setWeather}) {
  return (
    <Container>
      <CurrentWeather todayWeather={todayWeather} />
      <FiveDayForecast dailyWeather={dailyWeather} />
      <CityField setWeather={setWeather} />
    </Container>
  );
}

