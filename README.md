## Weather App

### Summary

Weather App uses the OpenWeather API. The /weather endpoint is used to obtain data about today (local time), and the /forecast endpoint is used to obtain data about the next 5 days (GMT)

Given the limited amount of time I had to complete this, I did my best to keep things as simple as possible. There are a few things I wish I had more time to work on, such as writing unit tests, documenting my code, cleaning up some of my data massaging logic, making the network request functions more modular. Also I would have liked to create an hourly breakdown of five-day weather data - but I did not have time to do this reliably.

Features included:
  - Today's weather
  - Five day forecast
  - Change city

Here are some things that I would do to test my application and ensure reliability

1. Write unit tests for the WeatherService module, to help design the WeatherService code a little better and to prevent regressions moving forward. The OpenWeather API website allows users to download bulk data, which would be useful for creating reliable mocks.

1. Create snapshot tests for JSX, to prevent regressions moving forward and to easily visualize the generated markup.

1. Use TypeScript. My code makes a few assumptions about the data that is coming back from the OpenWeather API, and these would be ironed out during the process of creating type definitions and defining a reliable schema for the OpenWeather responses. This would also provide documentation, which would be useful if the project grows in size (or if I'm working on a team).
1. Validate the city field input. I did not have time to do this properly.
1. Create fallbacks for OpenWeather error responses, and for browsers that don't support navigator.geolocation
1. Create a backend to make the OpenWeather requests, and hide the API key in an ENV file.