import { Fragment } from "react";
import Card from "react-bootstrap/esm/Card";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";

import useWindowSize from "../hooks/useWindowSize";

export default function FiveDayForecast({ dailyWeather }) {
  const size = useWindowSize();

  return (
    <div>
      <h3 className="text-center c-primary">Five-day Forecast</h3>

      {(size.width >= 992)
      ? (
        <Row className="justify-content-around py-5">
          {dailyWeather.map((weather, idx) => (
            <Fragment key={`day-${idx}`}>
              <Col md={12} lg={2}>
                <WeatherCard weather={weather} />
              </Col>
              {(idx < 4)  && <div className="weather-card-v-separator" />}
            </Fragment>
          ))}
        </Row>
      )
      : (
        <div className="py-5">
          <hr className="weather-card-h-separator"/>
          {dailyWeather.map((weather, idx) => (
            <Fragment key={`day-${idx}`}>
              <WeatherCard weather={weather} />
              {(idx < 4)  && <hr className="weather-card-h-separator"/>}
            </Fragment>
          ))}
        </div>
      )}
    </div>
  );
}

function WeatherCard({ weather }) {
  return (
    <Card className="weather-card">
      <Card.Img variant="top" src={weather.statusIcon} />
      <Card.Body>
        <Card.Title className="c-primary">
          {weather.date}
        </Card.Title>
        <Card.Text className="c-primary">
          {weather.high}°/{weather.low}°
        </Card.Text>
        <Card.Text className="c-secondary">
          {weather.status}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}