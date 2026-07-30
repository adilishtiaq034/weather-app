import { useEffect, useState } from 'react'
import './App.css'

function App() {
    const [city, setCity] = useState('')
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function getWeather() {
        if (city.trim() === "") {
        setError("Enter a City");
      return;
      }
        setLoading(true)
        try {
            const response = await fetch(`https://wttr.in/${city}?format=j1`)
            console.log(response);
            const data = await response.json()
            console.log(data)
            setWeather(data)
            
        }
        catch (error) {
            setError("Error occured...")

        }
        finally {
            setLoading(false)
        }


    }

    return (<div className="weather-app">
        <div className="weather-card">
            <span className="eyebrow">Live  Adil's</span>
            <h2 className="app-title">Weather station</h2>

            <div className="search-row">
                <input
                    className="city-input"
                    placeholder='Enter city name'
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') { getWeather() }
                    }}
                    type="text"
                    value={city}
                    onChange={(e) => {
                        setCity(e.target.value);
                        setWeather(null);
                        setError("");
                    }}
                />
                <button className="search-btn" onClick={getWeather} disabled={loading}>Search</button>
            </div>

            {loading && <h2 className="status-message">Fetching weather...</h2>}
            {error && <h2 className="status-message status-error">{error}</h2>}

            {weather && (
                <div className="reading">
                    <div className="reading-header">
                        <div>
                            <p className="reading-city">{city}</p>
                            <p className="reading-desc">{weather.current_condition[0].weatherDesc[0].value}</p>
                        </div>
                        <img
                            className="reading-icon"
                            src={weather.current_condition[0].weatherIconUrl[0].value}
                            alt="Weather Icon"
                        />
                    </div>

                    <p className="reading-temp">{weather.current_condition[0].temp_C}°<span className="reading-temp-unit">C</span></p>

                    <div className="reading-grid">
                        <div className="reading-stat">
                            <span className="reading-stat-label">Humidity</span>
                            <span className="reading-stat-value">{weather.current_condition[0].humidity}%</span>
                        </div>
                        <div className="reading-stat">
                            <span className="reading-stat-label">Wind</span>
                            <span className="reading-stat-value">{weather.current_condition[0].windspeedKmph} km/h</span>
                        </div>
                        <div className="reading-stat">
                            <span className="reading-stat-label">Feels like</span>
                            <span className="reading-stat-value">{weather.current_condition[0].FeelsLikeC}°C</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    </div>)
}
export default App;