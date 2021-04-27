import Row from "react-bootstrap/esm/Row";

export default function CurrentWeather({ todayWeather }) {
  return (
    <div>
      <Row className="justify-content-center pt-5">
        <h2 className="c-primary">
          {todayWeather.location}
        </h2>
      </Row>
      <Row className="flex-column align-items-center pb-5">
        <div><img src={todayWeather.statusIcon} /></div>
        <h6 className="c-primary">It's currently {todayWeather.temperature}°F outside</h6>
        <h6 className="c-primary">Feels like {todayWeather.feelsLike}°</h6>
        <h6 className="c-secondary">{todayWeather.status}</h6>
      </Row>
    </div>
  );
}
