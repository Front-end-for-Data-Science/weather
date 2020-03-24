import React from 'react';
import { LocationInput, CurrentWeather, DailyForecast } from 'components';
import useWeather from 'util/useWeather';
import './App.scss';

// TODO: Display forecast
function App() {
  const [location, setLocation] = React.useState('Los Angeles');
  const { weather, loading } = useWeather(location);

  const handleSubmit = (location) => {
    setLocation(location);
  };

  React.useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setLocation({
        lat: pos.coords.latitude,
        lon: pos.coords.longitude,
      });
    });
  }, []);

  console.log(weather);

  return (
    <main className="App">
      <LocationInput onSubmit={handleSubmit} />
      {!loading && weather && (
        <>
          <CurrentWeather
            city={weather.current.name}
            conditions={weather.current.weather[0]}
            tempData={weather.current.main}
            timezone={weather.current.timezone}
          />
          <DailyForecast forecastData={weather.forecast.list} />
        </>
      )}
    </main>
  );
}

export default App;