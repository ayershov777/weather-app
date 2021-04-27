import { useState } from "react";
import Form from "react-bootstrap/esm/Form";
import Button from "react-bootstrap/esm/Button";

import weatherService from "../services/weatherService";

export default function CityField({ setWeather }) {
  const [value, setValue] = useState("");
  const [feedback, setFeedback] = useState(undefined);

  function handleChangeCity(e) {
    setValue(e.target.value);
    setFeedback(undefined);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const data = await weatherService.getData(value);
    
    if(data.message) {
      setFeedback(data.message);
    }
    else {
      setWeather(data);
      setValue("");
    }
  }

  return (
    <div className="pb-5">
      <h3 className="text-center c-primary">Where do you want to check the weather?</h3>
      <Form className="pt-4" onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label className="d-block text-center c-secondary">Enter a city</Form.Label>
          <Form.Control type="text" value={value} onChange={handleChangeCity} required isInvalid={feedback} />
          <Form.Control.Feedback type="invalid">
            {feedback}
          </Form.Control.Feedback>
          <div className="d-flex justify-content-center pt-4">
            <Button className="primary-button" type="submit">
              Search
            </Button>
          </div>
        </Form.Group>
      </Form>
    </div>
  );
}
