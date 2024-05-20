import { useEffect, useState } from 'react'
import PWABadge from './PWABadge.tsx'
import './App.css'
import axios from 'axios'

interface Location {
  lon: number
  lat: number
}


function App() {

  const API_KEY: string = ''
  const [city, setCity] = useState('Madrid')
  const [location, setLocation] = useState<Location>({ lon: -87.2068, lat: 14.0818 })
  const [weather, setWeather] = useState<any>({})

  const date = new Date()

  const [load, setLoad] = useState<boolean>(true)

  const apiLocationUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`

  const apiWeatherCurrentUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&appid=${API_KEY}&units=metric`

  const getLocation = async () => {
    try {
      const response = await axios.get(apiLocationUrl)
      setLocation({
        lon: response.data.coord.lon,
        lat: response.data.coord.lat
      })
    } catch (error) {
      alert('City not found!')
    }
  }

  const getWeatherCurrent = async () => {
    try {
      setLoad(true)
      const response = await axios.get(apiWeatherCurrentUrl)
      setWeather(response.data)


      setLoad(false)
    } catch (error) {
      // alert('Error fetching weather data!')
      console.error(error)
    }
  }


  useEffect(() => {
    getLocation()
  }, [])

  useEffect(() => {
    getWeatherCurrent()
  }, [location])

  const getIcon = () => {
    if (weather.weather[0].icon === '01d') return 'sunny';
    if (weather.weather[0].icon === '01n') return 'clear_night';
    if (weather.weather[0].icon === '02d') return 'nest_farsight_weather';
    if (weather.weather[0].icon === '02n') return 'nights_stay';
    if (weather.weather[0].icon === '03d') return 'cloud';
    if (weather.weather[0].icon === '03n') return 'partly_cloudy_night';
    if (weather.weather[0].icon === '04d' || weather.weather[0].icon === '04n') return 'foggy';
    if (weather.weather[0].icon === '09d' || weather.weather[0].icon === '09d') return 'rainy';
    if (weather.weather[0].icon === '10d') return 'sunny_snowing';
    if (weather.weather[0].icon === '10n') return 'cloudy_snowing';
    if (weather.weather[0].icon === '11d' || weather.weather[0].icon === '11n') return 'weather_hail';
    if (weather.weather[0].icon === '13d' || weather.weather[0].icon === '13n') return 'severe_cold';
    if (weather.weather[0].icon === '50d' || weather.weather[0].icon === '50n') return 'mist';
    return '';
  }

  console.log(weather)


  return (
    <>

      <div className="container body">


        <div className="weather">
          {
            !load ? <div className="container">
              <div className="start">
                <div className="container head">
                  <h3>Wea<span>ther</span>  App</h3>
                  <div className="input">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="City"
                      aria-label="City"
                      aria-describedby="button-addon2"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    />
                    <button
                      className="btn btn-outline-secondary"
                      type="button"
                      id="button-addon2"
                      onClick={getLocation}
                    >
                      Search
                    </button>
                  </div>
                </div>
                <p className='name'><span className="material-symbols-outlined">location_on</span>{weather.name}</p>

                <div className="image">
                  <span className="material-symbols-outlined">{getIcon()}</span>
                </div>
                <div className="temp">
                  <span>{parseInt(weather.main.temp)}<span>°</span></span>
                  <br />
                  <span>{weather.weather[0].main}</span>
                  <br />
                  <span>{date.toDateString()}</span>
                </div>
                <div className="extra">
                  <div className="wind">
                    <span className="material-symbols-outlined">air</span>
                    <br />
                    <span> {weather.wind.speed} m/s</span>
                    <br />
                    <span>Wind</span>
                  </div>
                  <div className="humidity">
                    <span className="material-symbols-outlined">water_drop</span>
                    <br />
                    <span>{weather.main.humidity}%</span>
                    <br />
                    <span>Humidity</span>
                  </div>
                  <div className="preasure">
                    <span className="material-symbols-outlined">speed</span>
                    <br />
                    <span>{weather.main.pressure} hPa</span>
                    <br />
                    <span>Pressure</span>
                  </div>
                </div>
              </div>
              <br />
              <br />
              <div className="end">
                <p className='title'><span className="material-symbols-outlined">edit_calendar</span> Today</p>
                <div className="data">
                  <div className="feels-like">
                    <span>{weather.main.feels_like}°</span>
                    <br />
                    <span>Feels Like</span>
                  </div>
                  <div className="temp_max">
                    <span>{weather.main.temp_max}°</span>
                    <br />
                    <span>Max Temp</span>
                  </div>
                  <div className="temp_min">
                    <span>{weather.main.temp_min}°</span>
                    <br />
                    <span>Min Temp</span>
                  </div>
                  <div className="sunrise">
                    <span>{new Date(weather.sys.sunrise * 1000).toLocaleTimeString()}</span>
                    <br />
                    <span>Sunrise</span>
                  </div>
                  <div className="sunset">
                    <span>{new Date(weather.sys.sunset * 1000).toLocaleTimeString()}</span>
                    <br />
                    <span>Sunset</span>
                  </div>
                </div>
              </div>
            </div> :
              <div className="container">
                <div className="start">
                  <div className="container head">
                    <h3>Weather App</h3>
                    <div className="input">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="City"
                        aria-label="City"
                        aria-describedby="button-addon2"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                      />
                      <button
                        className="btn btn-outline-secondary"
                        type="button"
                        id="button-addon2"
                        onClick={getLocation}
                      >
                        Search
                      </button>
                    </div>
                  </div>
                </div>
              </div>


          }

        </div>
        <div className="footer">
          <p>Developed by <a href="https://github.com/SevenDogsNTwoCats/">AE9</a></p>
        </div>

      </div>

      <PWABadge />
    </>
  )
}

export default App
